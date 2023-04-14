import React from 'react';

import cn from './style.module.sass';

interface UserDataProps {
    first_name: string;
    last_name: string;
    middle_name: string;
    email: string;
    phone_number: string;
}

interface StudentStudyInfoProps {
    userData: UserDataProps | undefined | null;
}

function StudentStudyInfo({ userData }: StudentStudyInfoProps) {
    return (
        <ul className={cn.panelInfoStudentList}>
            <li className={cn.panelInfoStudentItem}>
                <p className={cn.panelInfoStudentTitle}>Фамилия</p>
                <p className={cn.panelInfoStudentDesc}>{userData?.first_name ?? '-'}</p>
            </li>
            <li className={cn.panelInfoStudentItem}>
                <p className={cn.panelInfoStudentTitle}>Имя</p>
                <p className={cn.panelInfoStudentDesc}>{userData?.last_name ?? '-'}</p>
            </li>
            <li className={cn.panelInfoStudentItem}>
                <p className={cn.panelInfoStudentTitle}>Отчество</p>
                <p className={cn.panelInfoStudentDesc}>{userData?.middle_name ?? '-'}</p>
            </li>
            <li className={cn.panelInfoStudentItem}>
                <p className={cn.panelInfoStudentTitle}>E-mail</p>
                <p className={cn.panelInfoStudentDesc}>{userData?.email ?? '-'}</p>
            </li>
            <li className={cn.panelInfoStudentItem}>
                <p className={cn.panelInfoStudentTitle}>Телефон</p>
                <p className={cn.panelInfoStudentDesc}>{userData?.phone_number ?? '-'}</p>
            </li>
        </ul>
    );
}

export default StudentStudyInfo;
