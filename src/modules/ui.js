import { createTask } from "./tasks.js"
import { createProject } from "./projects.js"
import { addTask, addProject, taskList, projectList, currentPage, updateCurrentPage } from "./state.js"

const allButtons = document.querySelectorAll("button");

const taskDialog = document.querySelector("#task-dialog");
const taskDialogForm = document.querySelector("#task-dialog-form");
const projectDialog = document.querySelector("#project-dialog");
const projectDialogForm = document.querySelector("#project-dialog-form");

const main = document.querySelector("#main");
const p = document.createElement("p");

const clearDOM = () => main.innerHTML = "";

function renderTasks() {
    const mainTitle = p.cloneNode();
    mainTitle.id = "main-title";
    mainTitle.innerText = "Tasks"
    main.append(mainTitle);

    for(let i = 0; i < taskList.length; i++) {
        const task = p.cloneNode();
        task.dataset.index = i;
        task.innerText = `${taskList[i].title} ${taskList[i].description} Due by: ${taskList[i].dueDate} Priority: ${taskList[i].priority} Completed: ${taskList[i].completed} Project: ${taskList[i].project}`;
        main.append(task);
    };
};

function renderProjects() {
    const mainTitle = p.cloneNode();
    mainTitle.id = "main-title";
    mainTitle.innerText = "Projects"
    main.append(mainTitle);

    for(let i = 0; i < projectList.length; i++) {
        const project = p.cloneNode();
        project.dataset.index = i;
        project.innerText = `${projectList[i].title} ${projectList[i].description} Due by: ${projectList[i].dueDate} Priority: ${projectList[i].priority} Completed: ${projectList[i].completed}`;
        main.append(project);
    };
};

function renderCurrentPage() {
    if (currentPage === "tasks") {
        clearDOM();
        renderTasks();
    } else if (currentPage === "projects") {
        clearDOM();
        renderProjects();
    } else return;
};

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
                updateCurrentPage("tasks");
                clearDOM();
                return renderTasks();
            case "view-projects-sidebar-button":
                updateCurrentPage("projects");
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
    renderCurrentPage();
});

projectDialogForm.addEventListener("submit", () => {
    const data = Object.fromEntries(new FormData(projectDialogForm));
    console.log(data);
    const project = createProject(data);
    addProject(project);
    projectDialogForm.reset();
    renderCurrentPage();
});

// make DOM prettier, get inspo from claude and library project, also maybe adjust main top-padding
// completed? past tense idk kinda iffy.