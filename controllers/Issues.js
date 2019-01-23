const path = require('path');


const Issues = require('../models/Issues');


const create = (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unathorized' });

  Issue = new Issues();
  Issue.views = 1;
  Issue.resolved = false;
  Issue.createdAt = new Date();
  Issue.createdBy = req.user._id;
  Issue.description = req.body.description;

  Issues.save((err, Issue) => {
    if (err || !Issue) return res.status(500).json(err);
    return res.json(Issue);
  });
};


const upload = (req, res) => {
  if (Object.keys(req.files).length == 0) return res.status(400).send('No files.');

  const image = req.files.file;
  const issueId = req.params.issueId;

  image.mv(path.join(__dirname, '..', '/images/', `${issueId}.${image.name.split('.')[1]}`), function (err) {
    if (err) return res.status(500).send(err);
    res.send('File uploaded!');
  });
}


const getById = (req, res) => {
  Issues.findById(req.params.id, (err, Issue) => {
    if (err || !Issue) return res.status(404).json(err);
    Issue.views++;
    Issue.save((err) => {
      if (err) return res.status(500).json(err);
      return res.json(Issue);
    });
  });
};


const getByResolved = (_, res) => {
  Issues.find({
    resolved: req.params.resolved,
  }).lean().exec((err, Issues) => {
    if (err || !Issues) return res.status(404).json(err);
    return res.json(Issues);
  });
};


const updateIssue = (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unathorized' });

  Issues.findOneAndUpdate({
      id: req.params.id,
      createdBy: req.user._id,
    },
    req.body,
    (err, Issue) => {
      if (err || !Issue) return res.status(500).json(err);
      res.json(Issue);
    });
};


const deleteIssue = (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unathorized' });

  Issues.findOneAndRemove({
      id: req.params.id,
      createdBy: req.user._id,
    },
    (err, Issue) => {
      if (err) return res.status(500).json(err);
      res.json(Issue);
    });
};


module.exports = {
  upload,
  create,
  getById,
  updateIssue,
  deleteIssue,
  getByResolved,
};
