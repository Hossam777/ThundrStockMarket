import {StyleSheet} from 'react-native';
import Typography from '../../theme/Typography';
import Colors from '../../theme/Colors';
import {borderRadius, padding} from '../../constants/spacing';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';

const Style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  title: {
    paddingHorizontal: padding.base,
    paddingVertical: padding.large,
    backgroundColor: Colors.secondary,
    color: Colors.textColor,
    ...Typography.screenTitle,
  },
  stocksList: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: padding.small,
  },
  loadingIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
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
    borderRadius: borderRadius.base
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

export default Style;
