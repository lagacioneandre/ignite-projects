import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled, { css } from 'styled-components/native';

export const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${({ theme }) => theme.COLORS.GRAY_600};
    padding: 24px;
    justify-content: space-between;
`;

export const Message = styled.Text`
    text-align: justify;
    margin-top: 24px;
    ${({ theme }) => css`
        color: ${theme.COLORS.GRAY_200};
        font-size: ${theme.FONT_SIZE.SM}px;
        font-family: ${theme.FONT_FAMILY.REGULAR};
    `};
`;

export const AppName = styled.Text`
    ${({ theme }) => css`
        color: ${theme.COLORS.GREEN_500};
    `};
`;

export const AccesAccount = styled.Text`
    text-align: center;
    margin-bottom: 12px;
    ${({ theme }) => css`
        color: ${theme.COLORS.GRAY_200};
        font-size: ${theme.FONT_SIZE.SM}px;
        font-family: ${theme.FONT_FAMILY.BOLD};
    `};
`

export const PasswordRow = styled.View`
    flex-direction: row;
    background-color: ${({ theme }) => theme.COLORS.GRAY_700};
    border-radius: 6px;
    margin-bottom: 20px;
`;

export const PassVisibility = styled(TouchableOpacity)`
    min-height: 56px;
    max-height: 56px;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
`;

export const ForgotPass = styled.Text`
    text-align: center;
    margin-bottom: 12px;
    ${({ theme }) => css`
        color: ${theme.COLORS.GRAY_300};
        font-size: ${theme.FONT_SIZE.SM}px;
        font-family: ${theme.FONT_FAMILY.REGULAR};
    `};
`
