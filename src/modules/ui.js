import { createTask } from "./tasks.js"
import { createProject } from "./projects.js"
import { addTask } from "./state.js"
import { addProject } from "./state.js"

const allButtons = document.querySelectorAll("button");

const taskDialog = document.querySelector("#task-dialog");
const taskDialogForm = document.querySelector("#task-dialog-form");
const projectDialog = document.querySelector("#project-dialog");
const projectDialogForm = document.querySelector("#project-dialog-form");

const main = document.querySelector("#main");
const p = document.createElement("p");

const clearDOM = () => main.innerHTML = "";

function renderTasks() {
    const mainTitle = p;
    mainTitle.id = "main-title";
    mainTitle.innerText = "Tasks"
    main.append(mainTitle);
};

function renderProjects() {
    const mainTitle = p;
    mainTitle.id = "main-title";
    mainTitle.innerText = "Projects"
    main.append(mainTitle);
}

allButtons.forEach(button => {
    button.addEventListener("click", () => {
        switch(button.id) {
            case "new-task-sidebar-button":
                return taskDialog.showModal();
            case "task-dialog-cancel-button":
                taskDialogForm.reset();
                return taskDialog.close();
            case "new-project-sidebar-button":
                return projectDialog.showModal();
            case "project-dialog-cancel-button":
                projectDialogForm.reset();
                return projectDialog.close();
            case "view-tasks-sidebar-button":
                clearDOM();
                return renderTasks();
            case "view-projects-sidebar-button":
                clearDOM();
                return renderProjects();
        };
    });
});

taskDialogForm.addEventListener("submit", () => {
    const data = Object.fromEntries(new FormData(taskDialogForm));
    console.log(data);
    const task = createTask(data);
    addTask(task);
    taskDialogForm.reset();
});

projectDialogForm.addEventListener("submit", () => {
    const data = Object.fromEntries(new FormData(projectDialogForm));
    console.log(data);
    const project = createProject(data);
    addProject(project);
    projectDialogForm.reset();
});