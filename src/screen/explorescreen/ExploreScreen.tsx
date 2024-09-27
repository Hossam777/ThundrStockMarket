import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Style from './Style';
import {useEffect, useRef, useState} from 'react';
import TickersAPIHandler from '../../data/apis/TickersAPIHandler';
import TickersResponse from '../../data/model/TickersResponse';
import Ticker from '../../data/model/Ticker';
import TickerGridItem from '../../components/Ticker/TickerGridItem';
import ErrorSnackBar from '../../components/ErrorSnackBar/ErrorSnackBar';

type Props = {
  onHideSplashScreen: () => void;
};

const ExploreScreen = ({onHideSplashScreen}: Props) => {
  const [tickersList, setTickersList] = useState<Ticker[]>([]);
  const [paginationURL, setPaginationURL] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(true);
  const onEndReachedCalledDuringMomentum = useRef(true);

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
    return <TickerGridItem ticker={item} />;
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

  return (
    <View style={Style.container}>
      <Text style={Style.title}>Stocks</Text>
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
      <ErrorSnackBar showSnackBar={true} onRetry={onRetry} />
    </View>
  );
};

export default ExploreScreen;
