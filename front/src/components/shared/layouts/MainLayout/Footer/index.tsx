import React from 'react';

import cn from './style.module.sass';

function Footer() {
    return (
        <footer className={cn.footer}>
            <div className={cn.footerWrapper}>
                <div className={cn.footerCards}>
                    <div className={cn.footerCard}>
                        <p className={cn.footerCardTitle}>Отдел помощи студентам</p>
                        <a className={cn.footerCardPhone} href="tel:798632381566">
                            +7 (863) 238-15-66
                        </a>
                        <a
                            className={cn.footerCardEmail}
                            href="mailto:center-prof-abitur@donstu.ru"
                        >
                            center-prof-abitur@donstu.ru
                        </a>
                    </div>
                    <div className={cn.footerCard}>
                        <p className={cn.footerCardTitle}>Заказ справок</p>
                        <a className={cn.footerCardPhone} href="tel:798632381566">
                            +7 (863) 238-15-66
                        </a>
                        <a className={cn.footerCardEmail} href="mailto:spravki@donstu.ru">
                            spravki@donstu.ru
                        </a>
                    </div>
                    <div className={cn.footerCard}>
                        <p className={cn.footerCardTitle}>Секретариат</p>
                        <a className={cn.footerCardPhone} href="tel:798632381566">
                            +7 (863) 238-15-66
                        </a>
                        <a
                            className={cn.footerCardEmail}
                            href="mailto:center-prof-abitur@donstu.ru"
                        >
                            center-prof-abitur@donstu.ru
                        </a>
                    </div>
                </div>
                <div className={cn.footerAsign}>
                    <a href="#">г. Ростов-на-Дону, ул. Абрикосовая, 105/42</a>
                    <p>© Университет N</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
