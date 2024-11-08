const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');

function loginPage(req, res) {
  res.render('login', { title: 'Login' });
}

function loginUser(req, res) {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersFilePath));

  if (username === users.username && password === users.password) {
    req.session.loggedIn = true;
    req.session.user = { username: 'admin' };;
    res.redirect('/medicines'); 
  } else {
    res.status(401).render('login', { title: 'Login', error: 'Niepoprawne dane logowania' });
  }
}

function logoutUser(req, res) {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/medicines');
    }
    res.redirect('/medicines');
  });
}

module.exports = { loginPage, loginUser, logoutUser };
