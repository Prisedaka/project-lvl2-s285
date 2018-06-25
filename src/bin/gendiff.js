#!/usr/bin/env node

const commander = require('commander');
commander
    .option('-V, --version', 'output the version number')
    .option('-f, --format [type]', 'output format')
    .parse(process.argv);
