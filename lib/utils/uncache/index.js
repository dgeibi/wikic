/**
 * Runs over the cache to search for all the cached files.
 */
const searchCache = (moduleName, test, callback) => {
  const moduleId = require.resolve(moduleName)
  const module = require.cache[moduleId]
  // Check if the module has been resolved and found within the cache.
  if (moduleId && module !== undefined) {
    const r = m => {
      if (test(m)) {
        callback(m)
        m.children.forEach(r)
      }
    }
    r(module)
  }
}

const deleteCache = mod => {
  delete require.cache[mod.id]
}

const re = /node_modules/
const test = mod => require.cache[mod.id] && !re.test(mod.id)

/**
 * Removes a module(in node_modules) from the cache.
 * Based on this snippet: http://stackoverflow.com/questions/9210542/node-js-require-cache-possible-to-invalidate/14801711#14801711
 * @param {string} moduleName
 */
module.exports = (moduleName, beforeDelete) => {
  const callback =
    typeof beforeDelete === 'function'
      ? mod => {
          beforeDelete(mod)
          deleteCache(mod)
        }
      : deleteCache
  searchCache(moduleName, test, callback)
}
