import axios from 'axios';
import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';
import BaseLayout from 'src/components/shared/layouts/MainLayout';

import ProjectBlock from '../components/features/projects/ProjectBlock';
import { withAuth } from '../utils/withAuth';

interface Project {
    files: [];
    status: string;
    id: number;
    deadline: number;
    taskTitle: string;
    description: string;
    subject: { subject: string };
}

interface ApiResponse {
    data: Project[];
}

function ProjectPage() {
    const [openProjects, setOpenProjects] = useState<Project[]>([]);
    const [inProgressProjects, setInProgressProjects] = useState<Project[]>([]);
    const [completedProjects, setCompletedProjects] = useState<Project[]>([]);

    const cookies = parseCookies();
    const { token } = cookies;

    useEffect(() => {
        axios
            .get<ApiResponse>('https://api.meatballs.w6p.ru/api/projects', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(response => {
                const projects = response.data.data;
                if (Array.isArray(projects)) {
                    const openProjects = projects.filter(project => project.status === 'Открыто');
                    const inProgressProjects = projects.filter(
                        project => project.status === 'В работе'
                    );
                    const completedProjects = projects.filter(
                        project => project.status === 'Завершено'
                    );
                    setOpenProjects(openProjects);
                    setInProgressProjects(inProgressProjects);
                    setCompletedProjects(completedProjects);
                } else {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    const openProjects = projects.status === 'Открыто' ? projects : [];
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    const inProgressProjects = projects.status === 'В работе' ? projects : [];
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    const completedProjects = projects.status === 'Завершено' ? projects : [];
                    setOpenProjects(openProjects);
                    setInProgressProjects(inProgressProjects);
                    setCompletedProjects(completedProjects);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    return (
        <BaseLayout>
            <div className="projectWrapper">
                <ProjectBlock title="Открыто" color="1B2BBD" projects={openProjects} />
                <ProjectBlock title="В работе" color="AC56CA" projects={inProgressProjects} />
                <ProjectBlock title="Завершено" color="8CBC7B" projects={completedProjects} />
            </div>
        </BaseLayout>
    );
}

export default withAuth(ProjectPage);
