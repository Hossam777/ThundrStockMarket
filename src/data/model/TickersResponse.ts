import Ticker from './Ticker';

export default interface TickersResponse {
  status: string;
  request_id: string;
  count: number;
  next_url: string;
  results: Ticker[];
}
