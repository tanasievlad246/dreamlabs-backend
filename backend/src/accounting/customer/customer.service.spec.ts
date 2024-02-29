import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { mockCustomerRepository } from '../mocks';

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: getRepositoryToken(Customer),
          useFactory: mockCustomerRepository,
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOne', () => {
    it('should successfully create a customer', async () => {
      const customerInput = { name: 'John Doe' };
      const expectedSavedCustomer = { id: '1', ...customerInput, invoices: [] };

      const result = await service.createOne(customerInput);
      expect(result).toEqual(expectedSavedCustomer);
    });
  });

  describe('findOne', () => {
    it('should return a single customer', async () => {
      const expectedCustomer = { id: '1', name: 'John Doe', invoices: [] };

      const result = await service.findOne('1');
      expect(result).toEqual(expectedCustomer);
    });

    it('should throw NotFoundException if customer is not found', async () => {
      mockCustomerRepository().findOne.mockResolvedValue(null);

      await expect(service.findOne('non-existing')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteOne', () => {
    it('should delete a customer and return affected result', async () => {
      const result = await service.deleteOne('1');
      expect(result).toEqual({ affected: 1 });
    });
  });

  describe('updateOne', () => {
    it('should update a customer and return the updated entity', async () => {
      const initialCustomer = { id: '1', name: 'John Doe', invoices: [] };
      const update = { name: 'Jane Doe' };
      const expectedUpdatedCustomer = { ...initialCustomer, ...update };
      mockCustomerRepository().findOne.mockResolvedValue(initialCustomer);
      mockCustomerRepository().merge.mockReturnValue(expectedUpdatedCustomer);

      const result = await service.updateOne('1', update as UpdateCustomerInput);
      console.log(result);
      expect(result).toEqual(expectedUpdatedCustomer);
    });

    it('should throw NotFoundException if customer to update is not found', async () => {
      mockCustomerRepository().findOne.mockResolvedValue(null);

      await expect(service.updateOne('non-existing', {} as UpdateCustomerInput)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
