import {ActivityIndicator, FlatList, Text, TextInput, View} from 'react-native';
import Style from './Style';
import {useEffect, useRef, useState} from 'react';
import TickersAPIHandler from '../../data/apis/TickersAPIHandler';
import TickersResponse from '../../data/model/TickersResponse';
import Ticker from '../../data/model/Ticker';
import TickerListItem from '../../components/Ticker/TickerListItem';
import ErrorSnackBar from '../../components/ErrorSnackBar/ErrorSnackBar';
import SearchResultModal from '../../components/SearchResultModal/SearchResultModal';

type Props = {
  onHideSplashScreen: () => void;
};

const ExploreScreen = ({onHideSplashScreen}: Props) => {
  const [tickersList, setTickersList] = useState<Ticker[]>([]);
  const [paginationURL, setPaginationURL] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const onEndReachedCalledDuringMomentum = useRef(true);
  const [searchTxt, setSearchTxt] = useState<string>('');
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);

  const getTickersList = () => {
    TickersAPIHandler.getTickers(20)
      .then((response: TickersResponse) => {
        onHideSplashScreen();
        setTickersList(response.results);
        setPaginationURL(response?.next_url);
        setShowError(false);
      })
      .catch(e => {
        setShowError(true);
      });
  };

  const getTickersListPagination = () => {
    setLoading(true);
    TickersAPIHandler.getTickersPagination(paginationURL)
      .then((response: TickersResponse) => {
        setTickersList([...tickersList, ...response?.results]);
        setPaginationURL(response.next_url);
        setShowError(false);
      })
      .catch(e => {
        setShowError(true);
      })
      .finally(() => {
        setLoading(false);
        onEndReachedCalledDuringMomentum.current = true;
      });
  };

  useEffect(() => {
    getTickersList();
  }, []);

  const renderStock = ({index, item}: {index: number; item: Ticker}) => {
    return <TickerListItem ticker={item} />;
  };

  const onStocksListEndReached = () => {
    if (
      onEndReachedCalledDuringMomentum.current ||
      !paginationURL?.includes('?')
    )
      return;
    getTickersListPagination();
  };

  const onRetry = () => {
    if (paginationURL) getTickersListPagination();
    else getTickersList();
  };

  const onSubmitSearch = () => {
    setShowSearchResults(true);
  };

  const onHideSearchModal = () => {
    setShowSearchResults(false);
  };

  return (
    <View style={Style.container}>
      <Text style={Style.title}>Stocks</Text>
      <TextInput
        style={Style.input}
        onChangeText={setSearchTxt}
        value={searchTxt}
        placeholder="Search In Tickers"
        keyboardType="web-search"
        returnKeyLabel="search"
        onSubmitEditing={onSubmitSearch}
      />
      <FlatList
        testID="stocksList"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        numColumns={1}
        style={Style.stocksList}
        data={tickersList}
        renderItem={renderStock}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false;
        }}
        onEndReached={onStocksListEndReached}
      />
      {loading && (
        <ActivityIndicator
          testID="loadingIndicator"
          style={Style.loadingIndicator}
          animating={loading}
          size={'large'}
          color={'#FFF'}
        />
      )}
      <ErrorSnackBar showSnackBar={showError} onRetry={onRetry} />
      <SearchResultModal
        searchTxt={searchTxt}
        isModalVisible={showSearchResults}
        onHideModal={onHideSearchModal}
      />
    </View>
  );
};

export default ExploreScreen;
