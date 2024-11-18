import type { CreateJSONQueryArgs } from '../../types.js'

const operatorMap: Record<string, string> = {
  contains: '~',
  equals: '==',
  in: 'in',
  like: 'like_regex',
  not_equals: '!=',
  not_in: 'in',
}

const sanitizeValue = (value: unknown, operator?: string) => {
  if (typeof value === 'string') {
    // ignore casing with like
    return `"${operator === 'like' ? '(?i)' : ''}${value}"`
  }

  return value as string
}

export const createJSONQuery = ({ column, operator, pathSegments, value }: CreateJSONQueryArgs) => {
  const columnName = typeof column === 'object' ? column.name : column
  const jsonPaths = pathSegments
    .slice(1)
    .map((key) => {
      return `${key}[*]`
    })
    .join('.')

  let sql = ''

  if (['in', 'not_in'].includes(operator) && Array.isArray(value)) {
    value.forEach((item, i) => {
      sql = `${sql}${createJSONQuery({ column, operator: operator === 'in' ? 'equals' : 'not_equals', pathSegments, value: item })}${i === value.length - 1 ? '' : ` ${operator === 'in' ? 'OR' : 'AND'} `}`
    })
  } else if (operator === 'exists') {
    sql = `${value === false ? 'NOT ' : ''}jsonb_path_exists(${columnName}, '$.${jsonPaths}')`
  } else {
    sql = `jsonb_path_exists(${columnName}, '$.${jsonPaths} ? (@ ${operatorMap[operator]} ${sanitizeValue(value, operator)})')`
  }

  return sql
}
