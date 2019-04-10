const path = require('path');
const fs = require('fs');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'fetch-ntlm.js',
    libraryTarget: 'var',
    library: 'fetchNtlm'
  },
  // optimization: {
	// 	// We no not want to minimize our code.
	// 	minimize: false
	// },

  resolve: {
    extensions: ['.js']
  },
 
};