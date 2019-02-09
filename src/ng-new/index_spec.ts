import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
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

  it('should have the tslint.json file overwritten', () => {
    const options = { ...defaultOptions };
    const host = schematicRunner.runSchematic('ng-new', options);
    const { files } = host;
    const tslintPath = `/${options.name}/tslint.json`;
    expect(files).toContain(tslintPath);
    const content = host.readContent(tslintPath);
    expect(() => JSON.parse(content)).not.toThrow();
    const json = JSON.parse(content);
    const expectedJson = JSON.parse(fs.readFileSync(`src/ng-new/files/tslint.json`).toString());
    expect(json).toEqual(expectedJson);
  });
});
