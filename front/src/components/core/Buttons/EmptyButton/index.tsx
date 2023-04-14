import React from 'react';

import cn from './style.module.sass';

interface EmptyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    style?: { [key: string]: string | number };
}
function EmptyButton(props: EmptyButtonProps) {
    const { children, onClick } = props;
    return (
        <button onClick={onClick} className={cn.emptyButton} {...props}>
            {children}
        </button>
    );
}

export default EmptyButton;
