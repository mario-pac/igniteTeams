import { TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import * as s from './styles';

type Props = TouchableOpacityProps & {
    icon: keyof typeof MaterialIcons.glyphMap;
    type?: s.ButtonIconTypeStyleProps
}
export function ButtonIcon({icon, type='PRIMARY', ...rest}: Props){
    return(
        <s.Container {...rest}>
            <s.Icon name={icon} type={type}/>
        </s.Container>
    );
}