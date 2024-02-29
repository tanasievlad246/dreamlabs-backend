import { Test, TestingModule } from '@nestjs/testing';
import { CustomerResolver } from './customer.resolver';
import { serviceMock as customerServiceMock, loggerMock } from '../mocks';
import { CustomerService } from './customer.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { DeleteResult } from 'typeorm';

describe('CustomerResolver', () => {
  let resolver: CustomerResolver;
  let customerService: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerResolver,
        { provide: CustomerService, useValue: customerServiceMock },
        { provide: WINSTON_MODULE_PROVIDER, useValue: loggerMock },
      ],
    }).compile();

    resolver = module.get<CustomerResolver>(CustomerResolver);
    customerService = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return an array of customers', async () => {
    const result = [{ id: '1', name: 'Test Customer', invoices: [] }]; // Mock response
    jest
      .spyOn(customerService, 'findAll')
      .mockImplementation(async () => result);

    expect(await resolver.findAllCustomers()).toBe(result);
  });

  it('should return a single customer', async () => {
    const result = { id: '1', name: 'Test Customer', invoices: [] }; // Mock response
    jest
      .spyOn(customerService, 'findOne')
      .mockImplementation(async () => result);

    expect(await resolver.findOneCustomer({ id: '1' })).toBe(result);
  });

  it('should create a customer', async () => {
    const result = { id: '1', name: 'Test Customer', invoices: [] }; // Mock response
    jest
      .spyOn(customerService, 'createOne')
      .mockImplementation(async () => result);

    expect(await resolver.createCustomer({ name: 'Test Customer' })).toBe(
      result,
    );
  });

  it('should update a customer', async () => {
    const result = { id: '1', name: 'Test Customer', invoices: [] }; // Mock response
    jest
      .spyOn(customerService, 'updateOne')
      .mockImplementation(async () => result);

    expect(
      await resolver.updateCustomer({ id: '1', name: 'Test Customer' }),
    ).toBe(result);
  });

  it('should delete a customer', async () => {
    jest
      .spyOn(customerService, 'deleteOne')
      .mockImplementation(async () => ({ affected: 1 }) as DeleteResult);

    expect(await resolver.deleteOneCustomer({ id: '1' })).toBe(true);
  });

  it('should return false if deleteOne fails', async () => {
    jest
      .spyOn(customerService, 'deleteOne')
      .mockImplementation(async () => ({ affected: 0 }) as DeleteResult);

    expect(await resolver.deleteOneCustomer({ id: '1' })).toBe(false);
  });

  it('should update a customer', async () => {
    const result = { id: '1', name: 'Test Customer', invoices: [] }; // Mock response
    jest
      .spyOn(customerService, 'updateOne')
      .mockImplementation(async () => result);

    expect(
      await resolver.updateCustomer({ id: '1', name: 'Test Customer' }),
    ).toBe(result);
  });
});
