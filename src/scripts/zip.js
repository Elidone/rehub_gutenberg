const stat = require('fs').statSync;
const AdmZip = require('adm-zip');

/**
 * Example usage
 */
const folder = 'rehub-theme-child/';

newArchive(`rehub-theme-child.zip`, [
	'core',
	'dist',
	'languages',
	'functions.php',
	'style.css',

	'src',
	'package.json',
]);

/**
 * @param {String} zipFileName
 * @param {Array<String>} pathNames
 */
function newArchive(zipFileName, pathNames) {

	const zip = new AdmZip();

	pathNames.forEach(path => {
		const p = stat(path);
		if (p.isFile()) {
			zip.addLocalFile(path,folder);
		} else if (p.isDirectory()) {
			zip.addLocalFolder(path, folder+path);
		}
	});

	zip.writeZip(zipFileName);
}
