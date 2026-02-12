const fs = require('fs');
const path = require('path');

const csvPath = '/Users/robbur/Library/Mobile Documents/com~apple~CloudDocs/Playground/Ai Hub/CamHouse/CatalogueScrape/products_catalog.csv';
const mediaRoot = '/Users/robbur/Library/Mobile Documents/com~apple~CloudDocs/Playground/Ai Hub/CamHouse/CatalogueScrape/media';
const projectRoot = '/Users/robbur/Library/Mobile Documents/com~apple~CloudDocs/Playground/Ai Hub/CamHouse/camhouse---elite-film-production-rentals';
const productsJsonPath = path.join(projectRoot, 'data/products.json');
const publicAssetsPath = path.join(projectRoot, 'public/assets/products');

// Simplified CSV Parser for this specific CSV structure
function parseCSV(content) {
    const lines = content.split('\n');
    const headers = lines[0].split(',');
    const results = [];

    let currentLine = '';
    let insideQuotes = false;

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;

        currentLine += (currentLine ? '\n' : '') + line;

        // Count quotes to handle multiline quoted fields
        const quotes = (currentLine.match(/"/g) || []).length;
        if (quotes % 2 === 0) {
            // Balanced quotes, process the record
            const row = [];
            let cell = '';
            let inCellQuote = false;

            for (let char of currentLine) {
                if (char === '"') {
                    inCellQuote = !inCellQuote;
                } else if (char === ',' && !inCellQuote) {
                    row.push(cell.trim().replace(/^"|"$/g, ''));
                    cell = '';
                } else {
                    cell += char;
                }
            }
            row.push(cell.trim().replace(/^"|"$/g, ''));

            if (row.length >= headers.length) {
                results.push(row);
            }
            currentLine = '';
        }
    }
    return results;
}

function cleanPrice(priceStr) {
    // Remove "$", "+IVA", spaces
    return parseFloat(priceStr.replace(/[$\s+IVA]/g, '')) || 0;
}

function extractBrand(name) {
    const brands = ['Litepanels', 'Aputure', 'Nanlite', 'Astera', 'ARRI', 'LiteGear', 'Creamsource', 'ETC', 'Dedolight', 'Amaran', 'Nanlux'];
    for (const brand of brands) {
        if (name.toLowerCase().includes(brand.toLowerCase())) return brand;
    }
    return name.split(' ')[0]; // Fallback to first word
}

function parseSpecs(featuresStr) {
    const specs = {};
    const features = featuresStr.split('\n').filter(f => f.trim());
    features.forEach((f, index) => {
        if (f.includes(':')) {
            const [key, ...valParts] = f.split(':');
            specs[key.trim()] = valParts.join(':').trim();
        } else {
            specs[`Feature ${index + 1}`] = f.trim();
        }
    });
    return specs;
}

function generateId(name) {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

async function run() {
    console.log('Reading CSV...');
    const csvContent = fs.readFileSync(csvPath, 'utf8');
    const rows = parseCSV(csvContent);
    console.log(`Parsed ${rows.length} products.`);

    const existingProducts = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));
    const newProducts = [];

    for (const row of rows) {
        const [name, category, priceRaw, features, description, includedRaw, stock, videoUrl] = row;

        const id = generateId(name);
        const brand = extractBrand(name);
        const price = cleanPrice(priceRaw);
        const specs = parseSpecs(features);
        const included = includedRaw.split('\n').filter(i => i.trim());

        // Categorization logic
        const finalCategory = "LIGHTING";
        let subcategory = "LED";
        if (!name.toLowerCase().includes('led') && !description.toLowerCase().includes('led')) {
            subcategory = "Conventional"; // Fallback if not LED
        }

        // Gallery Migration logic
        const mediaFolders = fs.readdirSync(mediaRoot);
        let foundFolder = mediaFolders.find(f => f.toLowerCase() === name.toLowerCase()) ||
            mediaFolders.find(f => f.includes(name.substring(0, 20))) ||
            mediaFolders.find(f => {
                const cleanF = f.replace(/_/g, ' ').toLowerCase();
                const cleanN = name.toLowerCase();
                return cleanF.includes(cleanN.substring(0, 20));
            });

        let gallery = [];
        let imageUrl = '';

        if (foundFolder) {
            const folderPath = path.join(mediaRoot, foundFolder);
            const files = fs.readdirSync(folderPath);
            const imageFiles = files.filter(f => /\.(jpg|jpeg|png|webp|avif)$/i.test(f));

            imageFiles.forEach((imageFile, index) => {
                const srcPath = path.join(folderPath, imageFile);
                const fileExt = path.extname(imageFile);
                const destFileName = `${id}-${index}${fileExt}`;
                const destPath = path.join(publicAssetsPath, destFileName);

                fs.copyFileSync(srcPath, destPath);
                const publicUrl = `/assets/products/${destFileName}`;
                gallery.push(publicUrl);

                if (index === 0) imageUrl = publicUrl;
            });

            if (imageFiles.length > 0) {
                console.log(`Migrated gallery (${imageFiles.length} images) for: ${name}`);
            }
        }

        if (!imageUrl) {
            imageUrl = `/assets/products/${id}.jpg`; // Fallback
        }

        newProducts.push({
            id,
            name,
            brand,
            category: finalCategory,
            subcategory: subcategory,
            description,
            pricePerDay: price,
            imageUrl,
            gallery,
            specs,
            stock: parseInt(stock) || 0,
            available: parseInt(stock) || 0,
            tags: [brand, finalCategory, subcategory].filter(Boolean),
            included,
            videoUrl: videoUrl || ''
        });
    }

    // Merge or Overwrite? 
    // Usually batch ingestion of a "catalog" means these are the primary products.
    // I'll merge with existing but deduplicate by ID.
    const productMap = new Map();
    existingProducts.forEach(p => productMap.set(p.id, p));
    newProducts.forEach(p => productMap.set(p.id, p));

    const finalProducts = Array.from(productMap.values());
    fs.writeFileSync(productsJsonPath, JSON.stringify(finalProducts, null, 2));
    console.log(`Successfully updated database with ${finalProducts.length} total products.`);
}

run().catch(console.error);
