const express = require('express');
const app = express();
const headerConfig = require('./Utils/HeaderConfig');
const errorHandling = require('./Utils/ErrorHandling');
const otp = require('./Controllers/otp');
const company = require('./Controllers/company');
const users = require('./Controllers/users');
const announcements = require('./Controllers/announcement');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(headerConfig);

app.use('/api/squash/otp', otp);
app.use('/api/squash/company', company);
app.use('/api/squash/users', users);
app.use('/api/squash/announcement', announcements);
app.use(errorHandling);

const port = process.env.port || 8080;

app.listen(port, () => {
  console.log(`server listening to port ${port}`);
});
