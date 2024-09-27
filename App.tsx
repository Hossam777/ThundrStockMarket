import React from 'react';
import SplashScreen from 'react-native-splash-screen';

import ExploreScreen from './src/screen/explorescreen/ExploreScreen';
import {SafeAreaView} from 'react-native-safe-area-context';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';

const App = () => {

  const onHideSplashScreen = () => {
    SplashScreen.hide();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: StaticSafeAreaInsets.safeAreaInsetsTop,
        paddingBottom: StaticSafeAreaInsets.safeAreaInsetsBottom,
      }}>
      <ExploreScreen onHideSplashScreen={onHideSplashScreen} />
    </SafeAreaView>
  );
};

export default App;
