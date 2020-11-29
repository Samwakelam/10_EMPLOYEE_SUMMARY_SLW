const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const validator = require("email-validator");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const htmlRender = require("./lib/htmlRenderer"); 

let employeeList = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const newEmployee = () => {

    inquirer
        .prompt([
            {
                type:"list", 
                name:"newEmployee", 
                message: "Do you want to add a new employee?", 
                choices: ["Yes please", "Exit", "Clear existing"]
            },
            {
                type:"confirm", 
                name:"answer", 
                message: "Are you sure?", 
                when: (answer) => answer.newEmployee === "Clear existing"
            },
        ])
        .then((choice) => {
            console.log("choice =", choice);
            if (choice.newEmployee === "Exit") {
                console.log("You have chosen to exit the application");
                console.log("employeeList =", employeeList);
                fs.writeFileSync(outputPath, htmlRender(employeeList), "utf8");
                return;
            } else if (choice.newEmployee === "Yes please"){
                employeeSetup();
            } else if (choice.newEmployee === "Clear existing" && choice.answer === true){
                console.log("You have chosen to clear the existing list");
                clearEmployees();
                return;
            } if (choice.newEmployee === "Clear existing" && choice.answer === false){
                console.log("You have chosen NOT to clear the existing list");
                newEmployee();
                return;
            }
        })
        .catch((error) => {
            console.log("error =", error);
            console.log("woops, something went wrong");
        })
}

const clearEmployees = () => {
    employeeList = [];
    console.log("Employee List cleared.");
    console.log("employeeList =", employeeList);
    newEmployee();
}

const employeeSetup = () => {

    inquirer
        .prompt([
            {
                type:"list", 
                name:"role", 
                message: "What is the employee's jobe role", 
                choices: ["Manager", "Engineer", "Intern"]
            },
            {
                type:"input", 
                name:"name", 
                message: "What is the employee's Name?", 
            },
            {
                type:"input", 
                name:"id", 
                message: "What is the employee's Id number?", 
                validate: function(value) {
                    console.log("value =", value);
                    // let valid = !isNaN(parseInt(value));
                    if (parseInt(value)) {
                        return true;
                    }
                    return 'Please enter a valid number';
                },
                // filter: Number,
            },
            {
                type:"input", 
                name:"email", 
                message: "What is the employee's email?", 
                validate: function(value) {
                    let pass = validator.validate(value);
                    if (pass) {
                        return true;
                    }
                    return 'Please enter a valid email';
                }
            },
            {
                type:"input", 
                name:"officeNumber", 
                message: "What is the Managers Office Extension?",
                when: (answer) => answer.role === "Manager"
            },
            {
                type:"input", 
                name:"gitHub", 
                message: "What is the Engineer's github profile?",
                when: (answer) => answer.role === "Engineer"
            },
            {
                type:"input", 
                name:"school", 
                message: "What is the Intern's school?",
                when: (answer) => answer.role === "Intern"
            },
        ])
        .then((answers) => {
            console.log("answers =", answers);
            const {role, name, id, email, officeNumber, gitHub, school} = answers;
            switch(answers.role){
                case "Manager":
                    const manager = new Manager(name, id, email, officeNumber);
                    // manager.getRole(role);
                    // manager.getName(name);
                    // manager.getId(id);
                    // manager.getEmail(email);
                    console.log("manager =", manager); 
                    employeeList.push(manager);
                    console.log("employeeList =", employeeList);
                    newEmployee();
                  break;
                case "Engineer":
                    const engineer = new Engineer(name, id, email, gitHub);
                    // engineer.getRole(role);
                    // engineer.getName(name);
                    // engineer.getId(id);
                    // engineer.getEmail(email);
                    // engineer.getGithub(gitHub);
                    console.log("engineer =", engineer); 
                    employeeList.push(engineer);
                    console.log("employeeList =", employeeList);
                    newEmployee();
                  break;
                case "Intern":
                    const intern = new Intern(name, id, email, school);
                    // intern.getRole(role);
                    // intern.getName(name);
                    // intern.getId(id);
                    // intern.getEmail(email);
                    // intern.getSchool(school);
                    console.log("intern =", intern); 
                    employeeList.push(intern);
                    console.log("employeeList =", employeeList);
                    newEmployee();
                  break;
            }
            
        })
        .catch((error) => {
            console.log("error =", error);
            console.log("woops, something went wrong");
        })
}

newEmployee();



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
