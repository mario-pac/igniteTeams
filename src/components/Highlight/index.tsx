import * as s from "./style";

type Props = {
    title: string;
    subtitle: string;
}

export function Highlight({title, subtitle}: Props){
    return(
        <s.Container>
            <s.Title>
                {title}
            </s.Title>

            <s.Subtitle>
                {subtitle}
            </s.Subtitle>
        </s.Container>
    );
}