export function createTask(data) {
    return {
        title: data.new_task_title,
        description: data.new_task_description,
        dueDate: data.new_task_due_date,
        priority: data.new_task_priority,
        completed: false,
        project: data.new_task_project,
    };
};