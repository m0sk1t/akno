const router = require('express').Router();


const { ensureAuthenticated } = require('./Auth');
const {
  create,
  upload,
  getById,
  updateIssue,
  deleteIssue,
  getByResolved,
} = require('../controllers/Issues');


if (process.env.NODE_ENV === 'development') {
  router.post('/', create);
  router.get('/:id', getById);
  router.put('/', updateIssue);
  router.delete('/', deleteIssue);
  router.post('/upload/:issueId', upload);
  router.get('/:resolved', getByResolved);
} else {
  router.get('/:id', getById);
  router.get('/:resolved', getByResolved);
  router.post('/', ensureAuthenticated, create);
  router.put('/', ensureAuthenticated, updateIssue);
  router.delete('/', ensureAuthenticated, deleteIssue);
  router.post('/upload/:issueId', ensureAuthenticated, upload);
}


module.exports = router;
