const fs = require('fs');
const path = require('path');

const config = {
    cameraOptics: {
        csv: '/Users/robbur/Library/Mobile Documents/com~apple~CloudDocs/Playground/Ai Hub/CamHouse/CatalogueScrape/products_catalog_cameraoptics.csv',
        media: '/Users/robbur/Library/Mobile Documents/com~apple~CloudDocs/Playground/Ai Hub/CamHouse/CatalogueScrape/media_cameraoptics',
        categoryMap: {
            'Cámara': 'Cameras',
            'Óptica': 'Optics',
            'Kit De Cámara': 'Kits'
        }
    },
    grip: {
        csv: '/Users/robbur/Library/Mobile Documents/com~apple~CloudDocs/Playground/Ai Hub/CamHouse/CatalogueScrape/products_catalog_grip.csv',
        media: '/Users/robbur/Library/Mobile Documents/com~apple~CloudDocs/Playground/Ai Hub/CamHouse/CatalogueScrape/media_grip',
        categoryMap: (csvCat) => 'Grip' // All grip CSV categories map to "Grip"
    }
};

const projectRoot = '/Users/robbur/Library/Mobile Documents/com~apple~CloudDocs/Playground/Ai Hub/CamHouse/camhouse---elite-film-production-rentals';
const productsJsonPath = path.join(projectRoot, 'data/products.json');
const publicAssetsPath = path.join(projectRoot, 'public/assets/products');

if (!fs.existsSync(publicAssetsPath)) {
    fs.mkdirSync(publicAssetsPath, { recursive: true });
}

function parseCSV(content) {
    const lines = content.split('\n');
    const results = [];
    let currentLine = '';

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;

        currentLine += (currentLine ? '\n' : '') + line;
        const quotes = (currentLine.match(/"/g) || []).length;

        if (quotes % 2 === 0) {
            const row = [];
            let cell = '';
            let inCellQuote = false;

            for (let char of currentLine) {
                if (char === '"') {
                    inCellQuote = !inCellQuote;
                } else if (char === ',' && !inCellQuote) {
                    row.push(cell.trim().replace(/^"|"$/g, '').replace(/""/g, '"'));
                    cell = '';
                } else {
                    cell += char;
                }
            }
            row.push(cell.trim().replace(/^"|"$/g, '').replace(/""/g, '"'));
            results.push(row);
            currentLine = '';
        }
    }
    return results;
}

function cleanPrice(priceStr) {
    if (!priceStr) return 0;
    return parseFloat(priceStr.replace(/[$\s]/g, '').replace(/\+IVA/i, '')) || 0;
}

function generateId(name) {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function getBrand(name) {
    const brands = ['Sony', 'Canon', 'Rokinon', 'Venus Optics', 'LAOWA', 'Cooke', 'American Grip', 'Matthews', 'Avenger', 'Manfrotto', 'Dana Dolly', 'Aputure', 'Nanlite', 'Nanlux'];
    for (const b of brands) {
        if (name.toLowerCase().includes(b.toLowerCase())) return b;
    }
    return name.split(' ')[0];
}

async function processSource(sourceKey) {
    const { csv, media, categoryMap } = config[sourceKey];
    console.log(`\nProcessing ${sourceKey}...`);

    const content = fs.readFileSync(csv, 'utf8');
    const rows = parseCSV(content);
    const mediaFolders = fs.readdirSync(media);

    const products = [];

    for (const row of rows) {
        if (row.length < 2) continue;
        const [name, csvCategory, priceRaw, features, description, includedRaw, stock, videoUrl] = row;

        const id = generateId(name);
        const category = typeof categoryMap === 'function' ? categoryMap(csvCategory) : (categoryMap[csvCategory] || csvCategory);

        // Match media folder
        // Handling special characters in folder names like "_" instead of ":" or "("
        const foundFolder = mediaFolders.find(f => {
            const cleanF = f.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
            const cleanN = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
            return cleanF === cleanN || cleanF.includes(cleanN) || cleanN.includes(cleanF);
        });

        let gallery = [];
        let imageUrl = '';

        if (foundFolder) {
            const folderPath = path.join(media, foundFolder);
            const files = fs.readdirSync(folderPath).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

            files.forEach((file, idx) => {
                const ext = path.extname(file);
                const destName = `${id}-${idx}${ext}`;
                const destPath = path.join(publicAssetsPath, destName);
                fs.copyFileSync(path.join(folderPath, file), destPath);
                const url = `/assets/products/${destName}`;
                gallery.push(url);
                if (idx === 0) imageUrl = url;
            });
        }

        products.push({
            id,
            name,
            brand: getBrand(name),
            category: category,
            subcategory: csvCategory, // Use original CSV category as subcategory
            description: description || '',
            pricePerDay: cleanPrice(priceRaw),
            imageUrl: imageUrl || `/assets/products/${id}.jpg`,
            gallery: gallery,
            stock: parseInt(stock) || 1,
            available: parseInt(stock) || 1,
            tags: [category, csvCategory, getBrand(name)].filter(Boolean),
            included: includedRaw ? includedRaw.split('\n').filter(i => i.trim()) : [],
            specs: features ? parseFeatures(features) : {},
            videoUrl: videoUrl || ''
        });
    }
    return products;
}

function parseFeatures(str) {
    const specs = {};
    str.split('\n').filter(l => l.trim()).forEach((line, i) => {
        if (line.includes(':')) {
            const [k, v] = line.split(':');
            specs[k.trim()] = v.trim();
        } else {
            specs[`Feature ${i + 1}`] = line.trim();
        }
    });
    return specs;
}

async function run() {
    const cameraProducts = await processSource('cameraOptics');
    const gripProducts = await processSource('grip');

    const existingProducts = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));

    // Merge strategy: Keep existing lighting, add new ones (deduplicate by ID)
    const productMap = new Map();
    existingProducts.forEach(p => productMap.set(p.id, p));

    [...cameraProducts, ...gripProducts].forEach(p => {
        productMap.set(p.id, p);
    });

    const final = Array.from(productMap.values());
    fs.writeFileSync(productsJsonPath, JSON.stringify(final, null, 2));
    console.log(`\nSuccessfully ingested products! Total in DB: ${final.length}`);
}

run().catch(console.error);
