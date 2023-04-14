import { ChangeEvent, useEffect, useState } from 'react';

interface FileValidationState {
    isValid: boolean;
    errorMessage: string;
    imageUrl: string;
}

function useFileValidation(): [
    File | null,
    FileValidationState,
    (event: ChangeEvent<HTMLInputElement>) => void
] {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileValidation, setFileValidation] = useState<FileValidationState>({
        isValid: false,
        errorMessage: '',
        imageUrl: '',
    });
    const [fileType, setFileType] = useState('');
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
            const fileType = event.target.files[0].type;
            if (fileType.startsWith('image/png')) {
                setFileType('image');
            } else if (fileType.startsWith('image/jpeg')) {
                setFileType('image');
            } else {
                setFileType('file');
            }
        }
    };

    useEffect(() => {
        const validateSelectedFile = () => {
            const MIN_FILE_SIZE = 1024; // 1MB
            const MAX_FILE_SIZE = 5120; // 5MB

            if (!selectedFile) {
                setFileValidation({ isValid: false, errorMessage: '', imageUrl: '' });
                return;
            }

            const fileSizeKiloBytes = selectedFile.size / MIN_FILE_SIZE;

            if (fileSizeKiloBytes > MAX_FILE_SIZE) {
                setFileValidation({
                    isValid: false,
                    errorMessage: 'Ваш файл слишком большой!',
                    imageUrl: '',
                });
            } else if (fileType === 'image') {
                const reader = new FileReader();
                reader.onload = () => {
                    setFileValidation({
                        isValid: true,
                        errorMessage: '',
                        imageUrl: reader.result as string,
                    });
                };
                reader.readAsDataURL(selectedFile);
            } else if (fileType === 'file') {
                setFileValidation({
                    isValid: false,
                    errorMessage: 'Фотография должна быть формата .PNG!',
                    imageUrl: '',
                });
            } else if (fileType === 'video') {
                setFileValidation({
                    isValid: false,
                    errorMessage: 'Фотография должна быть формата .PNG!',
                    imageUrl: '',
                });
            }
        };
        validateSelectedFile();
    }, [selectedFile]);

    return [selectedFile, fileValidation, handleFileChange];
}

export default useFileValidation;
