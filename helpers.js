
const helpers = {};

helpers.uniqueId = () => {
    return new Date().valueOf();
};

helpers.verifyUserData = (bodyObj) => {
    
    let username = typeof(bodyObj.username) == 'string' && bodyObj.username.trim().length > 0 ? bodyObj.username.trim() : false;
    let password = typeof(bodyObj.password) == 'string' && bodyObj.password.trim().length > 0 ? bodyObj.password.trim() : false;
    let email = typeof(bodyObj.email) == 'string' && bodyObj.email.trim().length > 0 ? bodyObj.email.trim() : false;    

    if (username && password && email) {
        let newUser = {
            id: helpers.uniqueId(),
            username: username,
            password: password,
            email: email
        };
        return newUser;
    } else {
        return false;
    };

};


helpers.uniqueId = () => {
    return new Date().valueOf();
};

helpers.createToken = (username, password) => {
    let tokenObj = {};
    let data = username + password;
    tokenObj.token = new Buffer.from(data).toString('base64');
    return JSON.stringify(tokenObj);
};

module.exports = helpers;