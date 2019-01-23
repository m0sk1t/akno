const cron = require('node-cron');


const Users = require('./models/Users');


const sendReminder = (user) => {
  throw 'Not implemented yet';
};


const remindForOldUnresolvedIssues = () => {
  Users.find({ HR: true }, { _id: true }).lean().exec((err, users) => {
    if (err) return console.error("Unable to get data from Users.", err)
    users.forEach(user => {
      sendReminder(user);
    });
  });
};


const task = cron.schedule('* * 1 * *', () => remindForOldUnresolvedIssues());


module.exports = task;


