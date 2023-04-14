interface Project {
    files: [];
    id: number;
    taskTitle: string;
    description: string;
    deadline: number;
    subject: {
        subject: string;
    };
}

interface ProjectBlockProps {
    title: string;
    color: string;
    projects: Project[];
}

export default ProjectBlockProps;
