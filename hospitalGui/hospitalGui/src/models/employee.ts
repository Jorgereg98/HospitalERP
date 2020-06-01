export interface IEmployee {
    Id?: number;
    Fname?: string;
    Lname?: string;
    Email?: string;
    Status?: IStatus;
    Phone?: string;
    Password?: string;
    Area?: string;
}

export interface IStatus {
    Data?: number[];
    Type?: string;
}