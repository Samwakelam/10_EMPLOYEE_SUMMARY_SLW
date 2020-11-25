const Employee = require('./Employee');

class Intern extends Employee {
    constructor(school){
        let name;
        let id;
        let email;
        super(name, id, email);
        this.school = school;
    }

    getRole(){
        // overridden to return "Intern"
    }

    getSchool(){

    }
}

module.exports = Intern;