/**
 * AsyncLocalStorage Store Service
 *
 * Purpose:
 * - Provides a centralized AsyncLocalStorage instance for storing and retrieving
 *   per-request context data (e.g., requestId, traceId, userId).
 * - Useful for logging, tracing, and passing metadata without modifying function signatures.
 *
 * Example usage in an Express middleware:
 * ```js
 * const { runWithStore } = require('./services/store');
 * app.use((req, res, next) => {
 *   runWithStore(() => next(), { requestId: uuidv4(), userId: req.user?.id });
 * });
 * ```
 *
 * Example usage in a logger:
 * ```js
 * const { getStoreData } = require('./services/store');
 * const context = getStoreData();
 * logger.info('Some log message', context);
 * ```
 */

const { AsyncLocalStorage } = require('node:async_hooks');
const AppError = require('../errors/AppError');
const errorRegistry = require('../errors/errorRegistry');

let store = new AsyncLocalStorage();

/**
 * Sets a new store instance.
 * This is useful for testing or when you need to replace the
 * default store with a different implementation.
 *
 * @param {AsyncLocalStorage} newStore - The new store instance to set.
 * @throws {AppError} If the provided store is not an instance of AsyncLocalStorage.
 */
const setStore = (newStore) => {
  if (!(newStore instanceof AsyncLocalStorage)) {
    throw new AppError(
      'The provided store must be an instance of AsyncLocalStorage',
      400,
      errorRegistry.GENERAL.INVALID_STORE_INSTANCE
    );
  }
  store = newStore;
};

/**
 * Retrieves the current store instance.
 * If no store has been set, it initializes a new AsyncLocalStorage instance.
 *
 * @returns {AsyncLocalStorage} The current store instance.
 */
const getStore = () => {
  if (!store) {
    store = new AsyncLocalStorage();
  }
  return store;
};

/**
 * Runs a callback function within the context of the current store.
 * Allows executing code with a specific store data context.
 *
 * @template T
 * @param {Function} callback - The function to run within the store context.
 * @param {Object} storeData - The data to set in the store for the duration of the callback execution.
 * @returns {T} The result of the callback function.
 */
const runWithStore = (callback, storeData) => {
  const currentStore = getStore();
  return currentStore.run(storeData, callback);
};

/**
 * Retrieves the current store data.
 *
 * @returns {Object} The data stored in the current store. Returns `undefined` if called outside a store context.
 */
const getStoreData = () => {
  const currentStore = getStore();
  return currentStore.getStore();
};

module.exports = {
  getStore,
  runWithStore,
  getStoreData,
  setStore,
};
