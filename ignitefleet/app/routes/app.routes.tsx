import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import Arrival from '@screens/Arrival';
import Departure from '@screens/Departure';
import Home from '@screens/Home';

type AppRoutes = {
    Home: undefined;
    Departure: undefined;
    Arrival: { id: string };
}

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export function AppRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen
                name="Home"
                component={Home}
            />
            <Screen
                name="Departure"
                component={Departure}
            />
            <Screen
                name="Arrival"
                component={Arrival}
            />
        </Navigator>
    );
}
