const router = require('express').Router();


router.use('/api/v1/auth', require('./routes/Auth').router);
router.use('/api/v1/issue', require('./routes/Issues'));
router.use('/api/v1/users', require('./routes/Users'));


module.exports = router;
