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

const createUserModelFromObject = function(body) {
    return new UserModel(body.id, body.email, body.password, body.firstName, body.lastName, body.dateOfBirth);
};

const createUserModelByWithEmail = function(email) {
  return new UserModel(email.toString(), null, null, null, null);
};

// CRUD methods
exports.getUsers = function(req, res) {
    let page = req.params.page;
    let maxPerPage = req.params.maxPerPage;
    let offset = (page - 1) * maxPerPage,
    data = userList.slice(offset).slice(0, maxPerPage),
    totalPages = Math.ceil(userList.length / maxPerPage);

    const header = "----- Users (" + page + "/" + totalPages + ") -----\n";
    let content = "";
    let users = data;
    for (let i = 0; i < users.length; i++) {
        content += createUserModelFromObject(users[i]).toString() + "\n";
    }

    res.send(header + content);
};

exports.getUserByEmail = function (req, res) {
    const user = createUserModelByWithEmail(req.params.email);
    for (let i = 0; i < userList.length; i++) {
        if (user.email === userList[i].email) {
            res.send(JSON.stringify(userList[i]));
        }
    }
    res.send("user not found!");
};

exports.createUser = function(req, res) {
    const user = createUserModelFromObject(req.body);
    if (userValidator.isUserValid(user, createValidators)) {
        userList.push(user);
        res.send("User was created!");
    } else {
        res.send(userValidator.getError());
    }
};

exports.updateUser = function(req, res) {
    let user = createUserModelFromObject(req.body);
    user.id = Number(req.params.id);
    if (userValidator.isUserValid(user, editValidators)) {
        let i = getUserIndexById(user);
        if (i != null) {
           userList[i] = user;
           res.send("User was updated!")
        } else {
            res.send("User does not exist");
        }
    }
};

exports.deleteUser = function (req, res) {
    let user = createUserModelFromObject(req.body);
    user.id = Number(req.params.id);
    let i = getUserIndexById(user);
    if (i != null) {
        userList.splice(i, 1);
        res.send("User was deleted!");
    } else {
        res.send("User does not exist");
    }
};


