const electronStorage = require('electron-json-storage')
const {dialog} = require('electron')

let storage

/**
 * [init - init storage]
 * @return {Promise} [promise when initialized]
 */
let init = () => (
  new Promise((resolve, reject) => (
    electronStorage.has('notes', (err, exist) => {
      if (err) throw err
      if (exist) resolve(fetch())
      else {
        storage = []
        resolve(save())
      }
    })
  ))
)

/**
 * [fetch - fetch storage]
 * @return {Promise} [promise when fetched]
 */
let fetch = () => (
  new Promise((resolve, reject) => {
    storage = [];
    electronStorage.get('notes', (err, data) => {
      if (!data) resolve(false)
      if (err) {
        dialog.showErrorBox('loading storage file error', err)
        resolve(false)
      }
      storage = data
      resolve(true)
    })
  })
)

/**
 * [get - return settings of target browser]
 * @param  {string} el      [element to get]
 * @return {string|Object}  [settings string or object]
 */
let get = (el) => {
  return (storage[el] !== null || storage[el] !== undefined) ? storage[el] : {}
}

/**
 * [add - add object settings to storage]
 * @param {Object} payload [object setting to add & save]
 */
let add = (payload) => (
  new Promise((resolve, reject) => {
    Object.assign(storage, payload)
    resolve(save())
  })
)

/**
 * [save - save current storage]
 * @return {Promise} [promise when saved]
 */
let save = () => (
  new Promise((resolve, reject) => {
    electronStorage.set('notes', storage, (err, data) => {
      if (err) throw err
      resolve(true)
    })
  })
)

/**
 * [reset - reset storage to default]
 */
let reset = () => {
  electronStorage.remove('notes')
  storage = []
  save()
}

module.exports = {
  init: init,
  get: get,
  add: add,
  reset: reset
}