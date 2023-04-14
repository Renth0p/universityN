import React, { useEffect, useState } from 'react';

import useFetchUsers from '../../../../hooks/useFormFetch';
import EmptyButton from '../../../core/Buttons/EmptyButton';
import ChangePassword from '../ChangePassword';
import StudentForm from '../StudentForm';
import StudentStudyInfo from './ListStudentInfo';
import StudentPanelInfo from './ListStudyInfo';
import cn from './style.module.sass';

interface UserDataProps {
    first_name: string;
    last_name: string;
    middle_name: string;
    email: string;
    phone_number: string;
}

function StudentInfo() {
    const [users] = useFetchUsers();
    const [studentForm, setStudentForm] = useState(false);
    const [changePasswordForm, setChangePasswordForm] = useState(false);
    const [userData, setUserData] = useState<UserDataProps | null>(null);

    const updateUserData = (newUserData: UserDataProps) => {
        setUserData(newUserData);
    };

    const studentFormHandler = () => {
        setStudentForm(true);
    };

    const changeFormHandler = () => {
        setChangePasswordForm(true);
    };

    useEffect(() => {
        if (users) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setUserData(users);
        }
    }, [users]);

    return (
        <div className={cn.panelWrapper}>
            <div className={cn.panelTitles}>
                <h1>Информация о студенте</h1>
                {studentForm ? (
                    ''
                ) : (
                    <button className={cn.panelButton} onClick={studentFormHandler}>
                        Редактировать
                    </button>
                )}
            </div>
            <div className={cn.panelInfoStudent}>
                {studentForm ? (
                    <StudentForm
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        userData={userData}
                        updateUserData={updateUserData}
                        setStudentForm={setStudentForm}
                    />
                ) : (
                    <StudentStudyInfo userData={userData} />
                )}
            </div>
            <div className={cn.panelInfoStudy}>
                <StudentPanelInfo
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    userData={userData}
                />
            </div>
            <div className={cn.panelButtonText}>
                <h1>Пароль</h1>
                {changePasswordForm ? (
                    ''
                ) : (
                    <EmptyButton onClick={changeFormHandler} className={cn.panelButtonEmpty}>
                        Сменить пароль
                    </EmptyButton>
                )}
                {changePasswordForm ? (
                    <ChangePassword setChangePasswordForm={setChangePasswordForm} />
                ) : (
                    ''
                )}
            </div>
        </div>
    );
}

export default StudentInfo;
