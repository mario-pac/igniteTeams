import {TouchableOpacityProps} from 'react-native';
import * as s from './styles';

type Props = TouchableOpacityProps & {
    title: string;
}

export function GroupCard({title, ...rest}: Props){
    return(
        <s.Container {...rest}>
            <s.Icon/>
            <s.Title>{title}</s.Title>
        </s.Container>
    )
}