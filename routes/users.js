const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();


// -- routes -- //
router.get("/:page/:maxPerPage", userController.getUsers);

/* GET users by mail. */
router.get('/:email', userController.getUserByEmail);

/* POST create user */
router.post("/", userController.createUser);

/* PUT edit user */
router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;
