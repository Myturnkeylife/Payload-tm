import noJsxImportStatements from './customRules/no-jsx-import-statements.js'
import noNonRetryableAssertions from './customRules/no-non-retryable-assertions.js'
import noRelativeMonorepoImports from './customRules/no-relative-monorepo-imports.js'
import noImportsFromExportsDir from './customRules/no-imports-from-exports-dir.js'
import noFlakyAssertions from './customRules/no-flaky-assertions.js'

/**
 * @type {import('eslint').ESLint.Plugin}
 */
const index = {
  rules: {
    'no-jsx-import-statements': noJsxImportStatements,
    'no-non-retryable-assertions': noNonRetryableAssertions,
    'no-relative-monorepo-imports': noRelativeMonorepoImports,
    'no-imports-from-exports-dir': noImportsFromExportsDir,
    'no-flaky-assertions': noFlakyAssertions,
    'no-wait-function': {
      create: function (context) {
        return {
          CallExpression(node) {
            // Check if the function being called is named "wait"
            if (node.callee.name === 'wait') {
              context.report({
                node,
                message:
                  'Usage of "wait" function is discouraged as it\'s flaky. Proper assertions should be used instead.',
              })
            }
          },
        }
      },
    },
  },
}

export default index
