import theme from '@theme/index';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.COLORS.GRAY_600};
`;

export const Content = styled.View`
  flex: 1;
  padding: 0 32px;
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.COLORS.WHITE};
    font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
    font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
    margin-top: 12px;
`;

export const Label = styled.Text`
    color: ${({ theme }) => theme.COLORS.GRAY_400};
    font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
    font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
    margin-top: 32px;
    text-align: center;
`;
