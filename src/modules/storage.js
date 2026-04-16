import { taskList, projectList } from "./state.js";

export let taskListDeserialized = () => {
    if (localStorage.taskList === undefined) localStorage.setItem("taskList", "[]");
    return JSON.parse(localStorage.taskList);
};

export let projectListDeserialized = () => {
    if (localStorage.projectList === undefined) localStorage.setItem("projectList", "[]");
    return JSON.parse(localStorage.projectList);
};

export const updateTaskListStorage = () => localStorage.setItem("taskList", JSON.stringify(taskList));
export const updateProjectListStorage = () => localStorage.setItem("projectList", JSON.stringify(projectList));

export const updateCurrentPageStorage = (page) => localStorage.setItem("currentPage", page);
export const updateCurrentIndexStorage = (index) => localStorage.setItem("currentIndex", index);