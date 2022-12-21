import { TouchableOpacityProps } from "react-native";

import * as s from './styles';

type Props = TouchableOpacityProps & {
    title: string;
    type? : s.ButtonTypeStyleProps;
}

export function Button({title, type = 'PRIMARY', ...rest}: Props){
    return(
        <s.Container type={type} {...rest}>
            <s.Title>{title}</s.Title>
        </s.Container>
    );
}