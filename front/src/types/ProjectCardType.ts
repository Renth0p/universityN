interface File {
    id: number;
    created: string;
    filePath: string;
    fileName: string;
}

interface Subject {
    subject: string;
}

interface ModalProject {
    id: number;
    topic: string;
    description: string;
    deadline: null | number;
    subject: Subject;
    status: string;
    created: number;
    files: File[];
}

interface ProjectProps {
    modalProject: ModalProject;
}

export type { File, ProjectProps };
