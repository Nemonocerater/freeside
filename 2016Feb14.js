#!/usr/bin/env node

var program = require('commander');

program.version('0.0.0');

program
	.command('repeat <num>')
	.description('repeat chars in a string num times (string is hardcoded because I\'m lazy)')
	.action(repeat);

program
	.command('sum-of-primes')
	.description('Reads stdin and tells you if the numbers passed to it are the sum of two primes')
	.action(sumOfPrimeMain);

program.parse(process.argv);

function getInputTillEndOfLine(callback) {
	process.stdin.setEncoding('utf8');

	var data = "";

	process.stdin.on('readable', function getInputReadable() {
		var chunk = process.stdin.read();
		if (chunk !== null) {
			data += chunk.toString();
		}
	});

	process.stdin.on('end', function getInputEnd() {
		callback(data);
	});
}

function repeat(num) {
	var string = "\\HTP";

	console.log ('Too boring to do input right... running with default string: ' + string);
	
	var newString = repeatCharacters(num, string);
	console.log(newString);
}

function repeatCharacters(num, string) {
	var chars = string.split('');
	var newChars = [];
	chars.forEach(function(c) {
		for (var i = 0; i < num; i++) {
			newChars.push(c);
		}
	});
	return newChars.join('');
}

function sumOfPrimeMain() {
	getInputTillEndOfLine(function sumOfPrimeMainWithData(data) {
		var nums = data.split('\n');
		var count = parseInt(nums[0]);
		for (var i = 1; i < count + 1; i++) {
			isSumOfPrime(nums[i]);
		}
	});
}

function isSumOfPrime(num) {
	var i = Math.floor(num / 2); // This will be odd
	if (!isOdd(i)) {
		i -= 1;
	}

	while (i > 1) {
		if (isPrime(i) && isPrime(num - i)) {
			sumOfPrimeOutput(num, num - i, i);
			return;
		}
		i -= 2;
	}

	if (isPrime(num - 2)) {
		sumOfPrimeOutput(num, num - 2, 2);
		return;
	}

	console.log(num + " is not prime or the sum of two primes.");
}

function sumOfPrimeOutput(num, a, b) {
	if (a && b) {
		console.log (num + " = " + a + " + " + b);
	} else {
		console.log (num + " is impossible");
	}
}

function isPrime(num) {
	if (num <= 0) {
		return false;
	} else if (num <= 3) {
		return true;
	} else if (num % 2 == 0 || num % 3 == 0) {
		return false;
	}

	var i = 5;
	while (i * i <= num) {
		if (num % i == 0 || num % (i + 2) == 0) {
			return false;
		}
		i += 6;
	}

	return true;
}

function isOdd(num) {
	return num % 2 == 1;
}
