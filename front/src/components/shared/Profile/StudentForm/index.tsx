import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';

import { apiFetch } from '../../../../axios/global';
import EmptyButton from '../../../core/Buttons/EmptyButton';
import FullButton from '../../../core/Buttons/FullButton';
import Input from '../../../core/Input';
import cn from './style.module.sass';

interface UserDataProps {
    first_name: string;
    last_name: string;
    middle_name: string;
    email: string;
    phone_number: string;
}

interface UpdateUserData {
    (data: UserDataProps): void;
}

interface StudentFormProp {
    userData: UserDataProps;
    setStudentForm: (b: boolean) => void;
    updateUserData: UpdateUserData;
}

function StudentForm({ setStudentForm, userData, updateUserData }: StudentFormProp) {
    const [firstName, setFirstName] = useState(userData?.first_name || '');
    const [lastName, setLastName] = useState(userData?.last_name || '');
    const [middleName, setMiddleName] = useState(userData?.middle_name || '');
    const [email, setEmail] = useState(userData?.email || '');
    const [phoneNumber, setPhone] = useState(userData?.phone_number || '');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_originalUserData, setOriginalUserData] = useState<UserDataProps>({ ...userData });

    const cookies = parseCookies();
    const { token } = cookies;

    useEffect(() => {
        setOriginalUserData({ ...userData });
    }, [userData]);

    const handleSubmit = async () => {
        try {
            const res = await apiFetch(`/profile/change/info`, {
                method: 'patch',
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    middle_name: middleName,
                    email,
                    phone_number: phoneNumber,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.status === 200) {
                setStudentForm(false);
                updateUserData({
                    first_name: firstName,
                    last_name: lastName,
                    middle_name: middleName,
                    email,
                    phone_number: phoneNumber,
                });
                setOriginalUserData({
                    first_name: firstName,
                    last_name: lastName,
                    middle_name: middleName,
                    email,
                    phone_number: phoneNumber,
                });
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <form className={cn.studentForm} onSubmit={e => e.preventDefault()}>
            <label className={cn.studentFormLabel}>
                Фамилия
                <Input
                    type="text"
                    placeholder={userData?.first_name}
                    value={firstName}
                    onChange={event => setFirstName(event.target.value)}
                />
            </label>
            <label className={cn.studentFormLabel}>
                Имя
                <Input
                    type="text"
                    placeholder={userData?.last_name}
                    value={lastName}
                    onChange={event => setLastName(event.target.value)}
                />
            </label>
            <label className={cn.studentFormLabel}>
                Отчество
                <Input
                    type="text"
                    placeholder={userData?.middle_name}
                    value={middleName}
                    onChange={event => setMiddleName(event.target.value)}
                />
            </label>
            <label className={cn.studentFormLabel}>
                E-mail
                <Input
                    type="email"
                    placeholder={userData?.email}
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
            </label>
            <label className={cn.studentFormLabel}>
                Телефон
                <Input
                    type="phone"
                    placeholder={userData?.phone_number}
                    value={phoneNumber}
                    onChange={event => setPhone(event.target.value)}
                />
            </label>
            <div className={cn.studentFormButtons}>
                <FullButton style={{ width: '230px', marginRight: '30px' }} onClick={handleSubmit}>
                    Сохранить изменения
                </FullButton>
                <EmptyButton
                    onClick={() => {
                        setStudentForm(false);
                    }}
                >
                    Отмена
                </EmptyButton>
            </div>
        </form>
    );
}

export default StudentForm;
