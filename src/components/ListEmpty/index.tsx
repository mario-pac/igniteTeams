import * as s from './styles';

type Props = {
    message: string
}

export function ListEmpty({ message }: Props){
    return(
        <s.Containter>
            <s.Message>{ message}</s.Message> 
        </s.Containter>
    );
};