const fs = require('fs');
const path = require('path');

const stdout = process.stdout;

const input = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');

input.on('data', partData => stdout.write(partData));

input.on('error', error => stdout.write('Error', error.message));