const fs = require('fs');
const path = require('path');
const clangFormat = require('clang-format');
var Vinyl = require('vinyl');

const formatAllOutputFiles = function(dirPath) {
    const files = fs.readdirSync(dirPath);
    files.forEach(async (file) => {
      const filePath = path.join(dirPath, file);
      if (fs.statSync(filePath).isDirectory()) {
        formatAllOutputFiles(filePath);
      } else {
        if (file.endsWith(".cpp") || file.endsWith(".hpp")) {
          var vinylFile = new Vinyl({
            path: filePath
          });
          const stream = await clangFormat(vinylFile, "utf-8", "WebKit", () => {});
          const writable = fs.createWriteStream(filePath);
          stream.pipe(writable);
        }
      } 
    });
  };

/**
 * Format all source files with indentations and new lines
 */
module.exports = {
    'generate:after': (generator) => {
        let pathToDir = path.resolve(generator.targetDir, '');
        let srcDir = path.join(pathToDir, 'src');
        formatAllOutputFiles(srcDir);
    }
};