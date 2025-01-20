import * as fs from "fs";
import archiver from "archiver";

(() => {
    const files = [
        'manifest.json',
        'browser-mock.iml',
    ];
    const directories = [
        'static',
        'dist',
    ];

    const zipFileName = `wesflo-chrome-mock.zip`;
    const output = fs.createWriteStream(zipFileName);
    const archive = archiver('zip', {
        zlib: { level: 9 },
    });

    output.on('close', () => {
        console.log(archive.pointer() + ' total bytes');
        console.log(`Zip ${zipFileName} generated`);
    });

    archive.on('error', (err) => {
        throw err;
    });

    archive.pipe(output);

    files.forEach(file => archive.file(file, {name: file} ));
    directories.forEach(directory => archive.directory(directory, directory ));

    archive.finalize();
})()