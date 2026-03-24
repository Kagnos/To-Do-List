import { createTask } from "./tasks.js"
import { createProject } from "./projects.js"
import { addTask, addProject, taskList, projectList, currentPage, updateCurrentPage } from "./state.js"

const allButtons = document.querySelectorAll("button");

const newTaskDialog = document.querySelector("#new-task-dialog");
const newTaskDialogForm = document.querySelector("#new-task-dialog-form");
const newProjectDialog = document.querySelector("#new-project-dialog");
const newProjectDialogForm = document.querySelector("#new-project-dialog-form");

const main = document.querySelector("#main");
const p = document.createElement("p");
const div = document.createElement("div");
const button = document.createElement("button");
const taskProjectSelect = document.querySelector("#task-project");

const clearMainDOM = () => main.innerHTML = "";

const clearNewTaskDialogDOM = () => taskProjectSelect.innerHTML = "";

function renderTasks() {
    main.classList.remove("projects-view");
    main.classList.add("tasks-view");
    
    const mainTitle = p.cloneNode();
    mainTitle.id = "main-title";
    mainTitle.innerText = "Tasks";
    main.append(mainTitle);

    for(let i = 0; i < taskList.length; i++) {
        const task = div.cloneNode();
        task.classList.add("main-task")
        task.dataset.index = i;
        main.append(task);

        const taskGroup1 = div.cloneNode();
        taskGroup1.classList.add("main-item-group");
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
        taskGroup2.classList.add("main-item-group");
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
    mainTitle.innerText = "Projects";
    main.append(mainTitle);

    for(let i = 0; i < projectList.length; i++) {
        const project = button.cloneNode();
        project.classList.add("main-project")
        project.dataset.index = i;
        main.append(project);

        const projectGroup1 = div.cloneNode();
        projectGroup1.classList.add("main-item-group");
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
        projectGroup2.classList.add("main-item-group");
        project.append(projectGroup2);

        const projectPriority = p.cloneNode();
        projectPriority.innerText = `Priority: ${projectList[i].priority}`;
        projectGroup2.append(projectPriority);

        const projectDueDate = p.cloneNode();
        projectDueDate.innerText = projectList[i].dueDate;
        projectGroup2.append(projectDueDate);

        project.addEventListener("click", () => {
            updateCurrentPage(projectList[i].title);
            clearMainDOM();
            renderProject(project.dataset.index);
        });
    };
};

function renderProject(index) {
    main.classList.remove("projects-view");
    main.classList.add("tasks-view");

    const mainTitle = p.cloneNode();
    mainTitle.id = "main-title";
    mainTitle.innerText = projectList[index].title;
    main.append(mainTitle);

    const projectGroup1 = div.cloneNode();
    projectGroup1.classList.add("main-item-group");
    main.append(projectGroup1);

    const priority = p.cloneNode();
    priority.innerText = `Priority: ${projectList[index].priority}`;
    projectGroup1.append(priority);

    const dueDate = p.cloneNode();
    dueDate.innerText = projectList[index].dueDate;
    projectGroup1.append(dueDate);
    
    const completed = p.cloneNode();
    completed.innerText = `Completed: ${projectList[index].completed}`;
    projectGroup1.append(completed);

    const description = p.cloneNode();
    description.classList.add("description");
    description.innerText = projectList[index].description;
    main.append(description);

    for(let i = 0; i < taskList.length; i++) {
        if (currentPage === taskList[i].project) {
            const task = div.cloneNode();
            task.classList.add("main-task")
            task.dataset.index = i;
            main.append(task);

            const taskGroup1 = div.cloneNode();
            taskGroup1.classList.add("main-item-group");
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
            taskGroup2.classList.add("main-item-group");
            task.append(taskGroup2);

            const taskPriority = p.cloneNode();
            taskPriority.innerText = `Priority: ${taskList[i].priority}`;
            taskGroup2.append(taskPriority);
                    
            const taskDueDate = p.cloneNode();
            taskDueDate.innerText = taskList[i].dueDate;
            taskGroup2.append(taskDueDate);
        };
    };
};

function renderCurrentPage() {
    switch (currentPage) {
        case "tasks":
            clearMainDOM();
            return renderTasks();
        case "projects":
            clearMainDOM();
            return renderProjects();
    };
};

function renderNewTaskProjectOptions() {
    const option = document.createElement("option");

    const noneOption = option.cloneNode();
    noneOption.setAttribute("value", "None");
    noneOption.setAttribute("selected", "");
    noneOption.innerText = "None";
    taskProjectSelect.append(noneOption);

    for(let i = 0; i < projectList.length; i++) {
        const projectOption = option.cloneNode();
        projectOption.setAttribute("value", projectList[i].title);
        projectOption.innerText = projectList[i].title;
        taskProjectSelect.append(projectOption);
    };
};

allButtons.forEach(button => {
    button.addEventListener("click", () => {
        switch(button.id) {
            case "new-task-sidebar-button":
                clearNewTaskDialogDOM();
                renderNewTaskProjectOptions();
                return newTaskDialog.showModal();
            case "new-task-dialog-cancel-button":
                newTaskDialogForm.reset();
                return newTaskDialog.close();
            case "new-project-sidebar-button":
                return newProjectDialog.showModal();
            case "new-project-dialog-cancel-button":
                newProjectDialogForm.reset();
                return newProjectDialog.close();
            case "view-tasks-sidebar-button":
                updateCurrentPage("tasks");
                clearMainDOM();
                return renderTasks();
            case "view-projects-sidebar-button":
                updateCurrentPage("projects");
                clearMainDOM();
                return renderProjects();
        };
    });
});

newTaskDialogForm.addEventListener("submit", () => {
    const data = Object.fromEntries(new FormData(newTaskDialogForm));
    const task = createTask(data);
    addTask(task);
    newTaskDialogForm.reset();
    renderCurrentPage();
});

newProjectDialogForm.addEventListener("submit", () => {
    const data = Object.fromEntries(new FormData(newProjectDialogForm));
    const project = createProject(data);
    addProject(project);
    newProjectDialogForm.reset();
    renderCurrentPage();
});


// create detailed task view similar to project view
// rename tasks and projects to allTasks and allProjects

// create project view
// reevalutate what needs to be done
// checkbox, edit svg, delete svg
// projects and tasks view description limits with ... maybe can click to expand?
// local storage