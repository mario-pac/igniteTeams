import { useEffect, useState, useRef } from 'react';
import { Alert, FlatList, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Input } from '@components/Input';
import { Header } from '@components/Header';
import { Filter } from '@components/Filter';
import { Highlight } from '@components/Highlight';
import { ButtonIcon } from '@components/ButtonIcon';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { Loading } from '@components/Loading';

import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';

import * as s from './styles';
import { AppError } from '@utils/AppError';

type RouteParams = {
    group: string;
};

export function Players(){

    const [isLoading, setIsLoading] = useState(true);
    const [newPlayerName, setNewPlayerName] = useState('')
    const [team, setTeam] = useState('Time A');
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

    const {params} = useRoute();
    const {group} = params as RouteParams;

    const newPlayerNameInputRef = useRef<TextInput>(null);

    const navigation = useNavigation();

    async function handleNewPlayer(){
        const newPlayer = {
            name:  newPlayerName,
            team
        }

        try {
            if(newPlayerName.trim().length <= 1){
                return Alert.alert('Nova pessoa', 'Informe um nome de pessoa válido!');
            }
            await playerAddByGroup(newPlayer, group);
            newPlayerNameInputRef.current?.blur();
            fetchPlayersByTeam();
            setNewPlayerName('');
        } catch (err) {
            if(err instanceof AppError ){
                Alert.alert('Nova pessoa', err.message)
            }
            else{
                console.log(err)
                Alert.alert('Nova pessoa', 'Não foi possível adicionar!');
            }
        }
    }

    async function fetchPlayersByTeam() {
        try {
            setIsLoading(true);
            const playersByTeam = await playersGetByGroupAndTeam(group, team);
            setPlayers(playersByTeam)
        } catch (err) {
            Alert.alert('Pessoas', 'Não foi possível carregar as pessoas filtradas do time selecionado.');
            console.log(err);
        }finally{
            setIsLoading(false);
        }
    }

    async function handleRemovePlayer(playerName: string){
        let answer = Alert.alert('Remoção de pessoa', `Tem certeza que deseja remover a pessoa ${playerName} do grupo?`, [
            {
                text: 'Não',
                style: 'cancel'
            },
            {
                text: 'Sim',
                onPress: async() => {
                    try {
                        await playerRemoveByGroup(playerName, group);
                        fetchPlayersByTeam();
                    } catch (err) {
                        console.log(err);
                        Alert.alert('Remover pessoa', `Não foi possível remover a pessoa ${playerName}!`);
                    }
                }
            },
        ])
        
        
    }

    async function groupRemove(){
        try {
            await groupRemoveByName(group);
            navigation.navigate('groups');
            
        } catch (err) {
            console.log(err);
            Alert.alert('Remover turma', `Não foi possível remover a turma ${group}!`);
        }
    }

    async function handleRemoveGroupAndPlayers(){
        let answer = Alert.alert('Remoção de turma', `Tem certeza que deseja remover a turma ${group}?`, [
            {
                text: 'Não',
                style: 'cancel'
            },
            {
                text: 'Sim',
                onPress: async() => {
                    await groupRemove();
                }
            },
        ])
        
        
    }

    useEffect(()=> {
        fetchPlayersByTeam()
      }, [team]);
    
    return(
        <s.Container>
                <Header showBackButton/>

                <Highlight 
                    title={group}
                    subtitle='Adicione a galera e separe os times!'
                />
            <s.Form>
                <Input
                    inputRef={newPlayerNameInputRef} 
                    onChangeText={setNewPlayerName}
                    value={newPlayerName}
                    placeholder='Nome da pessoa'
                    autoCorrect={false}
                    onSubmitEditing={handleNewPlayer}
                    returnKeyType='done'
                />

                <ButtonIcon
                    onPress={handleNewPlayer}
                    icon='add'
                    disabled={newPlayerName.trim().length <= 1 ? true : false}
                />
            </s.Form>

            <s.HeaderList>
                <FlatList 
                    data={['Time A', 'Time B']}
                    keyExtractor={item => item}
                    renderItem={({item}) => (
                        <Filter 
                            title={item}
                            isActive={item === team}
                            onPress={() => setTeam(item)}
                        />
                    )}
                    horizontal
                />

                <s.NumberOfPlayers>{players.length}</s.NumberOfPlayers>
            </s.HeaderList>

            {
            isLoading ? <Loading/> : 
            
            <FlatList 
                data={players}
                keyExtractor={item => item.name}
                renderItem={({item}) => (
                    <PlayerCard
                     name={item.name}
                     onRemove={()=> handleRemovePlayer(item.name)}
                    />
                )}
                ListEmptyComponent={()=> <ListEmpty message="Não há pessoas nesse time!"/>}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    {paddingBottom: 100},
                    players.length === 0 && {flex: 1}
                ]}
            />
            }

            <Button 
                title='Remover Turma'
                type='SECONDARY'
                onPress={handleRemoveGroupAndPlayers}
            />
        </s.Container>
    );
}