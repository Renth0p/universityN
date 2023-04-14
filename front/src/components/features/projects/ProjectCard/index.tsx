import moment from 'moment/moment';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { File, ProjectProps } from '../../../../types/ProjectCardType';
import ImgButton from '../../../core/Buttons/ImgButton';
import cn from './style.module.sass';

function ProjectCard({ modalProject }: ProjectProps) {
    const [fileType, setFileType] = useState('');
    const formatTime = modalProject.created;
    const currectTime = moment(formatTime).format('DD.MM.YYYY');

    useEffect(() => {
        modalProject.files.forEach((file: File) => {
            const { fileName } = file;
            if (
                fileName.endsWith('.png') ||
                fileName.endsWith('.jpg') ||
                fileName.endsWith('.jpeg') ||
                fileName.endsWith('.svg')
            ) {
                setFileType('Photo');
            } else if (fileName.endsWith('.zip') || fileName.endsWith('.rar')) {
                setFileType('Archive');
            } else if (fileName.endsWith('.pdf')) {
                setFileType('PDF');
            } else if (fileName.endsWith('.pptx')) {
                setFileType('pptx');
            } else if (fileName.endsWith('.word')) {
                setFileType('word');
            }
        });
    }, [modalProject]);

    return (
        <div className={cn.projectCardWrapper}>
            <div>
                <p className={cn.projectCardSubject}>{modalProject.subject.subject}</p>
                <div>
                    <p className={cn.projectCardTopic}>{modalProject.topic}</p>
                    <div className={cn.projectCardTopicTime}>
                        <p className={cn.projectCardTopicTimeStatus}>
                            В списке <span>{modalProject.status}</span>
                        </p>
                        <p className={cn.projectCardTopicTimeDate}>
                            создано <span>{currectTime}</span>
                        </p>
                    </div>
                </div>
                {modalProject.deadline ? <div>1</div> : null}
                <div className={cn.projectCardDesc}>
                    <div className={cn.projectCardDescTop}>
                        <h1>Описание</h1>
                        <button>Изменить</button>
                    </div>
                    <p className={cn.projectCardDescText}>{modalProject.description}</p>
                </div>
                {modalProject.files.length === 0 ? null : (
                    <div className={cn.attachBlock}>
                        <p className={cn.attachBlockTitle}>Вложение</p>
                        <ul className={cn.attachBlockList}>
                            {modalProject.files.map((file: File) => {
                                const momentDate = file.created;
                                const day = moment(momentDate).format('DD.MM.YYYY');
                                const time = moment(momentDate).format('LTS');
                                return (
                                    <li key={file.id} className={cn.attachBlockItem}>
                                        <div className={cn.attachItemWrapper}>
                                            <div className={cn.attachItemType}>
                                                <p>{fileType}</p>
                                            </div>
                                            <div className={cn.attachItemTypeText}>
                                                <div>
                                                    <a
                                                        href={`${file.filePath}`}
                                                        className={cn.attachItemTypeLink}
                                                        download
                                                    >
                                                        <Image
                                                            src="/images/svg/project/Link.svg"
                                                            alt="Icon"
                                                            width={16}
                                                            height={16}
                                                        />
                                                        <p>{file.fileName}</p>
                                                    </a>
                                                </div>
                                                <p>
                                                    Добавлено {day} в {time}{' '}
                                                </p>
                                                <button>Удалить</button>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
            <div className={cn.blockWithButtons}>
                <p className={cn.blockWithButtonsTitle}>Добавить на карточку</p>
                <ImgButton typeContent="date" imageName="time">
                    Дедлайн
                </ImgButton>
                <ImgButton typeContent="file" imageName="clip">
                    Вложение
                </ImgButton>
                <p className={cn.blockWithButtonsTitle}>Действие</p>
                <ImgButton typeContent="text" imageName="arrow">
                    Перемещение
                </ImgButton>
            </div>
        </div>
    );
}

export default ProjectCard;
