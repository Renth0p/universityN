import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import { UseRegisterForm } from '../../../hooks/useAuthnreficate';
import FullButton from '../../core/Buttons/FullButton';
import Input from '../../core/Input';
import cn from './style.module.sass';

export default function RegisterForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [recordBook, setRecordBook] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const token = await UseRegisterForm(firstName, lastName, email, recordBook, password);
        if (token) {
            window.location.href = '/profile';
        } else {
            console.error(Error);
        }
    }

    return (
        <div className={cn.registerPage}>
            <Link className={cn.registerPageImg} href="/registration">
                <Image src="/images/svg/logo.svg" width="352" height="68" alt="Logo" />
            </Link>
            <form className={cn.registerForm} onSubmit={handleRegister}>
                <h1 className={cn.registerFormTitle}>Регистрация</h1>
                <label className={cn.registerLabel}>
                    Имя*
                    <Input
                        type="text"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        required
                    />
                </label>
                <label className={cn.registerLabel}>
                    Фамилия*
                    <Input
                        type="text"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        required
                    />
                </label>
                <label className={cn.registerLabel}>
                    Номер зачетной книжки*
                    <Input
                        onChange={e => setRecordBook(e.target.value)}
                        value={recordBook}
                        type="text"
                        placeholder="АА-АААА11-11"
                        maxLength={12}
                        required
                    />
                </label>
                <label className={cn.registerLabel}>
                    E-mail*
                    <Input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label className={cn.registerLabel}>
                    Пароль
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <button onClick={handleTogglePassword} className={cn.showPassword}>
                        {showPassword ? (
                            <Image
                                src="/images/icons/view.svg"
                                width={24}
                                height={24}
                                alt="View Password"
                            />
                        ) : (
                            <Image
                                src="/images/icons/not-view.svg"
                                width={24}
                                height={24}
                                alt="View Password"
                            />
                        )}
                    </button>
                </label>
                <div className={cn.registerFormButton}>
                    <FullButton type="submit" style={{ width: '200px' }}>
                        Зарегистрироваться
                    </FullButton>
                </div>
            </form>
        </div>
    );
}
