export interface IEmployee {
    id?: number;
    fname?: string;
    lname?: string;
    email?: string;
    status?: IStatus;
    phone?: string;
    password?: string;
    area?: string;
}

export interface IStatus {
    data?: number[];
    type?: string;
}