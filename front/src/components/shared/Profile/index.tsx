import axios from 'axios';
import Image from 'next/image';
import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';

import checkSizeOfFile from '../../../hooks/useCheckSizeOfFile';
import useFetchUsers from '../../../hooks/useFormFetch';
import { UserData } from '../../../types/UserDataType';
import EmptyButton from '../../core/Buttons/EmptyButton';
import ModalWindow from '../../core/ModalWindow/ModalWindow';
import ProfilePanels from './StudentInfo';
import StudentInfo from './StudentPanel';
import cn from './style.module.sass';

interface MyResponse {
    status: number;
    data: {
        img: string;
        full_name: string;
    };
}

function ProfileLayout() {
    const [selectedFile, fileValidation, handleFileChange] = checkSizeOfFile();
    const [users] = useFetchUsers();
    const [isOpen, setIsOpen] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useEffect(() => setUserData(users), [users]);

    const cookies = parseCookies();
    const { token } = cookies;

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (selectedFile) {
            const formData = new FormData();
            formData.append('img', selectedFile);
            try {
                const res: MyResponse = await axios.post(
                    `https://api.meatballs.w6p.ru/api/profile/change/img`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (res.status === 200) {
                    setIsOpen(false);
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    setUserData(prevState => ({
                        ...prevState,
                        img: res.data.img,
                    }));
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    return (
        <div className={cn.container}>
            <div className={cn.picture}>
                <Image
                    src={userData?.img ? `${userData.img}` : '/images/profile/profile-empty.svg'}
                    width={224}
                    height={224}
                    alt="Profile"
                />
                <button className={cn.changePic} onClick={handleOpenModal}>
                    сменить фото
                </button>
                <ModalWindow isOpen={isOpen} onClose={handleCloseModal}>
                    <form onSubmit={() => handleSubmit} className={cn.modalWindowForm}>
                        {fileValidation.isValid && (
                            <Image
                                src={fileValidation.imageUrl}
                                width={460}
                                className={cn.modalWindowFormImg}
                                height={272}
                                style={{ marginBottom: '22px' }}
                                alt="Selected Image"
                            />
                        )}
                        <input
                            className={`${cn.modalWindowFormInput} ${
                                fileValidation.isValid ? cn.ActiveFile : ''
                            }`}
                            type="file"
                            onChange={handleFileChange}
                        />
                        {fileValidation.isValid ? (
                            <p className={cn.SuccessMessage}>Ваш файл успешно загружен</p>
                        ) : (
                            <p className={cn.ErrorMessage}>{fileValidation.errorMessage}</p>
                        )}
                        <EmptyButton
                            className={cn.EmptyButtonProfile}
                            type="submit"
                            disabled={!fileValidation.isValid}
                            onClick={handleSubmit}
                        >
                            Загрузить
                        </EmptyButton>
                    </form>
                </ModalWindow>
            </div>
            <div className={cn.panel}>
                <StudentInfo />
            </div>
            <div className={cn.information}>
                <ProfilePanels typeCase="case" />
                <ProfilePanels typeCase="service" />
            </div>
        </div>
    );
}

export default ProfileLayout;
