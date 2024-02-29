import { Customer } from './customer/customer.entity';
import { Invoice } from './invoice/invoice.entity';
import { Project } from './project/project.entity';
export declare const EXAMPLE_CUSTOMER: Customer;
export declare const EXAMPLE_INVOICE: Invoice;
export declare const EXAMPLE_PROJECT: Project;
export declare const mockCustomerRepository: any;
export declare const mockInvoiceRepository: any;
export declare const mockProjectRepository: any;
export declare const mockDataSource: {
    transaction: any;
};
export declare const serviceMock: {
    findAll: any;
    findOne: any;
    createOne: any;
    updateOne: any;
    deleteOne: any;
};
export declare const invoiceServiceMock: {
    assignInvoiceToCustomer: any;
    assignInvoiceToProject: any;
    generateStornoInvoice: any;
    markInvociePaid: any;
    markInvoiceUnpaid: any;
    findAll: any;
    findOne: any;
    createOne: any;
    updateOne: any;
    deleteOne: any;
};
export declare const loggerMock: {
    log: any;
    error: any;
    warn: any;
    info: any;
    http: any;
};
