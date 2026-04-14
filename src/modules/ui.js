import { createTask } from "./tasks.js"
import { createProject } from "./projects.js"
import { taskList, projectList, addTask, addProject, deleteTask, deleteProject, toggleCompleted, toggleDescription, editTask, editProject } from "./state.js"
import { taskListDeserialized, projectListDeserialized, updateTaskListStorage, updateProjectListStorage, updateCurrentPageStorage, updateCurrentIndexStorage } from "./storage.js";
import { formatDistanceToNow } from "date-fns";

const allButtons = document.querySelectorAll("button");

const newTaskDialog = document.querySelector("#new-task-dialog");
const newTaskDialogForm = document.querySelector("#new-task-dialog-form");
const newTaskProjectSelect = document.querySelector("#new-task-project");
const newProjectDialog = document.querySelector("#new-project-dialog");
const newProjectDialogForm = document.querySelector("#new-project-dialog-form");
const editTaskDialog = document.querySelector("#edit-task-dialog");
const editTaskDialogForm = document.querySelector("#edit-task-dialog-form");
const editTaskProjectSelect = document.querySelector("#edit-task-project");
const editProjectDialog = document.querySelector("#edit-project-dialog");
const editProjectDialogForm = document.querySelector("#edit-project-dialog-form");
const deleteTaskDialog = document.querySelector("#delete-task-dialog");
const deleteTaskDialogForm = document.querySelector("#delete-task-dialog-form");
const deleteProjectDialog = document.querySelector("#delete-project-dialog");
const deleteProjectDialogForm = document.querySelector("#delete-project-dialog-form");

const main = document.querySelector("#main");
const p = document.createElement("p");
const div = document.createElement("div");
const button = document.createElement("button");

const clearDOM = (element) => element.innerHTML = "";

function renderTasks() {
    main.classList.remove("grid-view");
    main.classList.add("list-view");
    
    const mainTitle = p.cloneNode();
    mainTitle.id = "main-title";
    mainTitle.innerText = "Tasks";
    main.append(mainTitle);
    for(let i = 0; i < taskListDeserialized().length; i++) {
        const task = div.cloneNode();
        task.classList.add("main-task");
        if (taskListDeserialized()[i].completed === true) task.classList.add("completed");
        main.append(task);

        const group1 = div.cloneNode();
        group1.classList.add("main-item-group");
        task.append(group1);

        const title = p.cloneNode();
        title.innerText = taskListDeserialized()[i].title;
        group1.append(title);

        const buttonGroup = div.cloneNode();
        buttonGroup.classList.add("main-item-group");
        group1.append(buttonGroup);

        const checkboxButton = button.cloneNode();
        checkboxButton.classList.add("main-button");
        checkCompleted(checkboxButton, taskListDeserialized(), i);
        buttonGroup.append(checkboxButton);

        const editButton = button.cloneNode();
        editButton.classList.add("main-button");
        editButton.setAttribute("aria-label", "Edit task");
        editButton.innerHTML = "<svg class='main-svg' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' fill='#c2c0b6' stroke='#c2c0b6'><g id='SVGRepo_bgCarrier' stroke-width='0'></g><g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g><g id='SVGRepo_iconCarrier'> <title></title> <g id='Complete'> <g id='edit'> <g> <path d='M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8' fill='none' stroke='#c2c0b6' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'></path> <polygon fill='none' points='12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8' stroke='#c2c0b6' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'></polygon> </g> </g> </g> </g></svg>"
        buttonGroup.append(editButton);

        const deleteButton = button.cloneNode();
        deleteButton.classList.add("main-button");
        deleteButton.setAttribute("aria-label", "Delete task");
        deleteButton.innerHTML = "<svg class='main-svg' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><g id='SVGRepo_bgCarrier' stroke-width='0'></g><g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g><g id='SVGRepo_iconCarrier'> <path d='M4 7H20' stroke='#c2c0b6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path> <path d='M6 10L7.70141 19.3578C7.87432 20.3088 8.70258 21 9.66915 21H14.3308C15.2974 21 16.1257 20.3087 16.2986 19.3578L18 10' stroke='#c2c0b6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path> <path d='M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z' stroke='#c2c0b6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path> </g></svg>";
        buttonGroup.append(deleteButton);

        let description = p.cloneNode();
        if (taskListDeserialized()[i].description.length > 100) {
            description = button.cloneNode();
            description.classList.add("description");
            taskListDeserialized()[i].shortDescription ?
            description.innerText = `${taskListDeserialized()[i].description.substring(0, 100)}...` :
            description.innerText = taskListDeserialized()[i].description;
        } else if (taskListDeserialized()[i].description.length > 0) {
            description.classList.add("description");
            description.innerText = taskListDeserialized()[i].description;
        };
        task.append(description);

        const group2 = div.cloneNode();
        group2.classList.add("main-item-group");
        task.append(group2);

        const project = p.cloneNode();
        if (typeof taskListDeserialized()[i].project === "number") project.innerText = `Project: ${projectListDeserialized()[taskListDeserialized()[i].project].title}`;
        else project.innerText = `Project: ${taskListDeserialized()[i].project}`;
        group2.append(project);

        const priority = p.cloneNode();
        priority.innerText = `Priority: ${taskListDeserialized()[i].priority}`;
        group2.append(priority);
                    
        const dueDate = p.cloneNode();
        dueDate.innerText = `Due ${taskListDeserialized()[i].dueDate ? formatDistanceToNow(new Date(taskListDeserialized()[i].dueDate), { addSuffix: true }) : '—'}`;
        group2.append(dueDate);

        checkboxButton.addEventListener("click", () => {
            toggleCompleted(taskList, i);
            updateTaskListStorage();
            clearDOM(main);
            renderCurrentPage();
        });

        editButton.addEventListener("click", () => {
            updateCurrentIndexStorage(i);
            clearDOM(editTaskProjectSelect);
            renderEditDialogForm(taskList, i);
            editTaskDialog.showModal();
        });
            
        deleteButton.addEventListener("click", () => {
            updateCurrentIndexStorage(i);
            deleteTaskDialog.showModal();
        });

        description.addEventListener("click", () => {
            toggleDescription(taskList, i);
            updateTaskListStorage();
            clearDOM(main);
            renderCurrentPage();
        });
    };
};

function renderProjects() {
    main.classList.remove("list-view");
    main.classList.add("grid-view");

    const mainTitle = p.cloneNode();
    mainTitle.id = "main-title";
    mainTitle.innerText = "Projects";
    main.append(mainTitle);

    for(let i = 0; i < projectListDeserialized().length; i++) {
        const project = button.cloneNode();
        project.classList.add("main-project");
        if (projectListDeserialized()[i].completed === true) project.classList.add("completed");
        main.append(project);

        const group1 = div.cloneNode();
        group1.classList.add("main-item-group");
        project.append(group1);

        const title = p.cloneNode();
        title.innerText = projectListDeserialized()[i].title;
        group1.append(title);

        const description = p.cloneNode();
        description.classList.add("description");
        description.innerText = projectListDeserialized()[i].description;
        project.append(description);

        const group2 = div.cloneNode();
        group2.classList.add("main-item-group");
        project.append(group2);

        const priority = p.cloneNode();
        priority.innerText = `Priority: ${projectListDeserialized()[i].priority}`;
        group2.append(priority);

        const dueDate = p.cloneNode();
        dueDate.innerText = `Due ${projectListDeserialized()[i].dueDate ? formatDistanceToNow(new Date(projectListDeserialized()[i].dueDate), { addSuffix: true }) : '—'}`;
        group2.append(dueDate);

        project.addEventListener("click", () => {
            updateCurrentPageStorage(i);
            clearDOM(main);
            renderCurrentPage();
        });
    };
};

function renderProject(index) {
    main.classList.remove("grid-view");
    main.classList.add("list-view");

    const mainTitle = p.cloneNode();
    mainTitle.id = "main-title";
    mainTitle.innerText = projectListDeserialized()[index].title;
    main.append(mainTitle);

    const group1 = div.cloneNode();
    group1.classList.add("main-item-group");
    main.append(group1);

    const priority = p.cloneNode();
    priority.innerText = `Priority: ${projectListDeserialized()[index].priority}`;
    group1.append(priority);

    const dueDate = p.cloneNode();
    dueDate.innerText = `Due ${projectListDeserialized()[index].dueDate ? formatDistanceToNow(new Date(projectListDeserialized()[index].dueDate), { addSuffix: true }) : '—'}`;
    group1.append(dueDate);
    
    const buttonGroup = div.cloneNode();
    buttonGroup.classList.add("main-item-group");
    group1.append(buttonGroup);

    const checkboxButton = button.cloneNode();
    checkboxButton.classList.add("main-button");
    checkCompleted(checkboxButton, projectListDeserialized(), index);
    buttonGroup.append(checkboxButton);

    const editButton = button.cloneNode();
    editButton.classList.add("main-button");
    editButton.setAttribute("aria-label", "Edit task");
    editButton.innerHTML = "<svg class='main-svg' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' fill='#c2c0b6' stroke='#c2c0b6'><g id='SVGRepo_bgCarrier' stroke-width='0'></g><g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g><g id='SVGRepo_iconCarrier'> <title></title> <g id='Complete'> <g id='edit'> <g> <path d='M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8' fill='none' stroke='#c2c0b6' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'></path> <polygon fill='none' points='12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8' stroke='#c2c0b6' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'></polygon> </g> </g> </g> </g></svg>"
    buttonGroup.append(editButton);

    const deleteButton = button.cloneNode();
    deleteButton.classList.add("main-button");
    deleteButton.setAttribute("aria-label", "Delete task");
    deleteButton.innerHTML = "<svg class='main-svg' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><g id='SVGRepo_bgCarrier' stroke-width='0'></g><g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g><g id='SVGRepo_iconCarrier'> <path d='M4 7H20' stroke='#c2c0b6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path> <path d='M6 10L7.70141 19.3578C7.87432 20.3088 8.70258 21 9.66915 21H14.3308C15.2974 21 16.1257 20.3087 16.2986 19.3578L18 10' stroke='#c2c0b6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path> <path d='M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z' stroke='#c2c0b6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path> </g></svg>";
    buttonGroup.append(deleteButton);

    let description = p.cloneNode();
    if (projectListDeserialized()[index].description.length > 100) {
        description = button.cloneNode();
        description.classList.add("description");
        projectListDeserialized()[index].shortDescription ?
        description.innerText = `${projectListDeserialized()[index].description.substring(0, 100)}...` :
        description.innerText = projectListDeserialized()[index].description;
    } else if (projectListDeserialized()[index].description.length > 0) {
        description.classList.add("description");
        description.innerText = projectListDeserialized()[index].description;
    };
    main.append(description);

    if (projectListDeserialized()[index].completed === true) {
        mainTitle.classList.add("completed");
        group1.classList.add("completed");
        description.classList.add("completed");
    };

    for(let i = 0; i < taskListDeserialized().length; i++) {
        if (parseInt(localStorage.currentPage) === taskListDeserialized()[i].project) {
            const task = div.cloneNode();
            task.classList.add("main-task");
            if (taskListDeserialized()[i].completed === true) task.classList.add("completed");
            main.append(task);

            const group1 = div.cloneNode();
            group1.classList.add("main-item-group");
            task.append(group1);

            const title = p.cloneNode();
            title.innerText = taskListDeserialized()[i].title;
            group1.append(title);

            const buttonGroup = div.cloneNode();
            buttonGroup.classList.add("main-item-group");
            group1.append(buttonGroup);

            const checkboxButton = button.cloneNode();
            checkboxButton.classList.add("main-button");
            checkCompleted(checkboxButton, taskListDeserialized(), i);
            buttonGroup.append(checkboxButton);

            const editButton = button.cloneNode();
            editButton.classList.add("main-button");
            editButton.setAttribute("aria-label", "Edit task");
            editButton.innerHTML = "<svg class='main-svg' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' fill='#c2c0b6' stroke='#c2c0b6'><g id='SVGRepo_bgCarrier' stroke-width='0'></g><g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g><g id='SVGRepo_iconCarrier'> <title></title> <g id='Complete'> <g id='edit'> <g> <path d='M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8' fill='none' stroke='#c2c0b6' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'></path> <polygon fill='none' points='12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8' stroke='#c2c0b6' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'></polygon> </g> </g> </g> </g></svg>"
            buttonGroup.append(editButton);

            const deleteButton = button.cloneNode();
            deleteButton.classList.add("main-button");
            deleteButton.setAttribute("aria-label", "Delete task");
            deleteButton.innerHTML = "<svg class='main-svg' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><g id='SVGRepo_bgCarrier' stroke-width='0'></g><g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g><g id='SVGRepo_iconCarrier'> <path d='M4 7H20' stroke='#c2c0b6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path> <path d='M6 10L7.70141 19.3578C7.87432 20.3088 8.70258 21 9.66915 21H14.3308C15.2974 21 16.1257 20.3087 16.2986 19.3578L18 10' stroke='#c2c0b6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path> <path d='M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z' stroke='#c2c0b6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path> </g></svg>";
            buttonGroup.append(deleteButton);

            let description = p.cloneNode();
            if (taskListDeserialized()[i].description.length > 100) {
                description = button.cloneNode();
                description.classList.add("description");
                taskListDeserialized()[i].shortDescription ?
                description.innerText = `${taskListDeserialized()[i].description.substring(0, 100)}...` :
                description.innerText = taskListDeserialized()[i].description;
            } else if (taskListDeserialized()[i].description.length > 0) {
                description.classList.add("description");
                description.innerText = taskListDeserialized()[i].description;
            };
            task.append(description);

            const group2 = div.cloneNode();
            group2.classList.add("main-item-group");
            task.append(group2);

            const project = p.cloneNode();
            if (taskListDeserialized().project === "None") project.innerText = `Project: ${taskListDeserialized()[i].project}`;
            else project.innerText = `Project: ${projectListDeserialized()[taskListDeserialized()[i].project].title}`;
            group2.append(project);

            const priority = p.cloneNode();
            priority.innerText = `Priority: ${taskListDeserialized()[i].priority}`;
            group2.append(priority);
                    
            const dueDate = p.cloneNode();
            dueDate.innerText = `Due ${taskListDeserialized()[i].dueDate ? formatDistanceToNow(new Date(taskListDeserialized()[i].dueDate), { addSuffix: true }) : '—'}`;
            group2.append(dueDate);

            checkboxButton.addEventListener("click", () => {
                toggleCompleted(taskList, i);
                updateTaskListStorage();
                clearDOM(main);
                renderCurrentPage();
            });

            editButton.addEventListener("click", () => {
                updateCurrentIndexStorage(i);
                clearDOM(editTaskProjectSelect);
                renderEditDialogForm(taskList, i);
                editTaskDialog.showModal();
            });
            
            deleteButton.addEventListener("click", () => {
                updateCurrentIndexStorage(i);
                deleteTaskDialog.showModal();
            });
            
            description.addEventListener("click", () => {
                toggleDescription(taskList, i);
                updateTaskListStorage();
                clearDOM(main);
                renderCurrentPage();
            });
        };
    };

    checkboxButton.addEventListener("click", () => {
        toggleCompleted(projectList, index);
        updateProjectListStorage();
        clearDOM(main);
        renderCurrentPage();
    });

    editButton.addEventListener("click", () => {
        updateCurrentIndexStorage(index);
        renderEditDialogForm(projectList, index);
        editProjectDialog.showModal();
    });
            
    deleteButton.addEventListener("click", () => {
        updateCurrentIndexStorage(index);    
        deleteProjectDialog.showModal();
    });

    description.addEventListener("click", () => {
        toggleDescription(projectList, index);
        updateProjectListStorage();
        clearDOM(main);
        renderCurrentPage();
    });
};

function renderCurrentPage() {
    if (localStorage.currentPage === "tasks") renderTasks();
    else if (localStorage.currentPage === "projects") renderProjects();
    else renderProject(localStorage.currentPage);
};

function renderTaskProjectOptions(taskProjectSelect, index) {
    const option = document.createElement("option");

    const noneOption = option.cloneNode();
    noneOption.setAttribute("value", "None");
    if (taskProjectSelect === newTaskProjectSelect) noneOption.setAttribute("selected", "");
    noneOption.innerText = "None";
    taskProjectSelect.append(noneOption);

    for(let i = 0; i < projectListDeserialized().length; i++) {
        const projectOption = option.cloneNode();
        projectOption.setAttribute("value", i);
        if (taskProjectSelect === editTaskProjectSelect && taskListDeserialized()[index].project === i) {
            projectOption.setAttribute("selected", "");
        };
        projectOption.innerText = projectListDeserialized()[i].title;
        taskProjectSelect.append(projectOption);
    };
};

function renderEditDialogForm (list, index) {
    if (list === taskList) {
        const title = document.querySelector("#edit-task-title");
        const description = document.querySelector("#edit-task-description");
        const dueDate = document.querySelector("#edit-task-due-date");
        const priority = document.querySelector("#edit-task-priority");
        const project = document.querySelector("#edit-task-project");

        title.value = list[index].title;
        description.value = list[index].description;
        dueDate.value = list[index].dueDate;
        priority.value = list[index].priority;
        project.value = list[index].project;

        renderTaskProjectOptions(editTaskProjectSelect, index);
    } else if (list === projectList) {
        const title = document.querySelector("#edit-project-title");
        const description = document.querySelector("#edit-project-description");
        const dueDate = document.querySelector("#edit-project-due-date");
        const priority = document.querySelector("#edit-project-priority");

        title.value = list[index].title;
        description.value = list[index].description;
        dueDate.value = list[index].dueDate;
        priority.value = list[index].priority;
    };
};

function checkCompleted(checkboxButton, list, index) {
    if (list[index].completed === true) {
        checkboxButton.setAttribute("aria-label", "Uncheck Project");
        checkboxButton.innerHTML = "<svg class='main-svg' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' stroke='#c2c0b6'><g id='SVGRepo_bgCarrier' stroke-width='0'></g><g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g><g id='SVGRepo_iconCarrier'> <g id='Interface / Checkbox_Check'> <path id='Vector' d='M8 12L11 15L16 9M4 16.8002V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V16.8036C20 17.9215 20 18.4805 19.7822 18.9079C19.5905 19.2842 19.2837 19.5905 18.9074 19.7822C18.48 20 17.921 20 16.8031 20H7.19691C6.07899 20 5.5192 20 5.0918 19.7822C4.71547 19.5905 4.40973 19.2842 4.21799 18.9079C4 18.4801 4 17.9203 4 16.8002Z' stroke='#c2c0b6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path> </g> </g></svg>"
        return checkboxButton;
    } else {
        checkboxButton.setAttribute("aria-label", "Check Project");
        checkboxButton.innerHTML = "<svg class='main-svg' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><g id='SVGRepo_bgCarrier' stroke-width='0'></g><g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g><g id='SVGRepo_iconCarrier'> <g id='Interface / Checkbox_Unchecked'> <path id='Vector' d='M4 7.2002V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V7.19691C20 6.07899 20 5.5192 19.7822 5.0918C19.5905 4.71547 19.2837 4.40973 18.9074 4.21799C18.4796 4 17.9203 4 16.8002 4H7.2002C6.08009 4 5.51962 4 5.0918 4.21799C4.71547 4.40973 4.40973 4.71547 4.21799 5.0918C4 5.51962 4 6.08009 4 7.2002Z' stroke='#c2c0b6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path> </g> </g></svg>"
        return checkboxButton;
    }
};

const checkTaskProjectType = (data) => {
    if (!(isNaN(parseInt(data.task_project)))) return data.task_project = parseInt(data.task_project);
};

allButtons.forEach(button => {
    button.addEventListener("click", () => {
        switch(button.id) {
            case "new-task-sidebar-button":
                clearDOM(newTaskProjectSelect);
                renderTaskProjectOptions(newTaskProjectSelect);
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
                updateCurrentPageStorage("tasks");
                clearDOM(main);
                return renderCurrentPage();
            case "view-projects-sidebar-button":
                updateCurrentPageStorage("projects");
                clearDOM(main);
                return renderCurrentPage();
            case "edit-task-dialog-cancel-button":
                editTaskDialogForm.reset();
                return editTaskDialog.close();
            case "edit-project-dialog-cancel-button":
                editProjectDialogForm.reset();
                return editProjectDialog.close();
            case "delete-task-dialog-cancel-button":
                return deleteTaskDialog.close();
            case "delete-project-dialog-cancel-button":
                return deleteProjectDialog.close();
        };
    });
});

newTaskDialogForm.addEventListener("submit", () => {
    const data = Object.fromEntries(new FormData(newTaskDialogForm));
    checkTaskProjectType(data);
    const task = createTask(data);
    addTask(task);
    updateTaskListStorage();
    newTaskDialogForm.reset();
    clearDOM(main);
    renderCurrentPage();
});

newProjectDialogForm.addEventListener("submit", () => {
    const data = Object.fromEntries(new FormData(newProjectDialogForm));
    const project = createProject(data);
    addProject(project);
    updateProjectListStorage();
    newProjectDialogForm.reset();
    clearDOM(main);
    renderCurrentPage();
});

newTaskDialog.addEventListener("cancel", () => newTaskDialogForm.reset());
newProjectDialog.addEventListener("cancel", () => newProjectDialogForm.reset());

editTaskDialogForm.addEventListener("submit", () => {
    const data = Object.fromEntries(new FormData(editTaskDialogForm));
    checkTaskProjectType(data);
    const task = createTask(data);
    editTask(parseInt(localStorage.currentIndex), task);
    updateTaskListStorage();
    editTaskDialogForm.reset();
    clearDOM(main);
    renderCurrentPage();
});

editProjectDialogForm.addEventListener("submit", () => {
    const data = Object.fromEntries(new FormData(editProjectDialogForm));
    const project = createProject(data);
    editProject(parseInt(localStorage.currentIndex), project);
    updateProjectListStorage();
    newProjectDialogForm.reset();
    clearDOM(main);
    renderCurrentPage();
});

editTaskDialog.addEventListener("cancel", () => editTaskDialogForm.reset());
editProjectDialog.addEventListener("cancel", () => editProjectDialogForm.reset());

deleteTaskDialogForm.addEventListener("submit", () => {
    deleteTask(parseInt(localStorage.currentIndex));
    updateTaskListStorage();
    clearDOM(main);
    renderCurrentPage();
});

deleteProjectDialogForm.addEventListener("submit", () => {
    updateCurrentPageStorage("projects");
    deleteProject(parseInt(localStorage.currentIndex));
    updateProjectListStorage();
    updateTaskListStorage();
    clearDOM(main);
    renderCurrentPage();
});

updateCurrentPageStorage("tasks")
renderCurrentPage();

// time isn't quite accurate? dueDate set for tomorrow says due in 5 hours when it's 2pm?
// completed doesn't update in local storage or doesn't update at all? idk
// clean up code/make pretty - double check SOLID and module logic