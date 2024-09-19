import { useTheme } from "styled-components";
import { Container, IconBox, Message, TextHilight } from "./styles";
import { Car, Key } from 'phosphor-react-native';
import { TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
    licensePlate?: string | null;
}

export function CarStatus({ licensePlate = null, ...rest }: Props) {
    const theme = useTheme();
    const Icon = licensePlate ? Car : Key;
    const message = licensePlate ? `Veiculo ${licensePlate} em uso. ` : 'Nenhum veiculo em uso. ';
    const status = licensePlate ? 'chegada' : 'saida';

    return (
        <Container {...rest}>
            <IconBox>
                <Icon size={32} color={theme.COLORS.BRAND_LIGHT} />
            </IconBox>

            <Message>
                {message}

                <TextHilight>
                    Clique aqui para registrar a {status}
                </TextHilight>
            </Message>
        </Container>
    );
}
