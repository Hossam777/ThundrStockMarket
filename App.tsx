import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  useEffect(() => {
    //To Be Removed after api implemented
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
    </SafeAreaView>
  );
};

export default App;
