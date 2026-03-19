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
const div = document.createElement("div");

const clearDOM = () => main.innerHTML = "";

function renderTasks() {
    main.classList.remove("projects-view");
    main.classList.add("tasks-view");
    
    const mainTitle = p.cloneNode();
    mainTitle.id = "main-title";
    mainTitle.classList.remove("projects-view-title");
    mainTitle.classList.add("tasks-view-title");
    mainTitle.innerText = "Tasks"
    main.append(mainTitle);

    for(let i = 0; i < taskList.length; i++) {
        const task = div.cloneNode();
        task.classList.add("main-task")
        task.dataset.index = i;
        main.append(task);

        const taskCompleted = p.cloneNode();
        taskCompleted.innerText = taskList[i].completed;
        task.append(taskCompleted);

        const taskTitle = p.cloneNode();
        taskTitle.innerText = taskList[i].title;
        task.append(taskTitle);

        const taskDescription = p.cloneNode();
        taskDescription.innerText = taskList[i].description;
        task.append(taskDescription);

        const taskDueDate = p.cloneNode();
        taskDueDate.innerText = taskList[i].dueDate;
        task.append(taskDueDate);

        const taskPriority = p.cloneNode();
        taskPriority.innerText = taskList[i].priority;
        task.append(taskPriority);

        const taskProject = p.cloneNode();
        taskProject.innerText = taskList[i].project;
        task.append(taskProject);
    };
};

function renderProjects() {
    main.classList.remove("tasks-view");
    main.classList.add("projects-view");

    const mainTitle = p.cloneNode();
    mainTitle.id = "main-title";
    mainTitle.classList.remove("tasks-view-title");
    mainTitle.classList.add("projects-view-title");
    mainTitle.innerText = "Projects"
    main.append(mainTitle);

    for(let i = 0; i < projectList.length; i++) {
        const project = div.cloneNode();
        project.classList.add("main-project")
        project.dataset.index = i;
        main.append(project);

        const projectCompleted = p.cloneNode();
        projectCompleted.innerText = projectList[i].completed;
        project.append(projectCompleted);

        const projectTitle = p.cloneNode();
        projectTitle.innerText = projectList[i].title;
        project.append(projectTitle);

        const projectDescription = p.cloneNode();
        projectDescription.innerText = projectList[i].description;
        project.append(projectDescription);

        const projectDueDate = p.cloneNode();
        projectDueDate.innerText = projectList[i].dueDate;
        project.append(projectDueDate);

        const projectPriority = p.cloneNode();
        projectPriority.innerText = projectList[i].priority;
        project.append(projectPriority);
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
    const task = createTask(data);
    addTask(task);
    taskDialogForm.reset();
    renderCurrentPage();
});

projectDialogForm.addEventListener("submit", () => {
    const data = Object.fromEntries(new FormData(projectDialogForm));
    const project = createProject(data);
    addProject(project);
    projectDialogForm.reset();
    renderCurrentPage();
});

// make DOM prettier, get inspo from claude and library project, also maybe adjust main top-padding
// remove sidebar open/close styles