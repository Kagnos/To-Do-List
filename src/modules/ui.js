import { createTask } from "./tasks.js"
import { addTask } from "./to-do-list.js"

const allButtons = document.querySelectorAll("button");

const taskDialog = document.querySelector("#task-dialog");
const taskDialogForm = document.querySelector("#task-dialog-form");

allButtons.forEach(button => {
    button.addEventListener("click", () => {
        switch(button.id) {
            case "new-task-sidebar-button":
                return taskDialog.showModal();
            case "task-dialog-cancel-button":
                taskDialogForm.reset();
                return taskDialog.close();
        };
    });
});

taskDialogForm.addEventListener("submit", () => {
    const data = Object.fromEntries(new FormData(taskDialogForm));
    console.log(data);
    const task = createTask(data);
    addTask(task);
    taskDialogForm.reset();
});