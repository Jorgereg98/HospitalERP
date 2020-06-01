export interface IAdmin {
    Id?: number;
    Fname?: string;
    Lname?: string;
    Email?: string;
    Status?: IStatus;
    Password?: string;
}

export interface IStatus {
    Data?: number[];
    Type?: string;
}