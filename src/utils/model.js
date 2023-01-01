import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

function read(fileName) {
  let data = readFileSync(resolve('database', fileName + '.json'), 'utf-8')
  return JSON.parse(data)
}


function write(fileName, data) {
  writeFileSync(resolve('database', fileName + '.json'), JSON.stringify(data, null, 4))
  return true
}

process.DEFAULT = {};
process.DEFAULT.pagination = {}
process.DEFAULT.pagination.page = 1
process.DEFAULT.pagination.limit = 5

const PORT = 5000;


export {
  read,
  write,
  PORT
}