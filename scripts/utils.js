const fs = require('fs');
const path = require('path');

const getFiles = (entry, extensions = [], excludeExtensions = []) => {
    let fileNames = [];
    const dirs = fs.readdirSync(entry);

    dirs.forEach((dir) => {
        const path = `${entry}/${dir}`;

        if (fs.lstatSync(path).isDirectory()) {
            fileNames = [
                ...fileNames,
                ...getFiles(path, extensions, excludeExtensions),
            ];

            return;
        }

        if (!excludeExtensions.some((exclude) => dir.endsWith(exclude))
            && extensions.some((ext) => dir.endsWith(ext))
        ) {
            fileNames.push(path);
        }
    });

    return fileNames;
};

const getStyleDirnames = (sourceFiles = [], excludeFiles = [], styleDirname = '/style/') => {
    return sourceFiles.filter(sf => {
        console.log(sf);
        if (excludeFiles.indexOf(sf) > -1) {
            return false;
        }
        if (sf.indexOf(styleDirname) === -1) {
            return false;
        }
        return true;
    }).map(sf => path.dirname(sf));
};

const getComponentStyleTargets = (sourceFiles = [], excludeFiles = [], removeTagetDir = '', addSourceDir = '') => {
    const removeTagetDirFattern = new RegExp(`${removeTagetDir}/+`);
    return sourceFiles.filter(sf => {
        if (excludeFiles.indexOf(sf) > -1) {
            return false;
        }
        if (sf.indexOf('/style/') === -1) {
            return false;
        }
        return true;
    }).map(sf => path.dirname(sf.replace(removeTagetDirFattern, `${addSourceDir}/`)));
};

const copyStyleFilesToDest = (sourceFiles = [], excludeFiles = [], removeTagetDir = '', addSourceDir = '') => {
    const sourceStyleDirs = getStyleDirnames(sourceFiles, excludeFiles);
    const removeTagetDirFattern = new RegExp(`${removeTagetDir}/+`);
    const targets = [];
    console.log(sourceStyleDirs);

    for (let i = 0; i < sourceStyleDirs.length; i++) {
        const sourceStyleDir = sourceStyleDirs[i];
        const targetStyleDir = sourceStyleDir.replace(removeTagetDirFattern, `${addSourceDir}/`);
        const selectFilesFromSourceStyleDir = `${sourceStyleDir}/**/*`.replace(/\/+/g, '/');
        targets.push({
            src: selectFilesFromSourceStyleDir,
            dest: targetStyleDir
        });
    }

    return targets;
};

module.exports = {
    getFiles,
    getComponentStyleTargets,
    copyStyleFilesToDest
};
