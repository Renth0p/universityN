import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import { UseAuthForm } from '../../../hooks/useAuthnreficate';
import FullButton from '../../core/Buttons/FullButton';
import Input from '../../core/Input';
import cn from './style.module.sass';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const token = await UseAuthForm(email, password);
        if (token) {
            window.location.href = '/profile';
        } else {
            console.error(Error);
        }
    }

    return (
        <div className={cn.registerPage}>
            <Link className={cn.registerPageImg} href="/login">
                <Image src="/images/svg/logo.svg" width="352" height="68" alt="Logo" />
            </Link>
            <form className={cn.registerForm} onSubmit={handleRegister}>
                <h1 className={cn.registerFormTitle}>Авторизация</h1>
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
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </label>
                <div className={cn.registerFormButton}>
                    <FullButton type="submit">Войти</FullButton>
                </div>
            </form>
            <div className={cn.authHelp}>
                <div>
                    <p className={cn.authHelpText}>Вы студент и у вас еще нет аккаунта? </p>
                </div>
                <Link href="/registration" className={cn.authHelpLink}>
                    Зарегистрируйтесь
                </Link>
            </div>
        </div>
    );
}
