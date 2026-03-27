export function createProject(data) {
    return {
        title: data.new_project_title,
        description: data.new_project_description,
        dueDate: data.new_project_due_date,
        priority: data.new_project_priority,
        completed: false,
    };
};