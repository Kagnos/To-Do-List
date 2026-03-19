const taskList = [];
const projectList = [];

export function addTask(task) {
    taskList.push(task);
    console.log(taskList);
};

export function addProject(project) {
    projectList.push(project);
    console.log(projectList);
};