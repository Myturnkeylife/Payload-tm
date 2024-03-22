/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow imports from relative monorepo packages/*/src',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [],
  },
  create: function (context) {
    return {
      ImportDeclaration(node) {
        const importPath = node.source.value

        // Match imports starting with any number of "../" followed by "packages/"
        const regex = /^(\.\.\/)*packages\/[^/]+\/src/

        if (regex.test(importPath)) {
          context.report({
            node: node.source,
            message: 'Import from relative "packages/*/src" is not allowed',
          })
        }
      },
    }
  },
}
