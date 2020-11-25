const Employee = require('./Employee');

class Manager extends Employee {
    constructor(officeNumber){
        let name;
        let id;
        let email;
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    getRole(){
        // overridden to return manager
    }
}

module.exports = Manager;

