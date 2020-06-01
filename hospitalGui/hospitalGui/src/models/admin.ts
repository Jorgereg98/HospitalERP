export interface IAdmin {
    id?: number;
    fname?: string;
    lname?: string;
    email?: string;
    status?: IStatus;
    password?: string;
}

export interface IStatus {
    data?: number[];
    type?: string;
}