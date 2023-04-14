import axios from 'axios';
import moment from 'moment/moment';
import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';

import ImgButton from '../../../core/Buttons/ImgButton';
import cn from './style.module.sass';

interface ProjectFormState {
    topic: string;
    taskTitle: string;
    description: string;
}

interface ProjectFormProps {
    typeWindow: string;
    handleCloseModal: (b: boolean) => void;
}

function ProjectForm({ typeWindow, handleCloseModal }: ProjectFormProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [dateOfDay, setDateOfDay] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [state, setState] = useState<ProjectFormState>(() => {
        const storedState = sessionStorage.getItem('projectFormState');
        return storedState
            ? (JSON.parse(storedState) as ProjectFormState)
            : {
                  topic: '',
                  taskTitle: '',
                  description: '',
              };
    });

    const cookies = parseCookies();
    const { token } = cookies;

    useEffect(() => {
        moment.locale('ru');
        setDateOfDay(moment().format('DD.MM.YYYY'));
    }, []);

    useEffect(() => {
        sessionStorage.setItem('projectFormState', JSON.stringify(state));
    }, [state]);

    async function sendProjectCard() {
        try {
            const res = await axios.post(
                'https://api.meatballs.w6p.ru/api/projects/create',
                {
                    status: typeWindow,
                    ...state,
                    deadline: `${selectedDate} ${selectedTime}`,
                    files: selectedFile,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            if (res.status === 200) {
                sessionStorage.removeItem('projectFormState');
                handleCloseModal(false);
            }
        } catch (e) {
            console.error(e);
        }
    }

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleTopicChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setState(prevState => ({ ...prevState, topic: event.target.value }));
    };

    const handleTaskTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setState(prevState => ({ ...prevState, taskTitle: event.target.value }));
    };

    const handleTaskDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setState(prevState => ({ ...prevState, description: event.target.value }));
    };

    const handlerClearForm = () => {
        sessionStorage.removeItem('projectFormState');
        handleCloseModal(false);
    };

    return (
        <div className={cn.projectFormWrapper}>
            <div>
                <form className={cn.projectForm}>
                    <label className={cn.projectFormLabel}>
                        <h3 className={cn.projectFormLabelTitle}>Тему</h3>
                        <textarea
                            className={cn.projectFormLabelTextArea}
                            placeholder="Напишите тему"
                            value={state.topic}
                            onChange={handleTopicChange}
                        />
                        <div className={cn.projectFormLabelBlockText}>
                            <p className={cn.projectFormLabelText}>
                                в списке <span>{typeWindow}</span>
                            </p>
                            <p className={cn.projectFormLabelText}>
                                создано <span>{dateOfDay}</span>
                            </p>
                        </div>
                    </label>
                    <label>
                        <p>
                            {selectedDate} {selectedTime}
                        </p>
                    </label>
                    <label className={cn.projectFormLabel}>
                        <h3 className={cn.projectFormLabelTitle}>Заголовок задачи</h3>
                        <textarea
                            className={cn.projectFormLabelTextArea}
                            placeholder="Напишите Заголовок"
                            value={state.taskTitle}
                            onChange={handleTaskTitleChange}
                        />
                    </label>
                    <label className={cn.projectFormLabel}>
                        <h3 className={cn.projectFormLabelTitleBold}>Описание</h3>
                        <textarea
                            className={cn.projectFormLabelTextArea}
                            placeholder="Добавить более подробное описание..."
                            value={state.description}
                            onChange={handleTaskDescriptionChange}
                        />
                    </label>
                    <div>
                        <h1>Вложения</h1>
                    </div>
                </form>
                <div className={cn.projectFormButton}>
                    <button className={cn.projectFormButtonAdd} onClick={sendProjectCard}>
                        Добавить карточку
                    </button>
                    <button className={cn.projectFormButtonCancel} onClick={handlerClearForm}>
                        Отменить
                    </button>
                </div>
            </div>

            <div className={cn.blockWithButtons}>
                <p className={cn.blockWithButtonsTitle}>Добавить на карточку</p>
                <ImgButton
                    setSelectedDate={setSelectedDate}
                    setSelectedTime={setSelectedTime}
                    typeContent="date"
                    imageName="time"
                    typeWindow={typeWindow}
                >
                    Дедлайн
                </ImgButton>
                <ImgButton handleFileSelect={handleFileSelect} typeContent="file" imageName="clip">
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

export default ProjectForm;
