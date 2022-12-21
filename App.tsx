import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';

import {useFonts, Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto';
import theme from '@theme/index';

import { Loading } from '@components/Loading';

// import { Groups } from '@screens/Groups';
// import { NewGroup } from '@screens/NewGroup';
// import { Players } from '@screens/Players';

import { Routes } from './src/routes/';

export default function App() {

  const [fontsLoaded] = useFonts({Roboto_700Bold, Roboto_400Regular});
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor={"transparent"} translucent></StatusBar>
      { fontsLoaded ? <Routes/> : <Loading />} 
    </ThemeProvider>
  );
}
