import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

import { Schema } from './schema';

const collectionPath = path.join(__dirname, '../collection.json');

describe('ng-new', () => {
  it('works', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const options: Schema = {
      name: 'test',
      version: '7'
    };
    const tree = runner.runSchematic('ng-new', options, Tree.empty());

    expect(tree.files.length).toEqual(1);
  });
});
