"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMock = exports.invoiceServiceMock = exports.serviceMock = exports.mockDataSource = exports.mockProjectRepository = exports.mockInvoiceRepository = exports.mockCustomerRepository = exports.EXAMPLE_PROJECT = exports.EXAMPLE_INVOICE = exports.EXAMPLE_CUSTOMER = void 0;
exports.EXAMPLE_CUSTOMER = {
    id: '1',
    name: 'John Doe',
    invoices: [],
};
exports.EXAMPLE_INVOICE = {
    id: 1,
    amount: 100,
    customer: null,
    project: null,
    storno: null,
    description: 'Test Invoice',
    currency: 'USD',
    paymentTerm: undefined,
    isPaid: false,
};
exports.EXAMPLE_PROJECT = {
    id: '1',
    name: 'Test Project',
    invoices: [],
};
exports.mockCustomerRepository = jest.fn(() => ({
    create: jest.fn().mockImplementation((customer) => customer),
    save: jest
        .fn()
        .mockImplementation((customer) => Promise.resolve({ ...exports.EXAMPLE_CUSTOMER, ...customer })),
    find: jest.fn().mockResolvedValue([exports.EXAMPLE_CUSTOMER]),
    findOne: jest.fn().mockImplementation(({ where: { id } }) => {
        if (id === exports.EXAMPLE_CUSTOMER.id) {
            return Promise.resolve(exports.EXAMPLE_CUSTOMER);
        }
        else {
            return Promise.resolve(null);
        }
    }),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
    merge: jest.fn().mockImplementation((currentCustomer, updatedCustomer) => {
        return { ...currentCustomer, ...updatedCustomer };
    }),
}));
exports.mockInvoiceRepository = jest.fn(() => ({
    create: jest.fn().mockImplementation((invoice) => invoice),
    save: jest
        .fn()
        .mockImplementation((invoice) => Promise.resolve({ ...exports.EXAMPLE_INVOICE, ...invoice })),
    find: jest.fn().mockResolvedValue([exports.EXAMPLE_INVOICE]),
    findOne: jest.fn().mockImplementation(({ where: { id } }) => {
        if (id === exports.EXAMPLE_INVOICE.id) {
            return Promise.resolve(exports.EXAMPLE_INVOICE);
        }
        else {
            return Promise.resolve(null);
        }
    }),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
    merge: jest.fn().mockImplementation((currentInvoice, updatedInvoice) => {
        return { ...currentInvoice, ...updatedInvoice };
    }),
}));
exports.mockProjectRepository = jest.fn(() => ({
    create: jest.fn().mockImplementation((project) => project),
    save: jest
        .fn()
        .mockImplementation((project) => Promise.resolve({ ...exports.EXAMPLE_PROJECT, ...project })),
    find: jest.fn().mockResolvedValue([exports.EXAMPLE_PROJECT]),
    findOne: jest.fn().mockImplementation(({ where: { id } }) => {
        if (id === exports.EXAMPLE_PROJECT.id) {
            return Promise.resolve(exports.EXAMPLE_PROJECT);
        }
        else {
            return Promise.resolve(null);
        }
    }),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
    merge: jest.fn().mockImplementation((currentProject, updatedProject) => {
        return { ...currentProject, ...updatedProject };
    }),
}));
const mockManager = {
    getRepository: jest.fn().mockImplementation(() => (0, exports.mockInvoiceRepository)()),
};
exports.mockDataSource = {
    transaction: jest
        .fn()
        .mockImplementation((operation) => operation(mockManager)),
};
exports.serviceMock = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    createOne: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
};
exports.invoiceServiceMock = {
    ...exports.serviceMock,
    assignInvoiceToCustomer: jest.fn(),
    assignInvoiceToProject: jest.fn(),
    generateStornoInvoice: jest.fn(),
    markInvociePaid: jest.fn(),
    markInvoiceUnpaid: jest.fn(),
};
exports.loggerMock = {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    http: jest.fn(),
};
//# sourceMappingURL=mocks.js.map