const uniqid = require('uniqid');

class User {
    constructor(id, email, password, firstName, lastName, dateOfBirth) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
    }
    name() {
        return this.firstName + " " + this.lastName;
    }
    toString() {
        let result = "ID: " + this.id + "\nName: " + this.name() + "\n" +
            "Email: " + this.email + "\n";
        if (this.dateOfBirth) {
            result += "dataOfBirth: " + this.dateOfBirth;
        }
        return result + "\n\n";
    }
}

module.exports = User;


