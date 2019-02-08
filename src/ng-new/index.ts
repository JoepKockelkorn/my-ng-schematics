import { chain, externalSchematic, Rule, Tree } from '@angular-devkit/schematics';
import { validateProjectName } from '@schematics/angular/utility/validation';

import { Schema } from './schema';

export default function(options: Schema): Rule {
  return (_tree: Tree) => {
    validateProjectName(options.name);

    return chain([
      externalSchematic('@schematics/angular', 'ng-new', {
        ...options,
        skipInstall: true
      })
    ]);
  };
}
