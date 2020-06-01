export interface IClient {
    id?: number;
    fname?: string;
    lname?: string;
    email?: string;
    status?: IStatus;
    phone?: string;
    password?: string;
}

export interface IStatus {
    data?: number[];
    type?: string;
}