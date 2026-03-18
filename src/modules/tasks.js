const taskList = [];

function createTask(title, description, dueDate, priority, completed) {
    return { title, description, dueDate, priority, completed };
};

taskList.push(createTask("Exercise", "Run a mile", "03/18/26", "Medium", false));