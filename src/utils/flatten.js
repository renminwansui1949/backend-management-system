import { flatMapDeep } from 'lodash'

export function flattenTree(tree, childrenKey = 'children') {
  return flatMapDeep(tree, (node) => {
    const { [childrenKey]: children, ...rest } = node
    return [rest, ...(children ? flattenTree(children, childrenKey) : [])]
  })
}
