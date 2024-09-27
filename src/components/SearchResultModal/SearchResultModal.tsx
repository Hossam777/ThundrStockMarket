import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {borderRadius, padding} from '../../constants/spacing';
import ReactNativeModal from 'react-native-modal';
import Colors from '../../theme/Colors';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import Typography from '../../theme/Typography';
import {useEffect, useRef, useState} from 'react';
import Ticker from '../../data/model/Ticker';
import TickersAPIHandler from '../../data/apis/TickersAPIHandler';
import TickersResponse from '../../data/model/TickersResponse';
import TickerListItem from '../Ticker/TickerListItem';

type Props = {
  searchTxt: string;
  isModalVisible: boolean;
  onHideModal: () => void;
};

const SearchResultModal = ({searchTxt, isModalVisible, onHideModal}: Props) => {
  const [tickersList, setTickersList] = useState<Ticker[]>([]);
  const [paginationURL, setPaginationURL] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const onEndReachedCalledDuringMomentum = useRef(true);

  const getTickersListPagination = () => {
    setLoading(true);
    TickersAPIHandler.getTickersPagination(paginationURL)
      .then((response: TickersResponse) => {
        setTickersList([...tickersList, ...response?.results]);
        setPaginationURL(response.next_url);
      })
      .finally(() => {
        setLoading(false);
        onEndReachedCalledDuringMomentum.current = true;
      });
  };

  const onDismiss = () => {
    onHideModal();
  };

  useEffect(() => {
    if (isModalVisible && searchTxt) {
      setLoading(true);
      TickersAPIHandler.getTickersByName(searchTxt)
        .then((response: TickersResponse) => {
          setTickersList(response.results);
          setPaginationURL(response?.next_url);
        })
        .finally(() => {
          setLoading(false);
        });
    } else setTickersList([]);
  }, [isModalVisible, searchTxt]);

  const onStocksListEndReached = () => {
    if (
      onEndReachedCalledDuringMomentum.current ||
      !paginationURL?.includes('?')
    )
      return;
    getTickersListPagination();
  };

  const renderStock = ({index, item}: {index: number; item: Ticker}) => {
    return <TickerListItem ticker={item} />;
  };

  return (
    <ReactNativeModal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={400}
      animationOutTiming={400}
      isVisible={isModalVisible}
      style={Style.modalContainer}
      backdropColor={Colors.grey}
      backdropOpacity={0.5}
      swipeDirection={null}
      onDismiss={onDismiss}
      onBackButtonPress={onDismiss}
      onBackdropPress={onDismiss}>
      <View style={Style.modalContent}>
        <View style={Style.header}>
          <Text style={Style.title}>Stocks</Text>
          <TouchableOpacity onPress={onDismiss}>
            <Image source={require('../../assets/Icons/close.png')} />
          </TouchableOpacity>
        </View>

        {tickersList?.length == 0 && !loading ? (
          <View style={Style.resultView}>
            <Text style={Style.noResultTxt}>No Results Found</Text>
          </View>
        ) : (
          <View style={Style.resultView}>
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
          </View>
        )}
      </View>
    </ReactNativeModal>
  );
};

export default SearchResultModal;

const Style = StyleSheet.create({
  modalContainer: {
    flex: 1,
    margin: 0,
  },
  modalContent: {
    flex: 1,
    backgroundColor: Colors.primary,
    marginTop: StaticSafeAreaInsets.safeAreaInsetsTop + 100,
    paddingBottom: StaticSafeAreaInsets.safeAreaInsetsBottom,
    borderTopEndRadius: borderRadius.base,
    borderTopStartRadius: borderRadius.base,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: padding.base,
  },
  title: {
    paddingVertical: padding.base,
    color: Colors.secondary,
    ...Typography.screenTitle,
    marginTop: padding.small,
  },
  loadingIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  resultView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultTxt: {
    color: Colors.secondary,
    ...Typography.textMedium,
  },
  stocksList: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: padding.small,
  },
});
