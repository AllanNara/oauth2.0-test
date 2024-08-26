const bcrypt = require("bcrypt");

module.exports = {
  hashPassword: (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  },
  validatePassword: (password, hash) => {
    return bcrypt.compareSync(password, hash);
  }
}