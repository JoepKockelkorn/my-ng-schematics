import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

export function ngNew(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    tree.create('hello', 'world');
    return tree;
  };
}
