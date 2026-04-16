import { projectListDeserialized, taskListDeserialized } from "./storage.js";

export let taskList = taskListDeserialized();
export const projectList = projectListDeserialized();

export const addTask = (task) => taskList.push(task);

export const addProject = (project) => projectList.push(project);

export const editTask = (index, task) => taskList.splice(index, 1, task);

export const editProject = (index, project) => projectList.splice(index, 1, project);

export const deleteTask = (index) => taskList.splice(index, 1);

export const deleteProject = (index) => {
    projectList.splice(index, 1);
    taskList = taskList.filter((task) => task.project !== index);
};

export const toggleCompleted = (list, index) => {
    list[index].completed = !list[index].completed;

    if (list === projectList) {
        for(let i = 0; i < taskList.length; i++) {
            if (parseInt(localStorage.currentPage) === taskList[i].project) taskList[i].completed = list[index].completed;
        };
    } else if (list === taskList && typeof list[index].project === "number" && list[index].completed === false) {
        projectList[list[index].project].completed = false;
    };
};

export const toggleDescription = (list, index) => list[index].shortDescription = !list[index].shortDescription;