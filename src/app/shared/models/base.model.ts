export interface Base {
    id?: string;
    active?: boolean;
    restricted?: boolean;
    createdDate?: number | any;
    createdBy?: string;
    lastModifiedDate?: number | any;
    lastModifiedBy?: string;
    deleted?: boolean;
}