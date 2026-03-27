export const taskList = [];
export const projectList = [];

export let currentPage = "tasks";

export function addTask(task) {
    taskList.push(task);
};

export function addProject(project) {
    projectList.push(project);
};

export const updateCurrentPage = (page) => currentPage = page;

export const toggleCompleted = (list, index) => {
    list[index].completed = !list[index].completed;

    if (list === projectList) {
        for(let i = 0; i < taskList.length; i++) {
            if (currentPage === taskList[i].project) taskList[i].completed = list[index].completed;
        };
    };
    if (list === taskList && typeof list[index].project === "number" && list[index].completed === false) {
        projectList[list[index].project].completed = false;
    };
}; 