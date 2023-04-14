import Image from 'next/image';
import React from 'react';

import cn from './style.module.sass';

interface IPaginationProps {
    onPageChange: (pageNumber: number) => void;
    currentPage: number;
    lastPage: number;
}

function Pagination({ onPageChange, currentPage, lastPage }: IPaginationProps) {
    const handlePageChange = (pageNumber: number) => {
        if (pageNumber < 1 || pageNumber > lastPage) {
            return;
        }
        onPageChange(pageNumber);
    };

    const getPageNumbers = () => {
        const pageNumbers = [];
        const range = 4;
        const last = 3;
        const totalPages = lastPage;

        if (totalPages <= range * 2) {
            for (let i = 1; i <= totalPages; i += 1) {
                pageNumbers.push(i);
            }
        } else if (currentPage <= range) {
            for (let i = 1; i <= range * 2 + last; i += 1) {
                pageNumbers.push(i);
            }
            pageNumbers.push('...');
            pageNumbers.push(totalPages);
        } else if (currentPage >= totalPages - range) {
            pageNumbers.push(1);
            pageNumbers.push('...');
            for (let i = totalPages - range * 2; i <= totalPages; i += 1) {
                pageNumbers.push(i);
            }
        } else {
            pageNumbers.push(1);
            pageNumbers.push('...');
            for (let i = currentPage - range; i <= currentPage + range; i += 1) {
                pageNumbers.push(i);
            }
            pageNumbers.push('...');
            pageNumbers.push(totalPages);
        }
        return pageNumbers;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className={cn.pagination}>
            <button
                className={cn.paginationButton}
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
            >
                <Image
                    src="/images/svg/arrows/page-prev.svg"
                    width={24}
                    height={24}
                    alt="Profile"
                    className={currentPage === 1 ? `${cn.passiveIcon}` : ''}
                />
            </button>

            {pageNumbers.map(pageNumber => (
                <React.Fragment key={pageNumber}>
                    {pageNumber === '...' ? (
                        <span className={cn.paginationDots}>...</span>
                    ) : (
                        <button
                            className={`${cn.paginationButton} ${
                                currentPage === pageNumber ? `${cn.active}` : ''
                            }`}
                            onClick={() => handlePageChange(pageNumber as number)}
                        >
                            {pageNumber}
                        </button>
                    )}
                </React.Fragment>
            ))}

            <button
                className={cn.paginationButton}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === lastPage}
            >
                <Image
                    src="/images/svg/arrows/page-next.svg"
                    width={24}
                    height={24}
                    alt="Profile"
                    className={currentPage === lastPage ? `${cn.passiveIcon}` : ''}
                />
            </button>
        </div>
    );
}

export { Pagination };
