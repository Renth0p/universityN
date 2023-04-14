import Image from 'next/image';
import React, { useState } from 'react';

import cn from './style.module.sass';

interface ImgButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    imageName: string;
    typeContent: 'date' | 'file' | 'text';
    typeWindow?: string;
    setSelectedDate?: (date: string) => void;
    setSelectedTime?: (time: string) => void;
    handleFileSelect?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
function ImgButton({
    children,
    imageName,
    typeContent,
    typeWindow,
    setSelectedDate,
    setSelectedTime,
    handleFileSelect,
    ...props
}: ImgButtonProps) {
    const [click, setClick] = useState(false);

    const handleDateSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (setSelectedDate) {
            setSelectedDate(event.target.value);
        }
    };

    const handleTimeSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (setSelectedTime) {
            setSelectedTime(event.target.value);
        }
    };

    const handlerContentOpen = () => {
        setClick(true);
    };

    const handlerContentFalse = () => {
        setClick(false);
    };

    let content = null;
    switch (typeContent) {
        case 'date':
            content = (
                <div>
                    <input type="date" onChange={handleDateSelect} />
                    <input type="time" onChange={handleTimeSelect} />
                </div>
            );
            break;
        case 'file':
            content = <input type="file" onChange={handleFileSelect} />;
            break;
        case 'text':
            content = (
                <select value={typeWindow}>
                    <option value="Открыто">Открыто</option>
                    <option value="В работе">Закрыто</option>
                    <option value="Завершено">Выполнено</option>
                </select>
            );
            break;
        default:
            break;
    }

    return (
        <>
            {click ? (
                <div className={cn.imgButtonContent}>
                    <button onClick={handlerContentFalse}>Закрыть</button>
                    {content}
                </div>
            ) : (
                <button className={cn.imgButton} {...props} onClick={handlerContentOpen}>
                    <Image
                        src={`/images/svg/button/${imageName}.svg`}
                        width={24}
                        height={24}
                        alt="Icon"
                    />
                    {children}
                </button>
            )}
        </>
    );
}

export default ImgButton;
