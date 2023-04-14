import { useEffect, useState } from 'react';

import { getProfile } from '../axios/global';
import { UserData } from '../types/UserDataType';

const useFetchUsers = (): [UserData[], boolean] => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const res: boolean = await getProfile();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                setUsers(res.data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers().catch(e => console.error(e));
    }, []);

    return [users, isLoading];
};

export default useFetchUsers;
