type TableRowType = {
    row: string | number;
    id: number;
    first_name: string;
    last_name: string;
    middle_name: string;
    email: string;
    phone_number: number;
    img: string | undefined;
    post: {
        post: string;
    };
    subject: {
        subject: string;
    };
    info: {
        faculty: string[];
        education: string[];
        group: string[];
        record_book: string;
    };
};

export default TableRowType;
