import { TouchableOpacityProps } from "react-native";
import { ButtonTypeStyleProps, Container, Loading, Title } from "./styles";

type Props = TouchableOpacityProps & {
    title: string;
    type?: ButtonTypeStyleProps;
    outline?: boolean;
    isLoading?: boolean;
}

export function Button({ title, type = 'PRIMARY', outline = false, isLoading = false, ...rest }: Props) {
    return (
        // o rest tem que ser sempre o ultimo parametro
        <Container activeOpacity={.7} disabled={isLoading} type={type} outline={outline} {...rest}>
            {
                isLoading
                ? <Loading />
                : <Title type={type} outline={outline}>{title}</Title>
            }
        </Container>
    );
}
