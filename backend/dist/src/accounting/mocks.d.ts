/// <reference types="jest" />
import { Customer } from './customer/customer.entity';
import { Invoice } from './invoice/invoice.entity';
import { Project } from './project/project.entity';
export declare const EXAMPLE_CUSTOMER: Customer;
export declare const EXAMPLE_INVOICE: Invoice;
export declare const EXAMPLE_PROJECT: Project;
export declare const mockCustomerRepository: jest.Mock<{
    create: jest.Mock<any, any, any>;
    save: jest.Mock<any, any, any>;
    find: jest.Mock<any, any, any>;
    findOne: jest.Mock<any, any, any>;
    delete: jest.Mock<any, any, any>;
    merge: jest.Mock<any, any, any>;
}, [], any>;
export declare const mockInvoiceRepository: jest.Mock<{
    create: jest.Mock<any, any, any>;
    save: jest.Mock<any, any, any>;
    find: jest.Mock<any, any, any>;
    findOne: jest.Mock<any, any, any>;
    delete: jest.Mock<any, any, any>;
    merge: jest.Mock<any, any, any>;
}, [], any>;
export declare const mockProjectRepository: jest.Mock<{
    create: jest.Mock<any, any, any>;
    save: jest.Mock<any, any, any>;
    find: jest.Mock<any, any, any>;
    findOne: jest.Mock<any, any, any>;
    delete: jest.Mock<any, any, any>;
    merge: jest.Mock<any, any, any>;
}, [], any>;
export declare const mockDataSource: {
    transaction: jest.Mock<any, any, any>;
};
export declare const serviceMock: {
    findAll: jest.Mock<any, any, any>;
    findOne: jest.Mock<any, any, any>;
    createOne: jest.Mock<any, any, any>;
    updateOne: jest.Mock<any, any, any>;
    deleteOne: jest.Mock<any, any, any>;
};
export declare const invoiceServiceMock: {
    assignInvoiceToCustomer: jest.Mock<any, any, any>;
    assignInvoiceToProject: jest.Mock<any, any, any>;
    generateStornoInvoice: jest.Mock<any, any, any>;
    markInvociePaid: jest.Mock<any, any, any>;
    markInvoiceUnpaid: jest.Mock<any, any, any>;
    findAll: jest.Mock<any, any, any>;
    findOne: jest.Mock<any, any, any>;
    createOne: jest.Mock<any, any, any>;
    updateOne: jest.Mock<any, any, any>;
    deleteOne: jest.Mock<any, any, any>;
};
export declare const loggerMock: {
    log: jest.Mock<any, any, any>;
    error: jest.Mock<any, any, any>;
    warn: jest.Mock<any, any, any>;
    info: jest.Mock<any, any, any>;
    http: jest.Mock<any, any, any>;
};
