import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Typography from '../../theme/Typography';
import Colors from '../../theme/Colors';
import {borderRadius, padding} from '../../constants/spacing';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import React from 'react';

type Props = {
  showSnackBar: boolean;
  onRetry: () => void;
};
const ErrorSnackBar = ({showSnackBar, onRetry}: Props) => {
  {
    return showSnackBar ? (
      <View style={Style.errorComponent}>
        <Text style={Style.errorMessage}>Error: Fetching Failed.</Text>
        <TouchableOpacity onPress={onRetry} testID="retryButton">
          <Text style={Style.retryTxt}>Retry</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View></View>
    );
  }
};

export default ErrorSnackBar;

const Style = StyleSheet.create({
  errorComponent: {
    flexDirection: 'row',
    paddingVertical: 3,
    paddingHorizontal: padding.small,
    marginHorizontal: padding.small,
    backgroundColor: Colors.warning,
    position: 'absolute',
    bottom: StaticSafeAreaInsets.safeAreaInsetsBottom,
    left: StaticSafeAreaInsets.safeAreaInsetsLeft,
    right: StaticSafeAreaInsets.safeAreaInsetsRight,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: borderRadius.base,
  },
  retryTxt: {
    fontSize: 15,
    color: Colors.textColor,
    borderRadius: borderRadius.small,
    backgroundColor: Colors.secondary,
    padding: padding.small,
    paddingHorizontal: padding.base,
  },
  errorMessage: {
    color: Colors.secondary,
    ...Typography.textMedium,
    width: '80%',
  },
});
