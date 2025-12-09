export const storageWrapper = {
  async get(key) {
    try {
      if (typeof window !== 'undefined' && window.storage && typeof window.storage.get === 'function') {
        const result = window.storage.get(key);
        return (result && typeof result.then === 'function') ? await result : result;
      }
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      console.error('storageWrapper.get error', err);
      throw err;
    }
  },

  async set(key, value) {
    try {
      if (typeof window !== 'undefined' && window.storage && typeof window.storage.set === 'function') {
        const result = window.storage.set(key, value);
        return (result && typeof result.then === 'function') ? await result : result;
      }
      localStorage.setItem(key, JSON.stringify(value));
      return;
    } catch (err) {
      console.error('storageWrapper.set error', err);
      throw err;
    }
  }
};