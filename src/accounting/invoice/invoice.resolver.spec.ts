import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceResolver } from './invoice.resolver';
import { InvoiceService } from './invoice.service';
import { invoiceServiceMock } from '../mocks';
import { CreateInvoiceInput } from './dto/invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice-input';

describe('InvoiceResolver', () => {
  let resolver: InvoiceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoiceResolver,
        {
          provide: InvoiceService,
          useValue: invoiceServiceMock,
        },
      ],
    }).compile();

    resolver = module.get<InvoiceResolver>(InvoiceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return an array of invoices', async () => {
    const result = [
      { id: '1', amount: 100, project: null, customer: null, storno: null },
    ];
    jest.spyOn(invoiceServiceMock, 'findAll').mockImplementation(async () => result);

    expect(await resolver.findAllInvoices()).toBe(result);
  });

  it('should return a single invoice', async () => {
    const result = {
      id: 1,
      amount: 100,
      project: null,
      customer: null,
      storno: null,
    };
    jest.spyOn(invoiceServiceMock, 'findOne').mockImplementation(async () => result);

    expect(await resolver.findOneInvoice({ id: 1 })).toBe(result);
  });

  it('should create an invoice', async () => {
    const result = {
      id: 1,
      amount: 100,
      project: null,
      customer: null,
      storno: null,
    };
    jest.spyOn(invoiceServiceMock, 'createOne').mockImplementation(async () => result);

    expect(
      await resolver.createInvoice({ amount: 100 } as CreateInvoiceInput),
    ).toBe(result);
  });

  it('should update an invoice', async () => {
    const result = {
      id: 1,
      amount: 100,
      project: null,
      customer: null,
      storno: null,
    };
    jest.spyOn(invoiceServiceMock, 'updateOne').mockImplementation(async () => result);

    expect(
      await resolver.updateOneInvoice({
        id: 1,
        amount: 100,
      } as UpdateInvoiceInput),
    ).toBe(result);
  });

  it('should delete an invoice', async () => {
    jest.spyOn(invoiceServiceMock, 'deleteOne').mockImplementation(async () => true);
    console.log(await resolver.deleteOneInvoice({ id: 1 }))
    expect(await resolver.deleteOneInvoice({ id: 1 })).toBe(true);
  });

  it('should mark an invoice as paid', async () => {
    const result = {
      id: 1,
      amount: 100,
      project: null,
      customer: null,
      storno: null,
    };
    jest
      .spyOn(invoiceServiceMock, 'markInvociePaid')
      .mockImplementation(async () => result);

    expect(await resolver.markOneInvoiceAsPaid({ id: 1 })).toBe(result);
  });

  it('should mark an invoice as unpaid', async () => {
    const result = {
      id: 1,
      amount: 100,
      project: null,
      customer: null,
      storno: null,
    };
    jest
      .spyOn(invoiceServiceMock, 'markInvoiceUnpaid')
      .mockImplementation(async () => result);

    expect(await resolver.markOneInvoiceAsUnpaid({ id: 1 })).toBe(result);
  });

  it('should generate a storno invoice', async () => {
    const result = {
      id: 1,
      amount: -100,
      project: null,
      customer: null,
      storno: null,
    };
    jest
      .spyOn(invoiceServiceMock, 'generateStornoInvoice')
      .mockImplementation(async () => result);

    expect(await resolver.generateOneStornoInvoice({ id: 1 })).toBe(result);
  });
});
