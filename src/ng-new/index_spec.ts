import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as fs from 'fs';
import * as path from 'path';

import { Schema } from './schema';

const collectionPath = path.join(__dirname, '../collection.json');

describe('ng-new', () => {
  const defaultOptions: Schema = {
    name: 'mySchematicWorkspace',
    version: '7.0.0'
  };
  const schematicRunner = new SchematicTestRunner('schematics', collectionPath);

  it('should call external @schematics/angular', () => {
    const options = { ...defaultOptions };
    const host = schematicRunner.runSchematic('ng-new', options);
    const { files } = host;
    expect(files).toContain(`/${options.name}/angular.json`);
  });

  it('should have various files overwritten', () => {
    const options = { ...defaultOptions };
    const host = schematicRunner.runSchematic('ng-new', options);
    const filesToTest = ['tslint.json', '.vscode/launch.json', '.vscode/settings.json'];
    for (const file of filesToTest) {
      testFile(host, options.name, file);
    }
  });
});

function testFile(host: UnitTestTree, name: string, file: string) {
  const filePath = `/${name}/${file}`;
  const { files } = host;
  expect(files).toContain(filePath);
  const content = host.readContent(filePath);
  expect(() => JSON.parse(content)).not.toThrow();
  const json = JSON.parse(content);
  const expectedJson = JSON.parse(fs.readFileSync(`src/ng-new/files/${file}`).toString());
  expect(json).toEqual(expectedJson);
}
