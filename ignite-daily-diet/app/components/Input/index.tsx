import { TextInput, TextInputProps } from "react-native";
import { Container } from "./styles";
import { useTheme } from "styled-components/native";

type Props = TextInputProps & {
    inputRef?: React.RefObject<TextInput>;
    noMargin?: boolean;
}

export function Input({ inputRef, noMargin = false, ...rest }: Props) {
    const { COLORS } = useTheme();
    return (
        <Container
            ref={inputRef}
            noMargin={noMargin}
            placeholderTextColor={COLORS.GRAY_300}
            {...rest}
        >
            
        </Container>
    );
}
