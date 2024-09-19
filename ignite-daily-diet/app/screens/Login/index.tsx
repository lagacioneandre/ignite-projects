import { Text, TouchableOpacity, View } from "react-native";
import { AccesAccount, AppName, Container, ForgotPass, Message, PassVisibility, PasswordRow } from "./styles";
import { Logo } from "@components/Logo";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";
import { useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import theme from "@theme/index";

export function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const handleChangePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <Container>
            <View>
                <Logo />
                <Message>
                    Bem vindo (a) ao <AppName>Descompressão Offshore</AppName>. Aqui você irá usufruir de ferramentas para desopilar,
                    equilibrando as dimensões da sua vida, além de se conectar com atividades de bem estar e de promoção
                    de saúde da sua plataforma de trabalho.
                </Message>
            </View>
            <View>
                <AccesAccount>Acessar sua conta</AccesAccount>
                <Input
                    placeholder="Usuario"
                />
                <PasswordRow>
                    <Input
                        placeholder="Senha"
                        noMargin
                        secureTextEntry={!showPassword}
                    />
                    <PassVisibility
                        onPress={handleChangePasswordVisibility}
                    >
                        <FontAwesome6
                            name={!showPassword ? 'eye' : 'eye-slash'}
                            size={24}
                            color={theme.COLORS.GREEN_700}
                        />
                    </PassVisibility>
                </PasswordRow>
                <Button
                    title="Acesssar"
                />
            </View>
            <View>
                <TouchableOpacity>
                    <ForgotPass>Esqueci minha senha</ForgotPass>
                </TouchableOpacity>
                <Button
                    title="Criar conta"
                    outline
                />
            </View>
        </Container>
    );
}
