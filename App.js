import * as React from 'react';
import Duolingo from './Game/Duolingo';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function App() {
  return(
   <SafeAreaProvider>
<Duolingo></Duolingo> 
</SafeAreaProvider> 
  );
};
  
