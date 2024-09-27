import {baseURL} from '../../constants/APIs';
import FetchWrapper from './FetchWrapper';
import {POLYGON_API_KEY} from '@env';

const defaultHeaders = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${POLYGON_API_KEY}`,
};

class TickersAPIHandler {
  private fetchWrapper = new FetchWrapper(
    baseURL + '/v3/reference/tickers',
    defaultHeaders,
  );

  getTickers = (limit: number): Promise<any> =>
    this.fetchWrapper.get(`?limit=${limit}`);

  getTickersPagination = (nexURL: string): Promise<any> =>
    this.fetchWrapper.get(`?${nexURL.split('?')?.[1]}`);

  getTickersByName = (name: string): Promise<any> =>
    this.fetchWrapper.get(`?search=${name}`);
}

export default new TickersAPIHandler();
