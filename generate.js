const fs = require('fs')

const complexity = 1000

const keys = new Array(complexity).fill(0).map(() => 'key' + Math.random().toString(36).slice(2))
const target = keys[Math.floor(Math.random() * keys.length)]

const makeObject = () => '{' + keys.map((key) => key + ': () => console.log(Math.random())').join(',') + '}'
const makeIfelse = () => keys.reduce((prev, key) => prev + `if (target=='${key}') { console.log(Math.random()); } else `, '').slice(0, -5)

const objectJsCode = `const obj = ${ makeObject() }; const startTime = process.hrtime(); obj.${target}(); console.log(process.hrtime(startTime))`;
const ifElseCode = `const target = '${target}'; const startTime = process.hrtime(); ${makeIfelse()}; console.log(process.hrtime(startTime))`;

fs.writeFileSync('object.js', objectJsCode)
fs.writeFileSync('ifelse.js', ifElseCode)