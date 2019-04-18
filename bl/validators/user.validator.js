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
        return false;
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
        return false;
    }
    return true;
};

const isIdExist = function (user) {
    let found = false;
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].id === user.id) {
            found = true;
        }
    }
    if (found) {
        err = "id already exist";
        return false;
    }
    return true;
}

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
        return false;
    }
};

const isContainRequiredFields = function (user) {
    if  (user.id && user.email && user.firstName && user.lastName && user.password) {
        return true;
    } else {
        err = "Missing a required field";
        return false;
    }
};

exports.createValidators = [isIdExist, basicValidation, validateEmail, validatePassword, isContainRequiredFields];
exports.editValidators = [basicValidation, validateEmail, validatePassword, isContainRequiredFields];

exports.isUserValid = function(userModel, validators) {
    let result = true;
    if (userModel !== null) {
        for (let i = 0; i < validators.length; i++) {
            result = result && validators[i](userModel);
        }
    }
    return result;
};