export interface Ticket {
  _id?: string;
  title: string;
  request: string;
  status: 'open' | 'closed';
}
