import {StyleSheet} from 'react-native';
import Typography from '../../theme/Typography';
import Colors from '../../theme/Colors';
import {borderRadius, padding} from '../../constants/spacing';

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
  input: {
    height: 50,
    marginVertical: padding.small,
    marginHorizontal: padding.base,
    borderRadius: borderRadius.base,
    borderWidth: 1,
    paddingHorizontal: padding.base,
  },
});

export default Style;
