import { Invoice } from '../invoice/invoice.entity';
export declare class Customer {
    id: string;
    name: string;
    invoices: Invoice[];
}
