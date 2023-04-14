import React from 'react';

import ModalWindow from '../../../core/ModalWindow/ModalWindow';
import ProjectCard from '../ProjectCard';

type ModalProject = {
    id: number;
    title: string;
    description: string;
    status: string;
    topic: string;
    deadline: number;
    subject: {
        subject: string;
    };
    created: number;
    files: [];
};

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    modalProject: ModalProject;
}

function ProjectCardModal({ isOpen, onClose, modalProject }: ModalProps) {
    return (
        <ModalWindow isOpen={isOpen} onClose={onClose}>
            <ProjectCard modalProject={modalProject} />
        </ModalWindow>
    );
}

export default ProjectCardModal;
