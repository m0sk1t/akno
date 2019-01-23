const Users = require('mongoose').model('Users', {
  HR: Boolean,
  prism: {
    id: String,
    username: String,
    accessToken: String,
    name: {
      last: String,
      first: String,
    },
    room: String,
    email: String,
    phone: String,
    image: String,
    skype: String,
  },
});

module.exports = Users;
