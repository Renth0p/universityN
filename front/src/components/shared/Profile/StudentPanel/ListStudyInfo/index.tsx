import React from 'react';

import cn from './style.module.sass';

interface StudentInfo {
    faculty?: string[];
    education?: string[];
    group?: string[];
    record_book?: string;
}

interface UserDataProps {
    id: number;
    first_name: string;
    last_name: string;
    middle_name: string;
    email: string;
    phone_number: string;
    img: string | null;
    post: {
        post: string;
    };
    subject: {
        subject: string;
    };
    info: StudentInfo;
}

interface StudentPanelInfo {
    userData: UserDataProps;
}

function StudentPanelInfo({ userData }: StudentPanelInfo) {
    return (
        <ul className={cn.panelInfoStudyList}>
            <li className={cn.panelInfoStudyItem}>
                <p className={cn.panelInfoStudyTitle}>Факультет</p>
                <p className={cn.panelInfoStudyDesc}>{userData?.info?.faculty?.[0] ?? '-'}</p>
            </li>
            <li className={cn.panelInfoStudyItem}>
                <p className={cn.panelInfoStudyTitle}>Форма обучения</p>
                <p className={cn.panelInfoStudyDesc}>{userData?.info?.education?.[0] ?? '-'}</p>
            </li>
            <li className={cn.panelInfoStudyItem}>
                <p className={cn.panelInfoStudyTitle}>Группа</p>
                <p className={cn.panelInfoStudyDesc}>{userData?.info?.group?.[0] ?? '-'}</p>
            </li>
            <li className={cn.panelInfoStudyItem}>
                <p className={cn.panelInfoStudyTitle}>№ зачётной книжки</p>
                <p className={cn.panelInfoStudyDesc}>{userData?.info?.record_book?.[0] ?? '-'}</p>
            </li>
        </ul>
    );
}

export default StudentPanelInfo;
