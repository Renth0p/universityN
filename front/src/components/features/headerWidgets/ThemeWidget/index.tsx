import Image from 'next/image';
import React from 'react';

import ThemeWidgetStyles from './style.module.sass';

function ThemeWidget() {
    return (
        <div className={ThemeWidgetStyles.themeToggleWrapper}>
            <Image
                src="/images/svg/themeLight.svg"
                width={30}
                height={30}
                alt="Light Theme Swith"
            />
            <label className={ThemeWidgetStyles.switchWrap}>
                <input type="checkbox" />
                <div className={ThemeWidgetStyles.switch} />
            </label>
            <Image src="/images/svg/themeDark.svg" width={30} height={30} alt="Light Theme Swith" />
        </div>
    );
}

export default ThemeWidget;
