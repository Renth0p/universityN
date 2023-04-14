import { useRouter } from 'next/router';
import { destroyCookie, parseCookies } from 'nookies';
import React, { useState } from 'react';

import { apiFetch } from '../../../../axios/global';
import EmptyButton from '../../../core/Buttons/EmptyButton';
import FullButton from '../../../core/Buttons/FullButton';
import Input from '../../../core/Input';
import cn from './style.module.sass';

interface ChangePasswordProps {
    setChangePasswordForm(b: boolean): void;
}

function ChangePassword({ setChangePasswordForm }: ChangePasswordProps) {
    const router = useRouter();
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
    const [messageError, setMessageError] = useState<string>('');
    function closeForm(): void {
        setChangePasswordForm(false);
    }

    const cookies = parseCookies();
    const { token } = cookies;

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        event.preventDefault();
        if (newPassword === confirmNewPassword) {
            if (newPassword !== oldPassword) {
                try {
                    const res = await apiFetch('/profile/change/password', {
                        method: 'patch',
                        data: { old_password: oldPassword, new_password: newPassword },
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (res.status === 200) {
                        setChangePasswordForm(false);
                        destroyCookie(null, 'token', { path: '/' });
                        router.push('/login').catch(error => {
                            console.error('Error occurred while navigating to login page:', error);
                        });
                    }
                } catch (error) {
                    console.error(error);
                }
            } else {
                setMessageError('Ваш старый пароль совпадает с новым.');
            }
        } else {
            setMessageError('Ваш пароли не совпадают.');
        }
    };

    return (
        <form className={cn.changePassword}>
            <label className={cn.changePasswordLabel}>
                <Input
                    type="password"
                    placeholder="Старый пароль"
                    onChange={e => setOldPassword(e.target.value)}
                    value={oldPassword}
                />
            </label>
            <label className={cn.changePasswordLabel}>
                <Input
                    type="password"
                    placeholder="Новый пароль"
                    onChange={e => setNewPassword(e.target.value)}
                    value={newPassword}
                />
            </label>
            <label className={cn.changePasswordLabel}>
                <Input
                    type="password"
                    placeholder="Повторите пароль"
                    onChange={e => setConfirmNewPassword(e.target.value)}
                    value={confirmNewPassword}
                />
            </label>
            <p>{messageError}</p>
            <div className={cn.changePasswordButtons}>
                <FullButton
                    type="submit"
                    onClick={handleSubmit}
                    style={{ width: '230px', marginRight: '30px' }}
                >
                    Сохранить изменения
                </FullButton>
                {/* eslint-disable-next-line react/jsx-no-bind */}
                <EmptyButton type="submit" onClick={closeForm}>
                    Отмена
                </EmptyButton>
            </div>
        </form>
    );
}

export default ChangePassword;
