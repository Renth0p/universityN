import Image from 'next/image';
import React, { useState } from 'react';

import { ContactType, useContactData } from '../../../../../hooks/useFetchStudentData';
import { Pagination } from '../../../../core/Pagination';
import ContactTable from '../../ContactTable';
import cn from './style.module.sass';

export default function AdminTab() {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('ASC');
    const { data: AdminData, lastPage } = useContactData(ContactType.Admin, currentPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleSortChange = () => {
        if (sortBy === 'ASC') {
            setSortBy('DESC');
        } else {
            setSortBy('ASC');
        }
    };

    const sortedData = AdminData.sort((a, b) => {
        const nameA = a.last_name.toUpperCase();
        const nameB = b.last_name.toUpperCase();

        if (sortBy === 'ASC') {
            return nameA.localeCompare(nameB);
        }
        return nameB.localeCompare(nameA);
    });

    const renderTableRows = () =>
        sortedData.map(row => (
            <tr className={cn.tableRow} key={row.id}>
                <td className={cn.tableRowImage}>
                    <Image
                        src={
                            row.img === null
                                ? '/images/profile/profile-empty.svg'
                                : `${row.img as string}`
                        }
                        width={60}
                        height={60}
                        alt="Profile"
                    />
                    <div className={cn.tableRowText}>
                        <p className={cn.tableRowName}>{`${row.first_name} ${row.last_name}`}</p>
                        <p className={cn.tableRowPost}>{row.post?.post}</p>
                    </div>
                </td>
                <td>
                    <a className={cn.tableRowPhone} href={`tel:${row.phone_number}`}>
                        {row.phone_number}
                    </a>
                </td>
                <td className={cn.tableRowName}>
                    <a className={cn.tableRowEmail} href={`mailto:${row.email}`}>
                        {row.email}
                    </a>
                </td>
            </tr>
        ));

    return (
        <>
            <ContactTable
                /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
                // @ts-ignore
                renderTableRows={renderTableRows}
                handleSortChange={handleSortChange}
                sortBy={sortBy}
                setSortBy={setSortBy}
                tableType="student"
            />
            <Pagination
                currentPage={currentPage}
                onPageChange={handlePageChange}
                lastPage={lastPage}
            />
        </>
    );
}
