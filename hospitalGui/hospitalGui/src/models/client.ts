export interface IClient {
    Id?: number;
    Fname?: string;
    Lname?: string;
    Email?: string;
    Status?: IStatus;
    Phone?: string;
    Password?: string;
}

export interface IStatus {
    Data?: number[];
    Type?: string;
}