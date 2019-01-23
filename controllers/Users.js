const Users = require('../models/Users');


const getSelf = (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unathorized' });

  Users.findById(req.user._id).lean().exec((err, User) => {
    if (err || !User) return res.status(404).json(err);
    delete User.prism.token;
    return res.json(User);
  });
};


const updateUser = (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unathorized' });

  delete req.body.prism.token;

  Users.findByIdAndUpdate(
    req.user._id,
    req.body,
    (err, User) => {
      if (err) return res.status(500).json(err);
      delete User.prism.token;
      res.json(User);
    });
};


const deleteUser = (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unathorized' });

  Users.findByIdAndRemove(req.user._id, (err, User) => {
    if (err) return res.status(500).json(err);
    res.json(User);
  });
};


module.exports = {
  getSelf,
  updateUser,
  deleteUser,
};
