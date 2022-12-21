import * as s from './styles';
import { TouchableOpacityProps } from 'react-native';

type Props = TouchableOpacityProps & s.FilterStyleProps & {
    title: string;
}

export function Filter({title, isActive= false, ...rest}: Props){
    return(
        <s.Container isActive={isActive} {...rest}>
            <s.Title>{title}</s.Title>
        </s.Container>
    );
};