

import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text>Hello World</Text>
    </View>
  );
}



export default App;
