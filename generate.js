const fs = require('fs')

const keysCount = 1000
const complexity = 100000000

const keys = new Array(keysCount).fill(0).map(() => 'key' + Math.random().toString(36).slice(2))
const target = keys[Math.floor(Math.random() * keys.length)]

const makeObject = () => '{' + keys.map((key) => key + ': () => Math.random()').join(',') + '}'
const makeIfelse = () => keys.reduce((prev, key) => prev + `if (target=='${key}') { Math.random(); } else `, '').slice(0, -5)

const objectJsCode = `const target = '${target}'; const obj = ${ makeObject() }; const startTime = process.hrtime(); for (let i = 0; i < ${complexity}; i++) obj.${target}(); console.log(process.hrtime(startTime))`;
const ifElseCode = `const target = '${target}'; const startTime = process.hrtime(); for (let i = 0; i < ${complexity}; i++) ${ makeIfelse() }; console.log(process.hrtime(startTime))`;

fs.writeFileSync('object.js', objectJsCode)
fs.writeFileSync('ifelse.js', ifElseCode)