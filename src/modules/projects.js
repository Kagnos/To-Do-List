export function createProject(data) {
    return {
        title: data.project_title,
        description: data.project_description,
        dueDate: data.project_due_date,
        priority: data.project_priority,
        completed: false,
    };
};