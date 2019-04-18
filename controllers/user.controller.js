const UserModel = require('../modules/user.model');
const userValidator = require('../bl/validators/user.validator');
const db = require('../db/db.js');

const userList = db.usersList;
const editValidators = userValidator.editValidators;
const createValidators = userValidator.createValidators;

//private

const getUserIndexById = function(user) {
    for (let i = 0; i < userList.length; i++) {
        if (user.id === userList[i].id) {
            return i;
        }
    }
    userValidator.setError("user not found!");
};

const createUserModelFromObject = exports.createUserModelFromObject = function(body) {
    return new UserModel(body.email, body.password, body.firstName, body.lastName, body.dateOfBirth);
};

exports.createUserModelByWithEmail = function(email) {
  return new UserModel(email.toString(), null, null, null, null);
};

// CRUD methods
exports.getUsers = function(page, maxPerPage) {
    let offset = (page - 1) * maxPerPage,
    data = userList.slice(offset).slice(0, maxPerPage),
    totalPages = Math.ceil(userList.length / maxPerPage);
    return {
        page: page,
        per_page: maxPerPage,
        pre_page: data.length,
        total: userList.length,
        total_pages: totalPages,
        data: data
    };
};

exports.getUserByEmail = function (user) {
    for (let i = 0; i < userList.length; i++) {
        if (user.email === userList[i].email) {
            return userList[i];
        }
    }
    return "user not found!";
};

exports.createUser = function(user) {
    if (userValidator.isUserValid(user, createValidators)) {
        userList.push(user);
        return true;
    }
};

exports.updateUser = function(user) {
    if (userValidator.isUserValid(user, editValidators)) {
        let i = getUserIndexById(user);
        if (i != null) {
           userList[i] = user;
        } else {
            userValidator.setError("User does not exist");
        }
    }
};

exports.deleteUser = function (user) {
    if (user !== null) {
        let i = getUserIndexById(user);
        if (i != null) {
            userList.splice(i, 1);
            return true;
        } else {
            userValidator.setError("User does not exist");
        }
    }
};


