import { MenuItem } from "./menuInterface";

export interface Order {
    id: number;
    client: string;
    products: MenuItem[];
    status: string;
    dateEntry: string;
    mesa: string;
    currentTime: any;
}

export interface OrderPending {
    id: number;
    client: string;
    mesa: string;
    products: MenuItem[];
    status: string;
    dateEntry: string;
}