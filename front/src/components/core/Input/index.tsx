import React, { ChangeEvent } from 'react';

import cn from './style.module.sass';

interface InputProps {
    style?: React.CSSProperties;
    type?: string;
    placeholder?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    maxLength?: number;
    required?: boolean;
}

function Input(props: InputProps) {
    const { type } = props;
    return <input type={type} className={cn.input} {...props} />;
}

export default Input;
