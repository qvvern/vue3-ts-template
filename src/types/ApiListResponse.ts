export interface ApiListResponse<T> {
    count: number;
    next: number;
    previous: string;
    results: T[];
}
