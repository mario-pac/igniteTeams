import * as s from './syles';
import logoImg from '@assets/logo.png';
import { useNavigation } from '@react-navigation/native';

type Props = {
    showBackButton?: boolean;
}

export function Header({ showBackButton = false}: Props){
    
    const navigation = useNavigation();

    function handleGoBack(){
        navigation.goBack();
    }

    function handleGoHome(){
        navigation.navigate('groups');
    };
    
    return(
        <s.Container>
            {
                    showBackButton &&
                    <>
                    <s.BackButton onPress={handleGoBack}>
                        <s.BackIcon/>
                    </s.BackButton>
                    <s.HomeButton onPress={handleGoHome}>
                        <s.HomeIcon />
                    </s.HomeButton>
                    </>
            }
            <s.Logo source={logoImg}></s.Logo>
        </s.Container>
    )
}