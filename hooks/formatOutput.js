const fs = require('fs');
const path = require('path');
const clangFormat = require('clang-format');
var Vinyl = require('vinyl');
const archiver = require('archiver');
const { rimraf } = require('rimraf');

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

const removeUnnecessaryFiles = function(dirPath, zipFileName) {
  rimraf.sync(dirPath, {
    preserveRoot: false,
    filter: (filePath, ent) => {
      const isRootDir = filePath === dirPath;
      const isZipFile = filePath === path.join(dirPath, zipFileName);
      return !isRootDir && !isZipFile;
    }
  });
}

const zipFiles = async function(dirPath) {
  const zipFileName = '/asyncapi_cpp_client.zip';
  const output = fs.createWriteStream(path.join(dirPath, zipFileName));

  const archive = archiver('zip', {
    zlib: { level: 9 },
    forceLocalTime: true
  });

  output.on('close', () => {
    console.log('Zip file is ready.');
    removeUnnecessaryFiles(dirPath, zipFileName);
  });

  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(output);
  archive.glob("**/!(*.zip)", { cwd: dirPath, dot: true })

  await archive.finalize();
}

function addPermissionToBuildFile(outputDir) {
  const buildFilePath = path.join(outputDir, 'mosquitto_build.sh');
  if (fs.existsSync(buildFilePath)) {
    fs.chmodSync(buildFilePath, 0o777);
  }
}

/**
 * Format all source files with indentations and new lines
 */
module.exports = {
    'generate:after': async (generator) => {
        let pathToDir = path.resolve(generator.targetDir, '');
        let srcDir = path.join(pathToDir, 'src');
        addPermissionToBuildFile(pathToDir);
        formatAllOutputFiles(srcDir);
        if (generator.templateParams.zip === "true") {
          await zipFiles(pathToDir);
        }
    }
};