const { compileFromFile } = require('json-schema-to-typescript');
const fs = require('fs');

compileFromFile('./src/ng-new/schema.json').then(ts => fs.writeFileSync('./src/ng-new/schema.d.ts', ts));
