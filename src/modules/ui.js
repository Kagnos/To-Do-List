import { createTask } from "./tasks.js"
import { createProject } from "./projects.js"
import { addTask } from "./to-do-list.js"
import { addProject } from "./to-do-list.js"

const allButtons = document.querySelectorAll("button");

const taskDialog = document.querySelector("#task-dialog");
const taskDialogForm = document.querySelector("#task-dialog-form");
const projectDialog = document.querySelector("#project-dialog");
const projectDialogForm = document.querySelector("#project-dialog-form");

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