const { randomHexString } = require('../utils/crypto');
const { showInfo } = require('../services/logger/consoleLogger');

(async function generateHash() {
  const hashValue = randomHexString(32);
  showInfo(`Random String: ${hashValue}`);
})();
