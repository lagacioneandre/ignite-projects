import { useTheme } from "styled-components";
import { Container, Title } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
    icon?: any,
    title: string;
}

export function TopMessage({ icon: Icon, title }: Props) {
    const { COLORS } = useTheme();
    const insets = useSafeAreaInsets();
    const paddingTop = insets.top + 5;

    return (
        <Container style={{ paddingTop }}>
            {
                Icon &&
                <Icon size={18} color={COLORS.GRAY_100} />
            }
            <Title>{title}</Title>
        </Container>
    );
}
