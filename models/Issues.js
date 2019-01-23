const Issues = require('mongoose').model('Issues', {
  views: Number,
  createdAt: Date,
  createdBy: String,
  resolvedBy: String,
  description: String,
});


module.exports = Issues;
