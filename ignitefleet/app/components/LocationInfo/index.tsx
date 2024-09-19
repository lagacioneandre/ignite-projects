import { IconBox } from "@components/IconBox";
import { Container, Description, Info, Label } from "./styles";
import { IconBoxProps } from '@components/IconBox';

export type LoationInfoProps = {
    label: string;
    description: string;
}

type Props = LoationInfoProps & {
    icon: IconBoxProps;
}

export function LocationInfo({ label, icon, description }: Props) {
    return (
        <Container>
            <IconBox icon={icon} />
            <Info>
                <Label numberOfLines={1}>{label}</Label>
                <Description numberOfLines={1}>{description}</Description>
            </Info>
        </Container>
    );
}
