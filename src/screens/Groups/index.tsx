import { useState, useCallback } from 'react';
import { FlatList } from 'react-native';

import {useNavigation, useFocusEffect} from '@react-navigation/native';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { Loading } from '@components/Loading';

import { groupsGetAll } from '@storage/group/groupsGetAll';

import * as S from './styles';

export function Groups() {
  const [groups, setGroups] =  useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  function handleOpenGroup(group: string){
    navigation.navigate('players', {group});
  }

  function handleNewGroup(){
    navigation.navigate('new');
  }

  async function fetchGroups(){
    try{
      setIsLoading(true);
      const data = await groupsGetAll();
      setGroups(data);
    }catch(err){
      console.log(err);
    }finally{
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(()=> {
    fetchGroups()
  }, []));
  
  return (
    <S.Container>
      <Header/>
      <Highlight
        title='Turmas'
        subtitle='Jogue com a sua turma'
      />
      {isLoading ? <Loading/> : 
      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({item}) => (
        <GroupCard
        title={item}
        onPress={() => handleOpenGroup(item)}
        />
        )}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        ListEmptyComponent={()=> <ListEmpty message="Que tal cadastrar a primeira turma?"/>}
      />
      }
      

      <Button
        title='Criar nova turma'
        onPress={handleNewGroup}
      />
    </S.Container>
  );
}