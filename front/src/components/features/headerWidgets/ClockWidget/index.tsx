import React, { useEffect, useState } from 'react';

import cn from './style.module.sass';

function ClockWidget() {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const [correctTime, setCorrectTime] = useState(time);

    useEffect(() => {
        const updateTime = () => {
            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setCorrectTime(time);
        };

        const updateTimeSet = 1000;

        setInterval(updateTime, updateTimeSet);
    });

    return <p className={cn.clockWidgetText}>{correctTime}</p>;
}

export default ClockWidget;
