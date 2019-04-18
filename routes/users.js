const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();
const userValidator = require('../bl/validators/user.validator');


// -- routes -- //
router.get("/:page/:maxPerPage", function (req, res) {
  res.send(userController.getUsers(req.params.page, req.params.maxPerPage));
});

/* GET users listing. */
router.get('/:email', function(req, res) {
  res.send(userController.getUserByEmail(userController.createUserModelByWithEmail(req.params.email)));
});

/* POST create user */
router.post("/", function (req, res) {
  const user = userController.createUserModelFromObject(req.body);
  if (userController.createUser(user)) {
    res.send("\n" + "User created!");
  } else {
    res.send("\n" + userValidator.getError());
  }
});

/* PUT edit user */
router.put("/:id", function (req, res) {
  let user = userController.createUserModelFromObject(req.body);
  user.id = Number(req.params.id);
  userController.updateUser(user);
  if (userValidator.hasError()) {
    res.send("\n" + userValidator.getError());
  } else {
    res.send("\n" + user.name() + " was updated!");
  }
});

router.delete("/", function (req, res) {
  const user = userController.createUserModelFromObject(req.body);
  userController.deleteUser(user);
});

module.exports = router;
