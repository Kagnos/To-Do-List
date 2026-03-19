export const taskList = [];
export const projectList = [];

export let currentPage = "welcome";

export function addTask(task) {
    taskList.push(task);
};

export function addProject(project) {
    projectList.push(project);
};

export const updateCurrentPage = (page) => currentPage = page;