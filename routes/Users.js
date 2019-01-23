const router = require('express').Router();


const { ensureAuthenticated } = require('./Auth');
const {
  getSelf,
  deleteUser,
  updateUser,
} = require('../controllers/Users');


if (process.env.NODE_ENV === 'development') {
  router.get('/', getSelf);
  router.put('/', updateUser);
  router.delete('/', deleteUser);
} else {
  router.get('/', ensureAuthenticated, getSelf);
  router.put('/', ensureAuthenticated, updateUser);
  router.delete('/', ensureAuthenticated, deleteUser);
}


module.exports = router;
