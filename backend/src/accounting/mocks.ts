import { Customer } from './customer/customer.entity';
import { Invoice } from './invoice/invoice.entity';
import { Project } from './project/project.entity';

export const EXAMPLE_CUSTOMER: Customer = {
  id: '1',
  name: 'John Doe',
  invoices: [],
};

export const EXAMPLE_INVOICE: Invoice = {
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

export const EXAMPLE_PROJECT: Project = {
  id: '1',
  name: 'Test Project',
  invoices: [],
};

export const mockCustomerRepository = jest.fn(() => ({
  create: jest.fn().mockImplementation((customer) => customer),
  save: jest
    .fn()
    .mockImplementation((customer) =>
      Promise.resolve({ ...EXAMPLE_CUSTOMER, ...customer }),
    ),
  find: jest.fn().mockResolvedValue([EXAMPLE_CUSTOMER]),
  findOne: jest.fn().mockImplementation(({ where: { id } }) => {
    if (id === EXAMPLE_CUSTOMER.id) {
      return Promise.resolve(EXAMPLE_CUSTOMER);
    } else {
      return Promise.resolve(null);
    }
  }),
  delete: jest.fn().mockResolvedValue({ affected: 1 }),
  merge: jest.fn().mockImplementation((currentCustomer, updatedCustomer) => {
    return { ...currentCustomer, ...updatedCustomer };
  }),
}));

export const mockInvoiceRepository = jest.fn(() => ({
  create: jest.fn().mockImplementation((invoice) => invoice),
  save: jest
    .fn()
    .mockImplementation((invoice) =>
      Promise.resolve({ ...EXAMPLE_INVOICE, ...invoice }),
    ),
  find: jest.fn().mockResolvedValue([EXAMPLE_INVOICE]),
  findOne: jest.fn().mockImplementation(({ where: { id } }) => {
    if (id === EXAMPLE_INVOICE.id) {
      return Promise.resolve(EXAMPLE_INVOICE);
    } else {
      return Promise.resolve(null);
    }
  }),
  delete: jest.fn().mockResolvedValue({ affected: 1 }),
  merge: jest.fn().mockImplementation((currentInvoice, updatedInvoice) => {
    return { ...currentInvoice, ...updatedInvoice };
  }),
}));

export const mockProjectRepository = jest.fn(() => ({
  create: jest.fn().mockImplementation((project) => project),
  save: jest
    .fn()
    .mockImplementation((project) =>
      Promise.resolve({ ...EXAMPLE_PROJECT, ...project }),
    ),
  find: jest.fn().mockResolvedValue([EXAMPLE_PROJECT]),
  findOne: jest.fn().mockImplementation(({ where: { id } }) => {
    if (id === EXAMPLE_PROJECT.id) {
      return Promise.resolve(EXAMPLE_PROJECT);
    } else {
      return Promise.resolve(null);
    }
  }),
  delete: jest.fn().mockResolvedValue({ affected: 1 }),
  merge: jest.fn().mockImplementation((currentProject, updatedProject) => {
    return { ...currentProject, ...updatedProject };
  }),
}));

const mockManager = {
  getRepository: jest.fn().mockImplementation(() => mockInvoiceRepository()),
};

export const mockDataSource = {
  transaction: jest
    .fn()
    .mockImplementation((operation) => operation(mockManager)),
};

export const serviceMock = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  createOne: jest.fn(),
  updateOne: jest.fn(),
  deleteOne: jest.fn(),
  addInvoice: jest.fn(),
};

export const invoiceServiceMock = {
  ...serviceMock,
  assignInvoiceToCustomer: jest.fn(),
  assignInvoiceToProject: jest.fn(),
  generateStornoInvoice: jest.fn(),
  markInvociePaid: jest.fn(),
  markInvoiceUnpaid: jest.fn(),
};

export const loggerMock = {
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  http: jest.fn(),
};
