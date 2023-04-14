import axios from 'axios';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';

import TableRowType from '../types/TableRowType';

enum ContactType {
    Student = 'student',
    Teacher = 'lecturer',
    Admin = 'administration',
}

type ContactData = {
    data: TableRowType[];
    lastPage: number;
};

function useContactData(type: ContactType, currentPage: number): ContactData {
    const [tableData, setTableData] = useState<TableRowType[]>([]);
    const [lastPage, setLastPage] = useState(1);

    const cookies = parseCookies();
    const { token } = cookies;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get<{ data: TableRowType[]; meta: { last_page: number } }>(
                    `https://api.meatballs.w6p.ru/api/contacts/${type}?page=${currentPage}`,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setTableData(res.data.data);
                setLastPage(res.data.meta.last_page);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData().catch(e => console.error(e));
    }, [type, currentPage]);

    return { data: tableData, lastPage };
}

export { ContactType, useContactData };
