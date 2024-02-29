import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceService } from './invoice.service';
import { mockDataSource, mockInvoiceRepository, serviceMock } from '../mocks';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Invoice } from './invoice.entity';
import { CreateInvoiceInput } from './dto/invoice.input';
import { CustomerService } from '../customer/customer.service';
import { ProjectService } from '../project/project.service';
import { DataSource } from 'typeorm';
import { UpdateInvoiceInput } from './dto/update-invoice-input';
import { NotFoundException } from '@nestjs/common';

describe('InvoiceService', () => {
  let service: InvoiceService;
  let customerService: CustomerService;
  let projectService: ProjectService;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoiceService,
        { provide: CustomerService, useValue: serviceMock },
        { provide: ProjectService, useValue: serviceMock },
        { provide: DataSource, useValue: mockDataSource },
        {
          provide: getRepositoryToken(Invoice),
          useFactory: mockInvoiceRepository,
        },
      ],
    }).compile();

    service = module.get<InvoiceService>(InvoiceService);
    customerService = module.get<CustomerService>(CustomerService);
    projectService = module.get<ProjectService>(ProjectService);
    dataSource = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOne', () => {
    it('should successfully create an invoice', async () => {
      const invoiceInput = {
        amount: 100,
      };
      const expectedSavedInvoice = {
        id: 1,
        ...invoiceInput,
      };

      const result = await service.createOne(
        invoiceInput as CreateInvoiceInput,
      );
      expect(result.id).toEqual(expectedSavedInvoice.id);
      expect(result.amount).toEqual(expectedSavedInvoice.amount);
      expect(result.storno).toEqual(null);
      expect(result.project).toEqual(null);
      expect(result.customer).toEqual(null);
    });
  });

  describe('assignInvoiceToProject', () => {
    it('should successfully assign an invoice to a project', async () => {
      const assignInvoiceToProjectInput = {
        invoiceId: 1,
        projectId: '1',
      };
      const expectedAssignedInvoice = {
        id: 1,
        amount: 100,
        project: {
          id: '1',
          name: 'Test Project',
          invoices: [],
        },
        customer: null,
        storno: null,
      };
      const project = {
        id: '1',
        name: 'Test Project',
        invoices: [],
      };

      jest
        .spyOn(projectService, 'findOne')
        .mockImplementation(async () => project);

      const result = await service.assignInvoiceToProject(
        assignInvoiceToProjectInput,
      );

      expect(result.id).toEqual(expectedAssignedInvoice.id);
      expect(result.amount).toEqual(expectedAssignedInvoice.amount);
      expect(result.storno).toEqual(expectedAssignedInvoice.storno);
      expect(result.project).toEqual(expectedAssignedInvoice.project);
      expect(result.customer).toEqual(expectedAssignedInvoice.customer);
    });
  });

  describe('assignInvoiceToCustomer', () => {
    it('should successfully assign an invoice to a customer', async () => {
      const assignInvoiceToCustomerInput = {
        invoiceId: 1,
        customerId: '1',
      };
      const expectedAssignedInvoice = {
        id: 1,
        amount: 100,
        customer: {
          id: '1',
          name: 'Test Customer',
          invoices: [],
        },
        storno: null,
      };
      const customer = {
        id: '1',
        name: 'Test Customer',
        invoices: [],
      };

      jest
        .spyOn(customerService, 'findOne')
        .mockImplementation(async () => customer);

      const result = await service.assignInvoiceToCustomer(
        assignInvoiceToCustomerInput,
      );

      expect(result.id).toEqual(expectedAssignedInvoice.id);
      expect(result.amount).toEqual(expectedAssignedInvoice.amount);
      expect(result.storno).toEqual(expectedAssignedInvoice.storno);
      expect(result.customer).toEqual(expectedAssignedInvoice.customer);
    });
  });

  describe('deleteOne', () => {
    it('should delete an invoice and return affected result', async () => {
      const result = await service.deleteOne(1);
      expect(result).toEqual({ affected: 1 });
    });
  });

  describe('updateOne', () => {
    it('should update an invoice and return the updated entity', async () => {
      const initialInvoice = {
        id: 1,
        amount: 100,
      };
      const update = { amount: 200 };
      const expectedUpdatedInvoice = {
        id: 1,
        amount: 200,
      };
      mockInvoiceRepository().findOne.mockResolvedValue(initialInvoice);
      mockInvoiceRepository().merge.mockReturnValue(expectedUpdatedInvoice);

      const result = await service.updateOne(1, update as UpdateInvoiceInput);
      expect(result.amount).toEqual(expectedUpdatedInvoice.amount);
    });

    it('should throw NotFoundException if invoice to update is not found', async () => {
      mockInvoiceRepository().findOne.mockResolvedValue(null);

      await expect(
        service.updateOne(0, {} as UpdateInvoiceInput),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return a single invoice', async () => {
      const expectedInvoice = {
        id: 1,
        amount: 100,
      };

      const result = await service.findOne(1);
      expect(result.id).toEqual(expectedInvoice.id);
      expect(result.amount).toEqual(expectedInvoice.amount);
    });

    it('should throw NotFoundException if invoice is not found', async () => {
      mockInvoiceRepository().findOne.mockResolvedValue(null);

      await expect(service.findOne(0)).rejects.toThrow(NotFoundException);
    });
  });

  describe('markInvociePaid', () => {
    it('should mark an invoice as paid', async () => {
      const expectedInvoice = {
        id: 1,
        amount: 100,
        isPaid: true,
      };

      const result = await service.markInvociePaid(1);
      expect(result.id).toEqual(expectedInvoice.id);
      expect(result.amount).toEqual(expectedInvoice.amount);
      expect(result.isPaid).toEqual(expectedInvoice.isPaid);
    });
  });

  describe('markInvoiceUnpaid', () => {
    it('should mark an invoice as unpaid', async () => {
      const expectedInvoice = {
        id: 1,
        amount: 100,
        isPaid: false,
      };

      const result = await service.markInvoiceUnpaid(1);
      expect(result.id).toEqual(expectedInvoice.id);
      expect(result.amount).toEqual(expectedInvoice.amount);
      expect(result.isPaid).toEqual(expectedInvoice.isPaid);
    });
  });

  describe('generateStornoInvoice', () => {
    it('should generate a storno invoice', async () => {
      const expectedStornoInvoice: Invoice = {
        id: 2,
        amount: -100,
        description: 'Storno of invoice 1',
        storno: null,
        currency: '',
        paymentTerm: undefined,
        isPaid: false,
        customer: null,
        project: null,
      };
      const invoice: Invoice = {
        id: 1,
        amount: 100,
        description: '',
        storno: null,
        currency: '',
        paymentTerm: undefined,
        isPaid: false,
        customer: null,
        project: null,
      };

      mockInvoiceRepository().findOne.mockResolvedValue(invoice);
      mockInvoiceRepository().create.mockReturnValue(expectedStornoInvoice);

      const result = await service.generateStornoInvoice(1);
      expect(result.id).toBeLessThan(expectedStornoInvoice.id);
      expect(result.amount).toEqual(expectedStornoInvoice.amount);
    });
  });
});
