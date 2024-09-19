import { TouchableOpacity } from "react-native";
import { Container, Greeting, Message, Name, Picture } from "./styles";
import { Power } from 'phosphor-react-native';
import theme from "@theme/index";
import { useApp, useUser } from "@realm/react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function HomeHeader() {
    const user = useUser();
    const app = useApp();
    const insets = useSafeAreaInsets();
    const paddingTop = insets.top + 32;

    const handleLogout = () => {
        app.currentUser?.logOut();
    }

    return (
        <Container style={{ paddingTop }}>
            <Picture
                source={{ uri: user?.profile.pictureUrl }}
                placeholder="L184i9LEHV6nWB2yk8pyo0adR*.7kCMdnj"
            />
            <Greeting>
                <Message>Ola</Message>
                <Name>{user?.profile.name}</Name>
            </Greeting>

            <TouchableOpacity activeOpacity={.7} onPress={handleLogout}>
                <Power size={32} color={theme.COLORS.GRAY_400} />
            </TouchableOpacity>
        </Container>
    );
}
