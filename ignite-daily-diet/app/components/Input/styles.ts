import { TextInput } from 'react-native';
import styled, { css } from 'styled-components/native';

type Props = {
    noMargin: boolean;
}

export const Container = styled(TextInput)<Props>`
    flex: 1;
    min-height: 56px;
    max-height: 56px;
    border-radius: 6px;
    padding: 16px;
    margin-bottom: ${({ noMargin }) => (
        noMargin ? 0 : '20px'
    )};
    ${({ theme }) => css`
        background-color: ${theme.COLORS.GRAY_700};
        color: ${theme.COLORS.WHITE};
        font-size: ${theme.FONT_SIZE.MD}px;
        font-family: ${theme.FONT_FAMILY.REGULAR};
    `};
`;
