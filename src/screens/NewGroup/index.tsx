import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';

import { groupCreate } from '@storage/group/groupCreate';

import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert } from 'react-native';

import * as s from './styles';
import { AppError } from '@utils/AppError';

export function NewGroup(){

    const navigation = useNavigation();

    const [group, setGroup] = useState('');

    async function handleNew(){
        try{
            await groupCreate(group);
            navigation.navigate('players', {group});
        }catch(err){
            if(err instanceof AppError){
                Alert.alert('Novo Turma', err.message);
            }
            else{
                Alert.alert('Nova Turma', 'Não foi possível criar um novo grupo.');
                console.log(err);
            }
        }
    }

    return(
        <s.Container>
            <Header showBackButton />

            <s.Content>
                <s.Icon />
                <Highlight 
                    title='Nova Turma'
                    subtitle='Crie a Turma para adicionar as pessoas'
                />

                <Input 
                    placeholder='Nome da turma'
                    onChangeText={setGroup}
                    onSubmitEditing={handleNew}
                    returnKeyType='done'
                />

                <Button 
                    title='Criar'
                    style={{marginTop: 16}}
                    onPress={handleNew}
                    disabled={group.trim().length <= 4 ? true : false}
                />
            </s.Content>
        </s.Container>
    );
}