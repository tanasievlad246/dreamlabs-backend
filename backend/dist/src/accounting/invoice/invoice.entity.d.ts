import { Customer } from '../customer/customer.entity';
import { Project } from '../project/project.entity';
export declare class Invoice {
    id: number;
    description: string;
    storno: Invoice;
    amount: number;
    currency: string;
    paymentTerm: Date;
    isPaid: boolean;
    customer: Customer;
    project: Project;
}
