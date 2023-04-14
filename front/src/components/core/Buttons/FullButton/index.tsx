import React from 'react';

import cn from './style.module.sass';

interface FullButtonProps {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    type?: 'button' | 'submit' | 'reset';
}

function FullButton(props: FullButtonProps) {
    const { children } = props;
    return (
        <button className={cn.fullButton} {...props}>
            {children}
        </button>
    );
}

export default FullButton;
