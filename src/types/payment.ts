export type PaymentState = 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'FAILED';

export interface Payment {
  id: string;
  state: PaymentState;
  currency: string;
  amount: number;
  updatedAt: string;
}