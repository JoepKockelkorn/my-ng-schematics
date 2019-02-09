import { normalize } from '@angular-devkit/core';
import {
  apply,
  chain,
  externalSchematic,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  Tree,
  url
} from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { validateProjectName } from '@schematics/angular/utility/validation';

import { Schema } from './schema';

function overWriteFiles(options: Schema) {
  return (host: Tree) => {
    let newProjectRoot = '';
    try {
      const workspace = getWorkspace(host);
      newProjectRoot = workspace.newProjectRoot || '';
    } catch {}
    const rootDir = normalize(`${newProjectRoot}/${options.name}`);

    return mergeWith(apply(url('./files'), [move(rootDir)]), MergeStrategy.Overwrite);
  };
}

export default function(options: Schema): Rule {
  return (_tree: Tree) => {
    validateProjectName(options.name);

    return chain([
      externalSchematic('@schematics/angular', 'ng-new', {
        ...options,
        skipInstall: true
      }),
      overWriteFiles(options)
    ]);
  };
}
