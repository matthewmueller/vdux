/**
 * Imports
 */

import delegate from 'delegant'
import compose from 'compose-function'
import {diff, patch, create} from 'virtual-dom'

/**
 * vdux
 */

function vdux (store, app, node) {
  /**
   * Render the VDOM tree
   */

  let tree = render()
  let rootNode = create(tree)

  node.appendChild(rootNode)

  /**
   * Create the Virtual DOM <-> Redux cycle
   */

  return compose(
    delegate(node, action => action && store.dispatch(action)),
    store.subscribe(update)
  )

  /**
   * Render a new virtual dom
   */

  function render () {
    return app(store.getState())
  }

  /**
   * Sync the virtual dom and the actual dom
   */

  function update () {
    const newTree = render()

    rootNode = patch(rootNode, diff(tree, newTree))
    tree = newTree
  }
}

/**
 * Exports
 */

export default vdux
