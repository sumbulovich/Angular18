export interface Ticket {
  id: number;
  title: string;
  request: string;
  status: 'open' | 'closed';
}
