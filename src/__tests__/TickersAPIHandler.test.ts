import TickersAPIHandler from '../data/apis/TickersAPIHandler';
import FetchWrapper from '../data/apis/FetchWrapper';
import {POLYGON_API_KEY} from '@env';
import {baseURL} from '../constants/APIs';
import TickersResponseMock from './mocks/TickersResponseMock';

const defaultHeaders = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${POLYGON_API_KEY}`,
};

jest.mock('../data/apis/FetchWrapper');

describe('TickersAPIHandler', () => {
  let fetchWrapperMock: jest.Mocked<FetchWrapper>;

  beforeEach(() => {
    jest.clearAllMocks();

    fetchWrapperMock = new (FetchWrapper as jest.Mock)(
      baseURL + '/v3/reference/tickers',
      defaultHeaders,
    ) as jest.Mocked<FetchWrapper>;

    fetchWrapperMock.get = jest.fn();
    (TickersAPIHandler as any).fetchWrapper = fetchWrapperMock;
  });

  it('should fetch tickers with limit', async () => {
    const mockResponse = TickersResponseMock;
    (fetchWrapperMock.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    const limit = 10;
    const result = await TickersAPIHandler.getTickers(limit);

    expect(result).toEqual(mockResponse);
    expect(fetchWrapperMock.get).toHaveBeenCalledWith(`?limit=${limit}`);
  });

  it('should fetch tickers by name', async () => {
    const mockResponse = {data: []};
    (fetchWrapperMock.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    const name = 'Tesla';
    const result = await TickersAPIHandler.getTickersByName(name);

    expect(fetchWrapperMock.get).toHaveBeenCalledWith(`?search=${name}`);
    expect(result).toEqual(mockResponse);
  });
});
