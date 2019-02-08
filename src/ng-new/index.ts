import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

import { Schema } from './schema';

export default function(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    tree.create('hello', 'world');
    return tree;
  };
}
