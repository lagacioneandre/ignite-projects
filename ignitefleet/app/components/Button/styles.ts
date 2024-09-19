import { TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';

export type ButtonTypeStyleProps = 'PRIMARY' | 'SECONDARY';

type Props = {
    type: ButtonTypeStyleProps;
    outline: boolean;
}

export const Container = styled(TouchableOpacity)<Props>`
    flex: 1;
    min-height: 56px;
    max-height: 56px;
    border: 1px solid;
    ${({ theme, type }) => type === 'PRIMARY' && css`
        background-color: ${theme.COLORS.GREEN_700};
        border-color: ${theme.COLORS.GREEN_700};
    `};
    ${({ theme, type }) => type === 'SECONDARY' && css`
        background-color: ${theme.COLORS.RED_DARK};
        border-color: ${theme.COLORS.RED_DARK};
    `};
    ${({ outline }) => outline && css`
        background-color: transparent
    `};
    border-radius: 6px;
    align-items: center;
    justify-content: center;
`;

export const Title = styled.Text<Props>`
    text-align: center;
    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.MD}px;
        font-family: ${theme.FONT_FAMILY.BOLD};
        color: ${theme.COLORS.WHITE};
    `};
    ${({ outline, theme, type }) => outline && type === 'PRIMARY' && css`
        color: ${theme.COLORS.GREEN_700};
    `};
    ${({ outline, theme, type }) => outline && type === 'SECONDARY' && css`
        color: ${theme.COLORS.RED_DARK};
    `};
`;

export const Loading = styled.ActivityIndicator.attrs(({ theme }) => ({
    color: theme.COLORS.WHITE,
}))``;
