import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import ExploreScreen from './src/screen/explorescreen/ExploreScreen';
import {SafeAreaView} from 'react-native-safe-area-context';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onHideSplashScreen = () => {
    SplashScreen.hide();
  };

  return (
    <SafeAreaView edges={['bottom', 'top']} style={{flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ExploreScreen onHideSplashScreen={onHideSplashScreen} />
    </SafeAreaView>
  );
};

export default App;
