const { randomString } = require('../utils/random');
const {
  prettyLogger: { showMsg },
} = require('../services/logger');

(async function generateHash() {
  const hashValue = randomString(32);
  showMsg(`Random String: ${hashValue}`);
})();
