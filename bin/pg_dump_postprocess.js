#!/usr/bin/env node

// Postprocesses pg_dump output into a .processed.sql file containing
// 1 unique transaction with only inserts, ready to be fed to sqlite.

import fs from 'fs'
import readline from 'readline'

const FILE = process.argv[2]

async function processLineByLine() {
	const fileStream = fs.createReadStream(FILE)

	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity,
	})
	// Note: we use the crlfDelay option to recognize all instances of CR LF
	// ('\r\n') in input.txt as a single line break.

	console.log('BEGIN TRANSACTION;')
	for await (const line of rl) {
		console.log(processLine(line))
	}
	console.log('COMMIT;')
}

const processLine = (line) => {
	// remove unneeded lines:
	if (line.startsWith('--')) return ''
	if (line.startsWith('SET')) return ''
	if (line.startsWith('SELECT')) return ''
	if (line.includes('_prisma_migrations')) return ''

	// process remaining lines:
	const datetimes = /'(.{4}-.{2}-.{2} .[^']+)'/g
	return line //
		.replaceAll(datetimes, (a) => new Date(a).getTime()) // replace DateTimes with timestamps
		.replaceAll('public.', '') // removes schema prefix
}

processLineByLine()
