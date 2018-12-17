const helpers = {};

helpers.verifyUserData = (bodyObj) => {
  const username =
    typeof bodyObj.username == 'string' && bodyObj.username.trim().length > 0
      ? bodyObj.username.trim()
      : false;
  const password =
    typeof bodyObj.password == 'string' && bodyObj.password.trim().length > 0
      ? bodyObj.password.trim()
      : false;
  const email =
    typeof bodyObj.email == 'string' && bodyObj.email.trim().length > 0
      ? bodyObj.email.trim()
      : false;

  if (username && password && email) {
    const newUser = {
      id: helpers.uniqueId(),
      username,
      password,
      email,
    };
    return newUser;
  }
  return false;
};

helpers.uniqueId = () => new Date().valueOf();

helpers.createToken = (username, password) => {
  const tokenObj = {};
  const data = username + password;
  tokenObj.token = new Buffer.from(data).toString('base64');
  return JSON.stringify(tokenObj);
};

module.exports = helpers;
