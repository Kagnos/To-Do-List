import { taskList, projectList } from "./state.js";

export const updateTaskListStorage = () => localStorage.setItem("taskList", JSON.stringify(taskList));
export const updateProjectListStorage = () => localStorage.setItem("projectList", JSON.stringify(projectList));

export const updateCurrentPageStorage = (page) => localStorage.setItem("currentPage", page);
export const updateCurrentIndexStorage = (index) => localStorage.setItem("currentIndex", index);