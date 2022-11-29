import { NativeBaseProvider, StatusBar } from "native-base";
import { THEME } from './src/styles/theme'
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { Loading } from './src/components/Loading';
import { AuthContextProvider } from "./src/context/AuthContext";
import { SignIn } from './src/screens/SignIn';
import { New } from "./src/screens/New";
import { Find } from "./src/screens/Find";
import { Polls } from "./src/screens/Polls";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME} >
      <AuthContextProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {fontsLoaded ? <Polls /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}

