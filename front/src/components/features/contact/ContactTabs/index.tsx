import React, { useState } from 'react';

import AdminTab from './AdministrationTab';
import StudentTab from './StudentTab';
import cn from './style.module.sass';
import TeachersTab from './TeachersTab';

type TabType = 'student' | 'administration' | 'teachers';

function Tabs() {
    const [activeTab, setActiveTab] = useState<TabType>('student');

    const handleTabChange = (tab: TabType) => {
        setActiveTab(tab);
    };

    return (
        <div>
            <nav>
                <ul className={cn.tabsWrapper}>
                    <li>
                        <button
                            className={`${cn.buttonTab} ${
                                activeTab === 'teachers' ? cn.tabsActive : ''
                            }`}
                            onClick={() => handleTabChange('teachers')}
                        >
                            Преподователи
                        </button>
                    </li>
                    <li>
                        <button
                            className={`${cn.buttonTab} ${
                                activeTab === 'student' ? cn.tabsActive : ''
                            }`}
                            onClick={() => handleTabChange('student')}
                        >
                            Студенты
                        </button>
                    </li>
                    <li>
                        <button
                            className={`${cn.buttonTab} ${
                                activeTab === 'administration' ? cn.tabsActive : ''
                            }`}
                            onClick={() => handleTabChange('administration')}
                        >
                            Администрация
                        </button>
                    </li>
                </ul>
            </nav>
            <div>
                {activeTab === 'teachers' && <TeachersTab />}
                {activeTab === 'student' && <StudentTab />}
                {activeTab === 'administration' && <AdminTab />}
            </div>
        </div>
    );
}

export default Tabs;
