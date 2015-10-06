/**
 * Imports
 */

import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer'
import effects from 'redux-effects'
import events from 'redux-effects-events'
import location from 'redux-effects-location'
import multi from 'redux-multi'
import logger from 'redux-logger'

/**
 * Middleware
 */

 const middleware = [
   multi,
   effects,
   events(),
   location(),
   logger
 ]

/**
 * Store
 */

function configureStore (initialState) {
  return applyMiddleware(...middleware)(createStore)(reducer, initialState)
}

/**
 * Exports
 */

export default configureStore
