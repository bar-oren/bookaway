const UserModel = require('../../modules/user.model');
const userList = require('../../db/db').usersList;

let err = "";

exports.getError = function() {
    return err;
};

exports.setError = function(error) {
    err = error;
};

exports.hasError = function () {
  return err.length > 0;
};

const basicValidation = function (user) {
    if (user === null) {
        err = "data must be supplied";
    }
    return true;
};

const validateEmail = function(user) {
    let found = false;
    if (!user.email) {
        err = "Email is a mandatory field";
    }
    if (user.email.length === "") {
        err = "Email is a mandatory field";
    }
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].email === user.email) {
            found = true;
        }
    }
    if (found) {
        err = "email already exist";
    }
    return true;
};

const validatePassword = function(user) {
    if (!user) {
        return false;
    }
    let upperFound = false;
    let lowerFound = false;
    let numberFound = false;
    for (let i = 0; i < user.password.length; i++) {
        if (user.password[i] >= 'a' && user.password[i] <= 'z') {
            lowerFound = true;
        } else if (user.password[i] >= 'A' && user.password[i] <= "Z") {
            upperFound = true;
        } else if (user.password[i] >= "0" && user.password[i] < "9") {
            numberFound = true;
        }
    }
    if (upperFound && lowerFound && numberFound) {
        return true;
    } else {
        err = "password must contain at least one upper case letter, one lower case letter and one digit";
    }
};

const isContainRequiredFields = function (user) {
    return user.email && user.firstName && user.lastName && user.password;
};

exports.createValidators = [basicValidation, isContainRequiredFields, validateEmail, validatePassword];
exports.editValidators = [basicValidation, isContainRequiredFields, validatePassword];

exports.isUserValid = function(userModel, validators) {
    let result = true;
    if (userModel !== null) {
        for (let i = 0; i < validators.length; i++) {
            result = result && validators[i](userModel);
        }
    }
    return result;
};