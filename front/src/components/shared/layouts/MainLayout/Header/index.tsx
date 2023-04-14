import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import Menu from '../../../../../../public/images/icons/Menu.svg';
import logo from '../../../../../../public/images/svg/logo.svg';
import ClockWidget from '../../../../features/headerWidgets/ClockWidget';
import DateWidget from '../../../../features/headerWidgets/DateWidget';
import cn from './style.module.sass';

interface LinkData {
    id: number;
    linkName: string;
    link: string;
}

const dataLink: { data: LinkData[] } = {
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

function Header() {
    const [showLinks, setShowLinks] = useState(false);

    const handleToggleMenu = () => {
        setShowLinks(!showLinks);
    };

    return (
        <nav className={cn.navbar}>
            <div className={cn.navbarWrapper}>
                <Link href="/" className={cn.navbarLink}>
                    {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
                    <Image src={logo} alt="Logo" />
                </Link>
                <button className={cn.navbarBurger} onClick={handleToggleMenu}>
                    {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
                    <Image src={Menu} alt="Menu" />
                </button>
                <div className={`${cn.navbarLinks} ${showLinks ? cn.navbarLinksActive : ''}`}>
                    <ul className={cn.navbarList}>
                        {dataLink.data.map(e => (
                            <li className={cn.navbarItem} key={e.id}>
                                <Link href={`${e.link ?? '#'}`} className={cn.navbarLink}>
                                    {e.linkName}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={cn.navbarWidgets}>
                    <div>
                        <ClockWidget />
                    </div>
                    <div className={cn.navbarWidgetsDate}>
                        <DateWidget />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;
