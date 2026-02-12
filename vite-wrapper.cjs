const { webcrypto } = require('crypto');
if (!globalThis.crypto) {
  globalThis.crypto = webcrypto;
}
require('./node_modules/vite/bin/vite.js');
