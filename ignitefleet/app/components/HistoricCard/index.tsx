import { useTheme } from "styled-components";
import { Container, Departure, Info, LicensePlate } from "./styles";
import { Check, ClockClockwise } from 'phosphor-react-native';

export type HistoricCardProps = {
    id: string;
    licensePlate: string;
    created_at: string;
    isSync: boolean;
}

type Props = {
    data: HistoricCardProps
}

export function HistoricCard({ data, ...rest }: Props) {
    const { COLORS } = useTheme()

    return (
        <Container {...rest}>
            <Info>
                <LicensePlate>{data.licensePlate}</LicensePlate>
                <Departure>{data.created_at}</Departure>
            </Info>

            {
                data.isSync
                ? <Check size={24} color={COLORS.BRAND_LIGHT} />
                : <ClockClockwise size={24} color={COLORS.GRAY_400} />
            }
        </Container>
    );
}
