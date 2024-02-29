export const EXAMPLE_CUSTOMER = {
  id: '1',
  name: 'John Doe',
  invoices: [], // Assuming invoices is an array of invoice entities
};

export const mockRepository = jest.fn(() => ({
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

// export const customerServiceMock = jest.fn(() => ({
//   findAll: jest.fn().mockResolvedValue([EXAMPLE_CUSTOMER]),
//   findOne: jest.fn().mockResolvedValue(EXAMPLE_CUSTOMER),
//   createOne: jest
//     .fn()
//     .mockImplementation((customer) =>
//       Promise.resolve({ ...EXAMPLE_CUSTOMER, ...customer }),
//     ),
//   updateOne: jest
//     .fn()
//     .mockImplementation((id, updatedCustomer) =>
//       Promise.resolve({ ...EXAMPLE_CUSTOMER, ...updatedCustomer }),
//     ),
//   deleteOne: jest.fn().mockResolvedValue({ affected: 1 }),
// }));

export const customerServiceMock = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  createOne: jest.fn(),
  updateOne: jest.fn(),
  deleteOne: jest.fn().mockRejectedValue({ affected: 1 }),
};

export const loggerMock = {
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  http: jest.fn(),
};
