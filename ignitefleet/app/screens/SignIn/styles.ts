import theme from '@theme/index';
import styled from 'styled-components/native';

export const Container = styled.ImageBackground`
  flex: 1;
  background-color: ${theme.COLORS.GRAY_600};
  justify-content: center;
  padding: 52px;
`;

export const Title = styled.Text`
  color: ${theme.COLORS.BRAND_LIGHT};
  font-size: ${theme.FONT_SIZE.XXXL}px;
  font-family: ${theme.FONT_FAMILY.BOLD};
  text-align: center;
`;

export const Slogan = styled.Text`
  color: ${theme.COLORS.GRAY_100};
  font-size: ${theme.FONT_SIZE.MD}px;
  font-family: ${theme.FONT_FAMILY.REGULAR};
  text-align: center;
  margin-bottom: 32px;
`;
