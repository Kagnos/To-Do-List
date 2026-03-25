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
    main.classList.remove("grid-view");
    main.classList.add("list-view");
    
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

        const taskButtonGroup = div.cloneNode();
        taskButtonGroup.classList.add("main-item-group");
        taskGroup1.append(taskButtonGroup);

        const checkboxButton = button.cloneNode();
        checkboxButton.classList.add("main-button");
        checkboxButton.setAttribute("aria-label", "Check task");
        checkboxButton.innerHTML = "<svg class='main-svg' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><g id='SVGRepo_bgCarrier' stroke-width='0'></g><g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g><g id='SVGRepo_iconCarrier'> <g id='Interface / Checkbox_Unchecked'> <path id='Vector' d='M4 7.2002V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V7.19691C20 6.07899 20 5.5192 19.7822 5.0918C19.5905 4.71547 19.2837 4.40973 18.9074 4.21799C18.4796 4 17.9203 4 16.8002 4H7.2002C6.08009 4 5.51962 4 5.0918 4.21799C4.71547 4.40973 4.40973 4.71547 4.21799 5.0918C4 5.51962 4 6.08009 4 7.2002Z' stroke='#c2c0b6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path> </g> </g></svg>"
        taskButtonGroup.append(checkboxButton);

        const editButton = button.cloneNode();
        editButton.classList.add("main-button");
        editButton.setAttribute("aria-label", "Edit task");
        editButton.innerHTML = "<svg class='main-svg' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' fill='#c2c0b6' stroke='#c2c0b6'><g id='SVGRepo_bgCarrier' stroke-width='0'></g><g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g><g id='SVGRepo_iconCarrier'> <title></title> <g id='Complete'> <g id='edit'> <g> <path d='M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8' fill='none' stroke='#c2c0b6' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'></path> <polygon fill='none' points='12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8' stroke='#c2c0b6' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'></polygon> </g> </g> </g> </g></svg>"
        taskButtonGroup.append(editButton);

        const deleteButton = button.cloneNode();
        deleteButton.classList.add("main-button");
        deleteButton.setAttribute("aria-label", "Delete task");
        deleteButton.innerHTML = "<svg class='main-svg' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><g id='SVGRepo_bgCarrier' stroke-width='0'></g><g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g><g id='SVGRepo_iconCarrier'> <path d='M4 7H20' stroke='#c2c0b6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path> <path d='M6 10L7.70141 19.3578C7.87432 20.3088 8.70258 21 9.66915 21H14.3308C15.2974 21 16.1257 20.3087 16.2986 19.3578L18 10' stroke='#c2c0b6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path> <path d='M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z' stroke='#c2c0b6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path> </g></svg>";
        taskButtonGroup.append(deleteButton);

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

        checkboxButton.addEventListener("click", () => {
            console.log(`checkbox button from task "${taskList[i].title}" pressed`);
        });

        editButton.addEventListener("click", () => {
            console.log(`edit button from task "${taskList[i].title}" pressed`);
        });
          
        deleteButton.addEventListener("click", () => {
            console.log(`delete button from task "${taskList[i].title}" pressed`);
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
    main.classList.remove("grid-view");
    main.classList.add("list-view");

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
    
    const buttonGroup = div.cloneNode();
    buttonGroup.classList.add("main-item-group");
    projectGroup1.append(buttonGroup);

    const checkboxButton = button.cloneNode();
    checkboxButton.classList.add("main-button");
    checkboxButton.setAttribute("aria-label", "Check Project");
    checkboxButton.innerHTML = "<svg class='main-svg' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><g id='SVGRepo_bgCarrier' stroke-width='0'></g><g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g><g id='SVGRepo_iconCarrier'> <g id='Interface / Checkbox_Unchecked'> <path id='Vector' d='M4 7.2002V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V7.19691C20 6.07899 20 5.5192 19.7822 5.0918C19.5905 4.71547 19.2837 4.40973 18.9074 4.21799C18.4796 4 17.9203 4 16.8002 4H7.2002C6.08009 4 5.51962 4 5.0918 4.21799C4.71547 4.40973 4.40973 4.71547 4.21799 5.0918C4 5.51962 4 6.08009 4 7.2002Z' stroke='#c2c0b6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path> </g> </g></svg>"
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

            const taskButtonGroup = div.cloneNode();
            taskButtonGroup.classList.add("main-item-group");
            taskGroup1.append(taskButtonGroup);

            const checkboxButton = button.cloneNode();
            checkboxButton.classList.add("main-button");
            checkboxButton.setAttribute("aria-label", "Check task");
            checkboxButton.innerHTML = "<svg class='main-svg' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><g id='SVGRepo_bgCarrier' stroke-width='0'></g><g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g><g id='SVGRepo_iconCarrier'> <g id='Interface / Checkbox_Unchecked'> <path id='Vector' d='M4 7.2002V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V7.19691C20 6.07899 20 5.5192 19.7822 5.0918C19.5905 4.71547 19.2837 4.40973 18.9074 4.21799C18.4796 4 17.9203 4 16.8002 4H7.2002C6.08009 4 5.51962 4 5.0918 4.21799C4.71547 4.40973 4.40973 4.71547 4.21799 5.0918C4 5.51962 4 6.08009 4 7.2002Z' stroke='#c2c0b6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path> </g> </g></svg>"
            taskButtonGroup.append(checkboxButton);

            const editButton = button.cloneNode();
            editButton.classList.add("main-button");
            editButton.setAttribute("aria-label", "Edit task");
            editButton.innerHTML = "<svg class='main-svg' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' fill='#c2c0b6' stroke='#c2c0b6'><g id='SVGRepo_bgCarrier' stroke-width='0'></g><g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g><g id='SVGRepo_iconCarrier'> <title></title> <g id='Complete'> <g id='edit'> <g> <path d='M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8' fill='none' stroke='#c2c0b6' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'></path> <polygon fill='none' points='12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8' stroke='#c2c0b6' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'></polygon> </g> </g> </g> </g></svg>"
            taskButtonGroup.append(editButton);

            const deleteButton = button.cloneNode();
            deleteButton.classList.add("main-button");
            deleteButton.setAttribute("aria-label", "Delete task");
            deleteButton.innerHTML = "<svg class='main-svg' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><g id='SVGRepo_bgCarrier' stroke-width='0'></g><g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g><g id='SVGRepo_iconCarrier'> <path d='M4 7H20' stroke='#c2c0b6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path> <path d='M6 10L7.70141 19.3578C7.87432 20.3088 8.70258 21 9.66915 21H14.3308C15.2974 21 16.1257 20.3087 16.2986 19.3578L18 10' stroke='#c2c0b6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path> <path d='M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z' stroke='#c2c0b6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path> </g></svg>";
            taskButtonGroup.append(deleteButton);

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

            checkboxButton.addEventListener("click", () => {
                console.log(`checkbox button from task "${taskList[i].title}" pressed`);
            });

            editButton.addEventListener("click", () => {
                console.log(`edit button from task "${taskList[i].title}" pressed`);
            });
            
            deleteButton.addEventListener("click", () => {
                console.log(`delete button from task "${taskList[i].title}" pressed`);
            });
        };
    };

    checkboxButton.addEventListener("click", () => {
        console.log(`checkbox button from project "${currentPage}" pressed`);
    });

    editButton.addEventListener("click", () => {
        console.log(`edit button from project "${currentPage}" pressed`);
    });
            
    deleteButton.addEventListener("click", () => {
        console.log(`delete button from project "${currentPage}" pressed`);
    });
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


// rename tasks and projects to allTasks and allProjects

// reevalutate what needs to be done
// checkbox, edit svg, delete svg
// projects and tasks view description limits with ... maybe can click to expand?
// local storage
// sorting by recent or completed?