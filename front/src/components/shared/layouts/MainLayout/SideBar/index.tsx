import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import React, { useEffect, useState } from 'react';

import useFetchUsers from '../../../../../hooks/useFormFetch';
import { UserData } from '../../../../../types/UserDataType';
import cn from './style.module.sass';

const dataLink = {
    data: [
        {
            id: 0,
            linkName: 'Раписание',
            link: '/timetable',
        },
        {
            id: 1,
            linkName: 'Учебные материалы',
            link: '/educationMaterial',
        },
        {
            id: 2,
            linkName: 'Мои проекты',
            link: '/projects',
        },
        {
            id: 3,
            linkName: 'Контакты',
            link: '/contacts',
        },
        {
            id: 4,
            linkName: 'Профиль',
            link: '/profile',
        },
    ],
};

function SideBar() {
    const router = useRouter();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [users] = useFetchUsers();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useEffect(() => setUserData(users), [users]);
    const removeCookieHandler = () => {
        destroyCookie(null, 'token', { path: '/' });
        router.push('/login').catch(error => {
            console.error('Error occurred while navigating to login page:', error);
        });
    };

    const isActiveLink = (href: string): boolean => router.pathname === href;

    return (
        <aside className={cn.sidebar}>
            <ul className={cn.navbarList} style={{ order: 1 }}>
                {dataLink.data.map(e => (
                    <li className={cn.navbarItem} key={e.id}>
                        <Link
                            className={`${cn.navbarLink} ${
                                isActiveLink(e.link) ? cn.navbarLinkActive : ''
                            }`}
                            href={`${e.link ?? '#'}`}
                        >
                            {e.linkName}
                        </Link>
                    </li>
                ))}
            </ul>
            <ul className={cn.navbarBottom} style={{ order: 2 }}>
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
                <Image
                    className={cn.navbarBottomImg}
                    src={userData?.img ? `${userData.img}` : '/images/profile/profile-empty.svg'}
                    width={64}
                    height={64}
                    alt="Logo"
                />
                <Link href="/profile" className={cn.navbarBottomName}>
                    {userData?.first_name} {userData?.last_name}
                </Link>
                <p className={cn.navbarBottomDesc}>
                    № зачётной книжки:
                    {userData?.info?.record_book === null
                        ? ' Отсуствует'
                        : userData?.info?.record_book}
                </p>
                <button onClick={removeCookieHandler} className={cn.navbarBottomBtn}>
                    Выйти
                </button>
            </ul>
        </aside>
    );
}

export default SideBar;
