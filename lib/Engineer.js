const Employee = require('./Employee');

class Engineer extends Employee {
    constructor(github){
        let name;
        let id;
        let email;
        super(name, id, email);
        this.github = github;
    }

    getRole(){
        // overridden to return "Engineer"
    }

    getGithub(){

    }
}

module.exports = Engineer;

