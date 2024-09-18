const fs = require('fs')

const keysCount = 1000
const complexity = 100000000

const keys = new Array(keysCount).fill(0).map(() => 'key' + Math.random().toString(36).slice(2))

const makeObject = () => '{' + keys.map((key) => key + ': () => Math.random()').join(',') + '}'
const makeIfelse = () => keys.reduce((prev, key) => prev + `if (target=='${key}') { Math.random(); } else `, '').slice(0, -5)
const makeTargets = () => keys.map((key) => `'${key}'`).join(',')

const objectJsCode = `const targets = [${makeTargets()}]; const obj = ${ makeObject() }; const startTime = process.hrtime(); for (let i = 0; i < ${complexity}; i++) { const target = targets[i%targets.length]; obj[target]();} console.log(process.hrtime(startTime))`;
const ifElseCode = `const targets = [${makeTargets()}]; const startTime = process.hrtime(); for (let i = 0; i < ${complexity}; i++) { const target = targets[i%targets.length]; ${ makeIfelse() }; } console.log(process.hrtime(startTime))`;

fs.writeFileSync('object.js', objectJsCode)
fs.writeFileSync('ifelse.js', ifElseCode)