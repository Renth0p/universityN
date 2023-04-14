import axios from 'axios';
import moment from 'moment';
import Image from 'next/image';
import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';

import ProjectBlockProps from '../../../../types/ProjectType';
import ModalWindow from '../../../core/ModalWindow/ModalWindow';
import ProjectForm from '../ProjectForm';
import ProjectCardModal from '../ProjectModalWindow';
import cn from './style.module.sass';

function ProjectBlock({ title, color, projects }: ProjectBlockProps) {
    const cookies = parseCookies();
    const { token } = cookies;
    const [isOpen, setIsOpen] = useState(false);
    const [dateOfNow, setDateOfNow] = useState('');
    const [isCardOpen, setIsCardOpen] = useState(false);
    const [modalProject, setModalProject] = useState(null);
    const [dropMenuOpen, setDropMenuOpen] = useState(-1);
    const [projectList, setProjectList] = useState(projects);

    function toggleMenu(projectId: number) {
        setDropMenuOpen(dropMenuOpen === projectId ? -1 : projectId);
    }

    useEffect(() => {
        const date = moment().format('DD.MM.YYYY');
        setDateOfNow(date);
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const handleOpenCard = project => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setModalProject(project);
        setIsCardOpen(true);
    };
    const handleCloseCard = () => {
        setIsCardOpen(false);
    };

    async function deleteProjectPost(id: number) {
        try {
            const res = await axios.delete(
                `https://api.meatballs.w6p.ru/api/projects/delete/${id}`,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (res.status === 200) {
                setProjectList(projectList.filter(project => project.id !== id));
            }
        } catch (e) {
            console.error(e);
        }
    }

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    return (
        <div className={cn.projectBlog}>
            <div>
                <div className={cn.projectBlogTop} style={{ borderBottom: `3px solid #${color}` }}>
                    <div className={cn.projectBlogTitle}>
                        <h2 className={cn.projectBlogText}>{title}</h2>
                        <span className={cn.projectBlogNumber}>{projects.length}</span>
                    </div>
                    <div>
                        <button className={cn.projectBlogBtn} onClick={handleOpenModal}>
                            Создать карточку
                        </button>
                    </div>
                </div>
                <ModalWindow isOpen={isOpen} onClose={handleCloseModal}>
                    <ProjectForm typeWindow={title} handleCloseModal={handleCloseModal} />
                </ModalWindow>
                <ProjectCardModal
                    isOpen={isCardOpen}
                    onClose={handleCloseCard}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    modalProject={modalProject}
                />
                <div className={cn.projectCards}>
                    {projects.map(project => {
                        const dataOfDeadLine = project.deadline
                            ? moment(project.deadline).format('DD.MM.YYYY')
                            : '';
                        return (
                            <div key={project.id} className={cn.projectCard}>
                                <div className={cn.projectCardTop}>
                                    <div className={cn.projectCardTopSubject}>
                                        <p>{project.subject.subject}</p>
                                        <button onClick={() => toggleMenu(project.id)}>
                                            <Image
                                                src="/images/svg/project/more.svg"
                                                width={24}
                                                height={24}
                                                alt="Icon"
                                            />
                                            {
                                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                // @ts-ignore
                                                dropMenuOpen === project.id && (
                                                    <ul className={cn.dropMenu}>
                                                        <div>
                                                            <button
                                                                className={cn.dropMenuItem}
                                                                onClick={() =>
                                                                    handleOpenCard(project)
                                                                }
                                                            >
                                                                <Image
                                                                    src="/images/svg/project/CardOpen.svg"
                                                                    width={24}
                                                                    height={24}
                                                                    alt="Icon"
                                                                />
                                                                Открыть
                                                            </button>
                                                        </div>
                                                        <div className={cn.dropMenuItem}>
                                                            <button className={cn.dropMenuItem}>
                                                                <Image
                                                                    src="/images/svg/project/CardMove.svg"
                                                                    width={24}
                                                                    height={24}
                                                                    alt="Icon"
                                                                />
                                                                Переместить
                                                            </button>
                                                        </div>
                                                        <div className={cn.dropMenuItem}>
                                                            <button
                                                                className={cn.dropMenuItem}
                                                                onClick={() =>
                                                                    deleteProjectPost(project.id)
                                                                }
                                                            >
                                                                <Image
                                                                    src="/images/svg/project/CardDelete.svg"
                                                                    width={24}
                                                                    height={24}
                                                                    alt="Icon"
                                                                />
                                                                Удалить
                                                            </button>
                                                        </div>
                                                    </ul>
                                                )
                                            }
                                        </button>
                                    </div>
                                    <div className={cn.projectCardTopTitle}>
                                        <h3>{project.taskTitle}</h3>
                                    </div>
                                </div>
                                <div className={cn.projectCardBottom}>
                                    {dataOfDeadLine ? (
                                        <div
                                            className={`${cn.projectCardDeadLine} ${
                                                dataOfDeadLine === dateOfNow
                                                    ? `${cn.projectCardDeadLineRed}`
                                                    : ''
                                            }`}
                                        >
                                            <Image
                                                src="/images/svg/project/Deadline.svg"
                                                alt="Icon"
                                                width={18}
                                                height={18}
                                            />
                                            <p>{dataOfDeadLine}</p>
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                    {project.files.length >= 1 ? (
                                        <div className={cn.projectCardAttach}>
                                            <Image
                                                src="/images/svg/project/attach.svg"
                                                alt="Icon"
                                                width={18}
                                                height={18}
                                            />
                                            <p>{project.files.length}</p>
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ProjectBlock;
