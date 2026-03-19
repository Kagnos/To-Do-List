export const taskList = [];
export const projectList = [];

export let currentPage = "welcome";

export function addTask(task) {
    taskList.push(task);
    console.log(taskList);
};

export function addProject(project) {
    projectList.push(project);
    console.log(projectList);
};

export const updateCurrentPage = (page) => currentPage = page;