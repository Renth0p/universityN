import Image from 'next/image';
import React from 'react';

import cn from './style.module.sass';

type SortBy = {
    field: string;
    order: 'asc' | 'desc';
};

interface Props {
    renderTableRows: () => JSX.Element;
    tableType: 'student' | 'teacher';
    sortBy: boolean | string;
    handleSortChange: (sort: SortBy) => void;
}

const three = 3;

function ContactTable({ renderTableRows, tableType, handleSortChange, sortBy }: Props) {
    const columns =
        tableType === 'student'
            ? ['Имя', 'Телефон', 'Почта']
            : ['Имя', 'Предмет', 'Телефон', 'Почта'];

    return (
        <table className={cn.table}>
            <thead>
                {columns.length === three ? (
                    <tr>
                        <th className={cn.tableFirstValue}>
                            Имя
                            <button
                                className={cn.ButtonFilter}
                                onClick={() =>
                                    handleSortChange({
                                        field: 'name',
                                        order: sortBy === 'ASC' ? 'desc' : 'asc',
                                    })
                                }
                            >
                                {sortBy === 'ASC' ? (
                                    <Image
                                        src="/images/svg/sort/sort-neact.svg"
                                        width={22}
                                        height={22}
                                        alt="Profile"
                                    />
                                ) : (
                                    <Image
                                        src="/images/svg/sort/sort-act.svg"
                                        width={22}
                                        height={22}
                                        alt="Profile"
                                    />
                                )}
                            </button>
                        </th>
                        <th>Телефон</th>
                        <th>Почта</th>
                    </tr>
                ) : (
                    <tr>
                        <th className={cn.tableFirstValue}>
                            Имя
                            <button
                                className={cn.ButtonFilter}
                                onClick={() =>
                                    handleSortChange({
                                        field: 'name',
                                        order: sortBy === 'ASC' ? 'desc' : 'asc',
                                    })
                                }
                            >
                                {sortBy === 'ASC' ? (
                                    <Image
                                        src="/images/svg/sort/sort-neact.svg"
                                        width={22}
                                        height={22}
                                        alt="Profile"
                                    />
                                ) : (
                                    <Image
                                        src="/images/svg/sort/sort-act.svg"
                                        width={22}
                                        height={22}
                                        alt="Profile"
                                    />
                                )}
                            </button>
                        </th>
                        <th>Предмет</th>
                        <th>Телефон</th>
                        <th>Почта</th>
                    </tr>
                )}
            </thead>
            <tbody>{renderTableRows()}</tbody>
        </table>
    );
}

export default ContactTable;
