import theme from '@theme/index';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.COLORS.GRAY_600};
`;

export const Content = styled.View`
  flex: 1;
  gap: 16px;
  padding: 32px;
  margin-top: 16px;
`;

export const Message = styled.Text`
    color: ${({ theme }) => theme.COLORS.WHITE};
    font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
    font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
    margin: 24px;
    text-align: center;
`;
