import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Home from './screens/home'

const App: () => React$Node = () => {
  return (
    <PaperProvider>
      <Home />
    </PaperProvider>
  );
};

export default App;