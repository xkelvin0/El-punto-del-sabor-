const fs = require('fs');
const path = require('path');
const Terser = require('terser');
const CleanCSS = require('clean-css');

// Create minified directory if it doesn't exist
const minDir = path.join(__dirname, '.');
if (!fs.existsSync(minDir)) {
    fs.mkdirSync(minDir);
}

async function minifyFile(filePath) {
    try {
        const ext = path.extname(filePath).toLowerCase();
        const fileName = path.basename(filePath, ext);
        const minExt = ext === '.js' ? '.min.js' : '.min.css';
        const outputPath = path.join(minDir, fileName + minExt);
        
        const content = fs.readFileSync(filePath, 'utf8');
        let minified;
        
        if (ext === '.js') {
            const result = await Terser.minify(content);
            if (result.error) throw result.error;
            minified = result.code;
        } else { // CSS
            const result = await new CleanCSS({}).minify(content);
            if (result.errors && result.errors.length > 0) {
                throw new Error(result.errors.join('\n'));
            }
            minified = result.styles;
        }
        
        fs.writeFileSync(outputPath, minified);
        console.log(`Minified: ${filePath} -> ${outputPath}`);
        return true;
    } catch (error) {
        console.error(`Error minifying ${filePath}:`, error);
        return false;
    }
}

async function processFiles() {
    const filesToMinify = [
        // CSS files
        'css/animations.css',
        'css/base.css',
        'css/components.css',
        'css/layout.css',
        'css/producto-detalle.css',
        'css/responsive.css',
        // JS files
        'js/busqueda.js',
        'js/carrito-producto.js',
        'js/carrito.js',
        'js/filtros.js',
        'js/navegacion.js',
        'js/notificaciones.js',
        'js/producto-detalle.js',
        'js/reproductor.js',
        'js/script.js'
    ];

    let successCount = 0;
    for (const file of filesToMinify) {
        const filePath = path.join(__dirname, '..', file);
        if (fs.existsSync(filePath)) {
            const success = await minifyFile(filePath);
            if (success) successCount++;
        } else {
            console.warn(`File not found: ${filePath}`);
        }
    }

    console.log(`\nMinification complete! Successfully minified ${successCount} of ${filesToMinify.length} files.`);
    console.log(`Minified files are saved in the 'minified' directory.`);
}

// Run the script
processFiles().catch(console.error);
