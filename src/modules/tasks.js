export function createTask(data) {
    return {
        title: data.task_title,
        description: data.task_description,
        dueDate: data.task_due_date,
        priority: data.task_priority,
        completed: false,
        project: data.task_project,
    };
};