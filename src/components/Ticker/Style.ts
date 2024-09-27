import {StyleSheet} from 'react-native';
import Colors from '../../theme/Colors';
import Typography from '../../theme/Typography';
import { borderRadius, padding } from '../../constants/spacing';

const Style = StyleSheet.create({
  cardView: {
    width: '100%',
    marginVertical: padding.base,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: Colors.secondary,
    borderRadius: borderRadius.base,
    marginHorizontal: padding.small,
    paddingVertical: padding.small
  },
  title: {
    color: Colors.textColor,
    ...Typography.titleLarge,
    marginHorizontal: padding.small,
    marginVertical: padding.small,
  },
  secondaryTxt: {
    color: Colors.textColor,
    ...Typography.textMedium,
    marginHorizontal: padding.small,
    marginVertical: padding.small,
  },
});

export default Style;
