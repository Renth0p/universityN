interface postUser {
    post: {
        post: string;
    };
}

interface infoUser {
    info: {
        faculty: Array<string>;
        education: null | string;
        group: null | string;
        record_book: null | string;
    };
}

interface subjectUser {
    subject: {
        subject: string;
    };
}
interface UserData {
    info: {
        record_book: string;
    };
    first_name: string;
    last_name: string;
    img: string;
    prevState: null;
    data: {
        id: number;
        first_name: string;
        last_name: string;
        middle_name: string;
        email: string;
        string: string;
        img: string;
        post: postUser;
        subject: subjectUser;
        info: infoUser;
    };
}

export type { UserData };
