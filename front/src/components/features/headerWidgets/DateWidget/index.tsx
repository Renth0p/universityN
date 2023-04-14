import 'moment/locale/ru';

import moment from 'moment';
import React, { useEffect, useState } from 'react';

import cn from './style.module.sass';

function DateWidget() {
    const [dateOfDay, setDateOfDay] = useState('');
    const [dateOfWeek, setDateOfWeek] = useState('');

    useEffect(() => {
        moment.locale('ru');
        setDateOfDay(moment().format('DD.MM.YYYY'));
        setDateOfWeek(moment().format('dddd'));
    }, []);

    return (
        <div className={cn.dateWidgetWrapper}>
            <a className={cn.dateWidgetDate}>{dateOfDay}</a>
            <span className={cn.dateWidgetWeek}>{dateOfWeek}</span>
        </div>
    );
}

export default DateWidget;
