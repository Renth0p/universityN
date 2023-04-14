import React, { KeyboardEvent } from 'react';

import styles from './style.module.sass';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface ModalWithChildrenProps extends ModalProps {
    children: React.ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalWithChildrenProps): JSX.Element | null {
    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === 'Escape') {
            onClose();
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.modal}>
            <button
                className={styles.overlay}
                onClick={onClose}
                onKeyDown={handleKeyDown}
                type="button"
            >
                Закрыть
            </button>
            <div className={styles.content}>{children}</div>
        </div>
    );
}

export default Modal;
