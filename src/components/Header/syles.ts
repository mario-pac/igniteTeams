import styled from "styled-components/native";
import {CaretLeft, HouseSimple} from 'phosphor-react-native';

export const Container = styled.View`
    width: 100%;
    padding-top: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const Logo = styled.Image`
    width: 46px;
    height: 55px;
`;

export const BackButton = styled.TouchableOpacity`
    flex: 1;
`;

export const BackIcon = styled(CaretLeft).attrs(({theme}) => ({
    size: 32,
    color: theme.COLORS.WHITE
}))``;

export const HomeButton = styled.TouchableOpacity`
    flex: 1;
`;

export const HomeIcon = styled(HouseSimple).attrs(({theme}) => ({
    size: 32,
    color: theme.COLORS.WHITE
}))``;