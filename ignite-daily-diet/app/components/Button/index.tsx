import { TouchableOpacityProps } from "react-native";
import { ButtonTypeStyleProps, Container, Title } from "./styles";

type Props = TouchableOpacityProps & {
    title: string;
    type?: ButtonTypeStyleProps;
    outline?: boolean;
}

export function Button({ title, type = 'PRIMARY', outline = false, ...rest }: Props) {
    return (
        // o rest tem que ser sempre o ultimo parametro
        <Container type={type} outline={outline} {...rest}>
            <Title type={type} outline={outline}>{title}</Title>
        </Container>
    );
}
