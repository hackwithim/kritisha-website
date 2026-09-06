const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));
  });
  return filelist;
}

const allFiles = walkSync('./src');
const jsxFiles = allFiles.filter(f => f.endsWith('.jsx') || f.endsWith('.js'));
const imageFiles = walkSync('./public/images').filter(f => f.endsWith('.png') || f.endsWith('.jpg'));

const jsxContent = jsxFiles.map(f => fs.readFileSync(f, 'utf-8')).join('\n');

const unusedImages = [];
for (const img of imageFiles) {
  const basename = path.basename(img);
  if (!jsxContent.includes(basename)) {
    unusedImages.push(img);
  }
}
console.log('Unused images:');
console.log(unusedImages.join('\n'));

// Now find unused components
const components = allFiles.filter(f => f.includes('/components/') || f.includes('/pages/')).filter(f => f.endsWith('.jsx'));
const unusedComponents = [];
for (const comp of components) {
  const basename = path.basename(comp, '.jsx');
  // Check if it's imported somewhere (App.jsx, AdminLayout.jsx, etc.)
  // If it's a page, it's imported in App.jsx.
  let isUsed = false;
  for (const f of jsxFiles) {
    if (f !== comp) {
      const content = fs.readFileSync(f, 'utf-8');
      if (content.includes(basename)) {
        isUsed = true;
        break;
      }
    }
  }
  if (!isUsed && basename !== 'App' && basename !== 'main') {
    unusedComponents.push(comp);
  }
}
console.log('Unused components:');
console.log(unusedComponents.join('\n'));
