export enum OrderType {
    ASC = 'asc',
    DESC = 'desc',
}

export interface PostsParams {
    page: number;
    perPage: number;
}

export interface LoginParams {
    email: string;
    password: string;
}
