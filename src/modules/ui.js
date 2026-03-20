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
const button = document.createElement("button");

const clearDOM = () => main.innerHTML = "";

function renderTasks() {
    main.classList.remove("projects-view");
    main.classList.add("tasks-view");
    
    const mainTitle = p.cloneNode();
    mainTitle.id = "main-title";
    mainTitle.innerText = "Tasks"
    main.append(mainTitle);

    for(let i = 0; i < taskList.length; i++) {
        const task = div.cloneNode();
        task.classList.add("main-task")
        task.dataset.index = i;
        main.append(task);

        const taskGroup1 = div.cloneNode();
        taskGroup1.classList.add("main-item-group-1");
        task.append(taskGroup1);

        const taskTitle = p.cloneNode();
        taskTitle.innerText = taskList[i].title;
        taskGroup1.append(taskTitle);

        const taskCompleted = p.cloneNode();
        taskCompleted.innerText = `Completed: ${taskList[i].completed}`;
        taskGroup1.append(taskCompleted);

        const taskDescription = p.cloneNode();
        taskDescription.classList.add("description");
        taskDescription.innerText = taskList[i].description;
        task.append(taskDescription);

        const taskGroup2 = div.cloneNode();
        taskGroup2.classList.add("main-item-group-2");
        task.append(taskGroup2);

        const taskProject = p.cloneNode();
        taskProject.innerText = `Project: ${taskList[i].project}`;
        taskGroup2.append(taskProject);

        const taskPriority = p.cloneNode();
        taskPriority.innerText = `Priority: ${taskList[i].priority}`;
        taskGroup2.append(taskPriority);
                
        const taskDueDate = p.cloneNode();
        taskDueDate.innerText = taskList[i].dueDate;
        taskGroup2.append(taskDueDate);
    };
};

function renderProjects() {
    main.classList.remove("tasks-view");
    main.classList.add("projects-view");

    const mainTitle = p.cloneNode();
    mainTitle.id = "main-title";
    mainTitle.innerText = "Projects"
    main.append(mainTitle);

    for(let i = 0; i < projectList.length; i++) {
        const project = button.cloneNode();
        project.classList.add("main-project")
        project.dataset.index = i;
        main.append(project);

        const projectGroup1 = div.cloneNode();
        projectGroup1.classList.add("main-item-group-1");
        project.append(projectGroup1);

        const projectTitle = p.cloneNode();
        projectTitle.innerText = projectList[i].title;
        projectGroup1.append(projectTitle);

        const projectCompleted = p.cloneNode();
        projectCompleted.innerText = `Completed: ${projectList[i].completed}`;
        projectGroup1.append(projectCompleted);

        const projectDescription = p.cloneNode();
        projectDescription.classList.add("description");
        projectDescription.innerText = projectList[i].description;
        project.append(projectDescription);

        const projectGroup2 = div.cloneNode();
        projectGroup2.classList.add("main-item-group-2");
        project.append(projectGroup2);

        const projectPriority = p.cloneNode();
        projectPriority.innerText = `Priority: ${projectList[i].priority}`;
        projectGroup2.append(projectPriority);

        const projectDueDate = p.cloneNode();
        projectDueDate.innerText = projectList[i].dueDate;
        projectGroup2.append(projectDueDate);
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

// hook up new task project input to projectList array
// create project view
// reevalutate what needs to be done
// local storage