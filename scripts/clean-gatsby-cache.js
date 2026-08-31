const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');

for (const directory of ['.cache', 'public']) {
   const target = path.join(projectRoot, directory);
   fs.rmSync(target, { recursive: true, force: true });
   console.log(`Removed generated directory: ${directory}`);
}
