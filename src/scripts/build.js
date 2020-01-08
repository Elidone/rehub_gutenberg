/**
 * Build
 *
 * The create-guten-block CLI builds here.
 */

'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on( 'unhandledRejection', err => {
	throw err;
} );

// Modules.
const fs = require( 'fs' );
const ora = require( 'ora' );
const path = require( 'path' );
const chalk = require( 'chalk' );
const webpack = require( 'webpack' );
const fileSize = require( 'filesize' );
// const gzipSize = require( 'gzip-size' );
const config = require( './config/webpack.build.conf' );
const clearConsole = require( './help/clearConsole' );
const formatWebpackMessages = require( './help/formatWebpackMessages' );
const readline = require('readline');


var filesList;


// Build file paths.
const theCWD = process.cwd();
const fileBuildJS = path.resolve( theCWD, './dist/frontend.js' );
const fileEditorCSS = path.resolve( theCWD, './dist/editor.css' );
const fileStyleCSS = path.resolve( theCWD, './dist/frontend.css' );
const dirDistPath = path.resolve(theCWD,'./dist/');


/**
 * Get File Size
 *
 * Get filesizes of all the files.
 *
 * @param {string} filePath path.
 * @returns {string} then size result.
 */
const getFileSize = filePath => {
	return fileSize( fs.readFileSync( filePath )  );
};

clearConsole();

// Init the spinner.
const spinner = new ora( { text: '' } );


function waitForExit() {
	console.log( '\n\n ', chalk.black.bgRed( ' Press any key to exit \n\n' ) );

	process.stdin.setRawMode(true);
	process.stdin.resume();
	process.stdin.on('data', process.exit.bind(process, 0));
}



/**
 * Build function
 *
 * Create the production build and print the deployment instructions.
 *
 * @param {json} webpackConfig config
 */
async function build( webpackConfig ) {
	// Compiler Instance.
	const compiler = await webpack( webpackConfig );

	// Run the compiler.
	compiler.run( ( err, stats ) => {
		clearConsole();

		if ( err ) {
			return console.log( err );
		}

		// Get the messages formatted.
		const messages = formatWebpackMessages( stats.toJson( {}, true ) );

		// If there are errors just show the errors.
		if ( messages.errors.length ) {
			// Only keep the first error. Others are often indicative
			// of the same problem, but confuse the reader with noise.
			if ( messages.errors.length > 1 ) {
				messages.errors.length = 1;
			}
			// Formatted errors.
			// clearConsole();
			console.log( '\nX ', chalk.black.bgRed( ' Failed to compile build. \n' ) );
			console.log( '\n-> ', messages.errors.join( '\n\n' ) );

			waitForExit();

			// Don't go beyond this point at this time.
			return;
		}

		// CI.
		if (
			process.env.CI &&
			( typeof process.env.CI !== 'string' ||
				process.env.CI.toLowerCase() !== 'false' ) &&
			messages.warnings.length
		) {
			console.log(
				chalk.yellow(
					'\nTreating warnings as errors because process.env.CI = true.\n' +
						'Most CI servers set it automatically.\n'
				)
			);
			console.log( messages.warnings.join( '\n\n' ) );
		}

		// Start the build.
		console.log( `\n ${ chalk.dim( 'Let\'s build and compile the files...' ) }` );
		console.log( '\n✅ ', chalk.black.bgGreen( ' Built successfully! \n' ) );

		/*console.log(
			'\n\n',
			'File sizes after gzip:',
			'\n\n',
			getFileSize( fileBuildJS ),
			`${ chalk.dim( '— ./dist/' ) }`,
			`${ chalk.green( 'frontend.js' ) }`,
			'\n',
			getFileSize( fileEditorCSS ),
			`${ chalk.dim( '— ./dist/' ) }`,
			`${ chalk.green( 'editor.css' ) }`,

			'\n',
			getFileSize( fileStyleCSS ),
			`${ chalk.dim( '— ./dist/' ) }`,
			`${ chalk.green( 'frontend.css' ) }`,

			'\n\n'
		);*/



		return true;
	} );

}


build( config );
