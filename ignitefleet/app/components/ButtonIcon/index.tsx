import { TouchableOpacityProps } from "react-native";
import { ButtonIconTypeStyleProps, Container, Icon } from "./styles";
import { useTheme } from "styled-components";

type Props = TouchableOpacityProps & {
    icon: any;
    type?: ButtonIconTypeStyleProps;
}

export function ButtonIcon({ icon, type = 'PRIMARY', ...rest }: Props) {
    const { COLORS } = useTheme();

    return (
        <Container {...rest}>
            <Icon
                name={icon}
                type={type}
                size={24}
                color={COLORS.BRAND_LIGHT}
            />
        </Container>
    );
}
