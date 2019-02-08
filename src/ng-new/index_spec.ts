import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
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
});
