import { useTheme } from "styled-components";
import { Container, Input, Label } from "./styles";
import { TextInputProps } from "react-native";

type Props = TextInputProps & {
    label: string;
}

export function TextAreaInput({ label, ...rest }: Props) {
    const { COLORS } = useTheme();

    return (
        <Container>
            <Label>{label}</Label>
            <Input
                multiline
                autoCapitalize="sentences"
                placeholderTextColor={COLORS.GRAY_400}
                {...rest}
            />
        </Container>
    );
}
