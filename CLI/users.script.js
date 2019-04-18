#!/usr/bin/env node
const UserModel = require('../modules/user.model');
const axios = require('axios');
const app = require('../app');
const userValidator = require('../bl/validators/user.validator');

const MAX_USERS_PER_PAGE = 2;

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
const stdin = process.openStdin();
const userController = require('../controllers/user.controller');

function ask(question) {
    return new Promise((resolve, reject) => {
        readline.question(question + " ", (input) => resolve(input) );
    });
}
readline.stdoutMuted = false;
readline._writeToOutput = function _writeToOutput(stringToWrite) {
    if (readline.stdoutMuted)
        readline.output.write("*");
    else
        readline.output.write(stringToWrite);
};

const menu = "\n=== Actions: ===\n" +
    "1: Get user by email\n" +
    "2: Get all users\n" +
    "3: Create user\n" +
    "4: Update user\n" +
    "5: Delete user by email\n\n";
const paginationKeys = ['n', 'p', 'exit'];
const paginationMenu =
    "-- For next page press " + paginationKeys[0] + "\n" +
    "-- For previous page press " + paginationKeys[1] + "\n" +
    "Return to menu: " + paginationKeys[2] + "\n\n";

const url = "http://localhost:3000/users/";

let email, id, firstName, lastName, password, dateOfBirth, page = 0;
const main = function () {
    app.listen(3000);
    let response;
    console.log(menu);
    readline.on(('line'), async input => {
        if (input === "1") {
            readline.question("\nEnter Email: ", async (email) => {
                let res = await axios.get(url + email);
                console.log(res.data);
                console.log(menu);
            });
        } else if (input === "2") {
            response = await axios.get(url + ++page + "/" + MAX_USERS_PER_PAGE);
            console.log(response.data);
            console.log(paginationMenu);
        } else if (input === paginationKeys[0]) {
            if (page >= response.total_pages) {
                console.log("\nERROR: this is the last page\n");
            } else {
                response = await axios.get(url + (++page) + "/" + MAX_USERS_PER_PAGE);
                console.log(response.data);
            }
            console.log(paginationMenu);
        } else if (input === paginationKeys[1]) {
            if (page <= 0) {
                console.log("\nERROR: this is the first page\n");
            } else {
                response = await axios.get(url + (--page)+ "/" + MAX_USERS_PER_PAGE);
                console.log(response.data);
            }
            console.log(paginationMenu);
        } else if (input === paginationKeys[2]) {
            page = 0;
            console.log(menu);
        } else if (input === "3") { // create
            id = await ask("Enter id: ");
            email = await ask("Enter email: ");
            password = await ask("Enter password: ");
            firstName = await ask("Enter first name: ");
            lastName = await ask("Enter last name");
            dateOfBirth = await ask("Enter date of birth: ");
            let userModel = new UserModel(id, email, password, firstName, lastName, dateOfBirth);
            response = await axios.post(url, userModel);
            console.log(response.data);
            console.log(menu);
        } else if (input === "4") { // update
            id = await ask("Enter id: ");
            email = await ask("Enter email: ");
            password = await ask("Enter password: ");
            firstName = await ask("Enter first name: ");
            lastName = await ask("Enter last name");
            dateOfBirth = await ask("Enter date of birth: ");
            let userModel = new UserModel(id, email, password, firstName, lastName, dateOfBirth);
            response = await axios.put(url + "/" + id, userModel);
            console.log(response.data);
            console.log(menu);
        } else if (input === "5") {
            id = await ask("Enter id: ");
            response = await axios.delete(url + id);
            console.log(response.data);
            console.log(menu);
        }
    });
};
main();