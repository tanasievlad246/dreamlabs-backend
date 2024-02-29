import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateCustomerInput } from './dto/update-customer.input';

describe('CustomerService', () => {
  let service: CustomerService;

  // Mock repository with example values
  const EXAMPLE_CUSTOMER = {
    id: '1',
    name: 'John Doe',
    invoices: [], // Assuming invoices is an array of invoice entities
  };

  const mockRepository = jest.fn(() => ({
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: getRepositoryToken(Customer),
          useFactory: mockRepository,
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
      mockRepository().findOne.mockResolvedValue(null);

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
      mockRepository().findOne.mockResolvedValue(initialCustomer);
      mockRepository().merge.mockReturnValue(expectedUpdatedCustomer);

      const result = await service.updateOne('1', update as UpdateCustomerInput);
      console.log(result);
      expect(result).toEqual(expectedUpdatedCustomer);
    });

    it('should throw NotFoundException if customer to update is not found', async () => {
      mockRepository().findOne.mockResolvedValue(null);

      await expect(service.updateOne('non-existing', {} as UpdateCustomerInput)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
