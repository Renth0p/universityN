import React from 'react';

import cn from './style.module.sass';

interface ProfilePanelsProps {
    typeCase: string;
}

interface PanelData {
    title?: string;
    subTitle?: string;
    score?: number;
    links?: object;
}

function ProfilePanels({ typeCase }: ProfilePanelsProps) {
    let data: PanelData = {};

    switch (typeCase) {
        case 'case':
            data = {
                title: 'Средний бал',
                subTitle: 'за последнюю сессию',
                score: 4.75,
            };
            break;
        case 'service':
            data = {
                title: 'Сервисы',
                links: {
                    linkOne: 'Сервис БРС',
                    linkTwo: 'Написать преподавателю',
                    linkThree: 'Справочник студента',
                },
            };
            break;
        default:
            break;
    }

    const linksArray = data?.links ? Object.entries(data.links) : [];

    return (
        <div className={cn.ProfilePanel}>
            <p className={cn.ProfilePanelTitle}>{data?.title}</p>
            <p className={cn.ProfilePanelSubTitle}>{data?.subTitle}</p>
            <p className={cn.ProfilePanelScore}>{data?.score}</p>
            <ul style={{ margin: '0', padding: '0' }}>
                {linksArray.map(([key, value]) => (
                    <li key={key} className={cn.ProfilePanelLink}>
                        {value}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProfilePanels;
