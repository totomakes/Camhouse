
const fs = require('fs');
const path = require('path');

const config = {
    cameraOptics: '/Users/robbur/Library/Mobile Documents/com~apple~CloudDocs/Playground/Ai Hub/CamHouse/CatalogueScrape/media_cameraoptics',
    grip: '/Users/robbur/Library/Mobile Documents/com~apple~CloudDocs/Playground/Ai Hub/CamHouse/CatalogueScrape/media_grip',
    lighting: '/Users/robbur/Library/Mobile Documents/com~apple~CloudDocs/Playground/Ai Hub/CamHouse/CatalogueScrape/media'
};

const projectRoot = '/Users/robbur/Library/Mobile Documents/com~apple~CloudDocs/Playground/Ai Hub/CamHouse/camhouse---elite-film-production-rentals';
const productsJsonPath = path.join(projectRoot, 'data/products.json');
const publicAssetsPath = path.join(projectRoot, 'public/assets/products');

function getFolderForProduct(name) {
    for (const source in config) {
        const media = config[source];
        const folders = fs.readdirSync(media);
        const match = folders.find(f => {
            const cleanF = f.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
            const cleanN = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
            return cleanF === cleanN || cleanF.includes(cleanN) || cleanN.includes(cleanF);
        });
        if (match) return path.join(media, match);
    }
    return null;
}

async function run() {
    const products = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));
    console.log('Syncing hero choices based on filenames...');

    products.forEach(p => {
        const folder = getFolderForProduct(p.name);
        if (folder) {
            const files = fs.readdirSync(folder).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

            // Prioritization logic
            files.sort((a, b) => {
                const aLow = a.toLowerCase();
                const bLow = b.toLowerCase();
                const isMainA = aLow.startsWith('main') || aLow.startsWith('hero') || aLow.includes('_main') || aLow.includes('_hero');
                const isMainB = bLow.startsWith('main') || bLow.startsWith('hero') || bLow.includes('_main') || bLow.includes('_hero');

                if (isMainA && !isMainB) return -1;
                if (!isMainA && isMainB) return 1;
                return a.localeCompare(b);
            });

            if (files.length > 0) {
                // Clear existing public assets for this product to ensure fresh sync
                const existingFiles = fs.readdirSync(publicAssetsPath).filter(f => f.startsWith(`${p.id}-`));
                existingFiles.forEach(f => fs.unlinkSync(path.join(publicAssetsPath, f)));

                let gallery = [];
                files.forEach((file, idx) => {
                    const ext = path.extname(file);
                    const destName = `${p.id}-${idx}${ext}`;
                    const destPath = path.join(publicAssetsPath, destName);
                    const sourcePath = path.join(folder, file);

                    fs.copyFileSync(sourcePath, destPath);

                    // Process to 1:1 square
                    if (/\.(jpg|jpeg|png)$/i.test(ext)) {
                        try {
                            const { execSync } = require('child_process');
                            const output = execSync(`sips -g pixelWidth -g pixelHeight "${destPath}"`).toString();
                            const w = parseInt(output.match(/pixelWidth: (\d+)/)[1]);
                            const h = parseInt(output.match(/pixelHeight: (\d+)/)[1]);

                            if (w !== h) {
                                const side = Math.max(w, h);
                                console.log(`  Padding ${p.name} - ${file}...`);
                                execSync(`sips -p ${side} ${side} --padColor FFFFFF "${destPath}"`);
                            }
                        } catch (err) { }
                    }

                    gallery.push(`/assets/products/${destName}`);
                    if (idx === 0) p.imageUrl = `/assets/products/${destName}`;
                });

                p.gallery = gallery;
                console.log(`Synced: ${p.name} (${gallery.length} images)`);
            }
        }
    });

    fs.writeFileSync(productsJsonPath, JSON.stringify(products, null, 2));
    console.log('\nSync complete!');
}

run().catch(console.error);
