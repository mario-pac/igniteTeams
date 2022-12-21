import { ButtonIcon } from '@components/ButtonIcon';

import * as s from './styles';

type Props = {
    name: string;
    onRemove: () => void;
}

export function PlayerCard({name, onRemove}: Props) {
    return(
        <s.Container>
            <s.Icon name='person' />
            <s.Name>
                {name}
            </s.Name>

            <ButtonIcon 
                icon='close'
                type='SECONDARY'
                onPress={onRemove}
            />
        </s.Container>
    )
};