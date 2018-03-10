#!/usr/bin/env node

var program = require('commander');

program
	.version('0.0.0')
	.option('-p, --problem [number]', 'The problem to run')
	.parse(process.argv);

switch(parseInt(program.problem)) {
	case 0:
		p0();
		break;
}

function p0() {
	console.log("0");
}
