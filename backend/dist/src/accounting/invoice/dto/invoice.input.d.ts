import Currency from '@/common/enums/currency.enum';
export declare class CreateInvoiceInput {
    description?: string;
    amount: number;
    currency: Currency;
    customerId: string;
    projectId: string;
    paymentDate: string;
}
