import React from 'react';

import Footer from './Footer';
import Header from './Header';
import SideBar from './SideBar';
import cn from './style.module.sass';

type Props = {
    children: React.ReactNode;
};

function Layout({ children }: Props) {
    return (
        <div className={cn.container}>
            <Header />
            <main className={cn.mainContent}>
                <div
                    className={cn.mainContentInner}
                    style={{ height: '100%', overflowY: 'scroll' }}
                >
                    {children}
                </div>
            </main>
            <SideBar />
            <Footer />
        </div>
    );
}

export default Layout;
