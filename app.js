const { prompt } = require("inquirer");
const inquirer = require("inquirer");
// const fs = require("fs");
// const generatePage = require("./src/page-template.js");

// const [name, gitHub] = profileDataArgs;


// fs.writeFile("./index.html", generatePage(name, gitHub), err => {
//     if (err) throw err;
//     console.log('Portfolio complete! Check out index.html to see the output!');
// })

const promptUser = () => {
    return inquirer
    .prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter your name!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "github",
            message:"Please enter your GitHub Username:",
            validate: gitHubInput => {
                if (gitHubInput) {
                    return true;
                } else {
                    console.log("Please provide your GitHub Username!");
                    return false;
                }
            }
        },
        {
            type:"confirm",
            name:"aboutConfirm",
            message:"Do you wish to include an about section in your portfolio?",
            default:"true"
        },
        {
            type: "input",
            name:"about",
            message:"Provide some information about yourself:",
            when: ({aboutConfirm}) => {
                if (aboutConfirm) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ])
};

const promptProject = portfolioData => {
    if (!portfolioData.projects) {
        portfolioData.projects = [];
      }
    console.log(`
    =================
    ADD A NEW PROJECT
    =================
    `);
    return inquirer.prompt([
        {
            type:"input",
            name: "name",
            message: "What is the name of your project?",
            validate: projectInput => {
                if (projectInput) {
                    return true;
                } else {
                    console.log("Please enter your Project name!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "description",
            message:"Provide a description of the project (Required)",
            validate: projectDescInput => {
                if (projectDescInput) {
                    return true;
                } else {
                    console.log("Please provide information regarding your project!");
                    return false;
                }
            }
        },
        {
            type: "checkbox",
            name:"languages",
            message:"What did you build this project with? (Check all that apply)",
            choices: ["JavaScript", "HMTL","CSS","ES6","jQuery","Bootstrap", "Node"]
        },
        {
            type:"input",
            name:"link",
            message:"Enter the GitHub link to your project (Required)",
            validate: gitLinkInput => {
                if (gitLinkInput) {
                    return true;
                } else {
                    console.log("Please provide your projects GitHub link!");
                    return false;
                }
            }
        },
        {
            type: "confirm",
            name:"feature",
            message: "Would you like to feature this project?",
            default:"false"
        },
        {
            type:"confirm",
            name:"confirmAddProject",
            message:"Would you like to enter another project?",
            default:"false"
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if(projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    });
};
promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
  });