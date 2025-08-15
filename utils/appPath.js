const path = require('path');

const ROOT_DIR_PATH = process.cwd();
const ERROR_PAGE_PATH = path.join(ROOT_DIR_PATH, 'public', 'errorPages');

module.exports.getRootDirPath = () => ROOT_DIR_PATH;
module.exports.getErrorPageDirPath = () => ERROR_PAGE_PATH;
