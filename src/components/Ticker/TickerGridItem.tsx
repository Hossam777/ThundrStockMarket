import React from 'react';
import Style from './Style';
import {Text, TouchableOpacity, View} from 'react-native';
import Ticker from '../../data/model/Ticker';

type Props = {
  ticker: Ticker;
};
const TickerGridItem = ({ticker}: Props) => {
  return (
    <View style={Style.cardView}>
      <TouchableOpacity activeOpacity={0.9} style={Style.cardContainer}>
        <Text style={Style.title}>Name: {ticker?.name}</Text>
        <Text style={Style.secondaryTxt}>Active: {ticker.active}</Text>
        <Text style={Style.secondaryTxt}>Currency: {ticker.currency_name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TickerGridItem;
