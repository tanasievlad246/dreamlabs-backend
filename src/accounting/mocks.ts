export const mockRepository = jest.fn(() => ({
  find: jest.fn().mockResolvedValue([]),
  findOne: jest.fn().mockResolvedValue({}),
  save: jest.fn().mockResolvedValue({}),
  delete: jest.fn().mockResolvedValue(undefined),
}));
