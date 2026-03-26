export const taskList = [];
export const projectList = [];

export let currentPage = 0;

export function addTask(task) {
    taskList.push(task);
};

export function addProject(project) {
    projectList.push(project);
};

export const updateCurrentPage = (page) => currentPage = page;

export const toggleCompleted = (list, index) => list[index].completed = !list[index].completed;