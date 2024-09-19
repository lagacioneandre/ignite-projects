import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Container } from "./styles";
import { Home } from "@screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { RoutesName } from "./routes-name.enum";
import { Login } from "@screens/Login";

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function Routes() {
  return (
    <Container>
      <NavigationContainer>
        <Navigator
          initialRouteName={RoutesName.LOGIN}
          screenOptions={{
              headerShown: false
          }}
        >
          <Screen
            name={RoutesName.HOME}
            component={Home}
          />
          <Screen
            name={RoutesName.LOGIN}
            component={Login}
          />
        </Navigator>
      </NavigationContainer>
    </Container>
  );
}
