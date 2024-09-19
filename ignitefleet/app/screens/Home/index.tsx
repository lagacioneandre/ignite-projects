import { HomeHeader } from '@components/HomeHeader';
import { Container, Content, Label, Title } from './styles';
import { CarStatus } from '@components/CarStatus';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from 'app/libs/realm';
import { Historic } from 'app/libs/realm/schemas/Historic';
import { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useRealm, useUser } from '@realm/react';
import { HistoricCard, HistoricCardProps } from '@components/HistoricCard';
import dayjs from 'dayjs';
import { ProgressDirection, ProgressMode } from 'realm';

export default function Home() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  const historic = useQuery(Historic);
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);
  const [vehicleHistoric, setVehicleHistoric] = useState<HistoricCardProps[]>([]);
  const realm = useRealm();
  const user = useUser();

  const handleRegisterMovement = () => {
    if (vehicleInUse?._id) {
      navigate('Arrival', { id: vehicleInUse._id });
      return;
    }
     navigate('Departure');
  }

  const fetchVehicle = () => {
    try {
      const vehicle = historic.filtered(`status = 'departure'`)[0];
      setVehicleInUse(vehicle);
    } catch (error) {
      Alert.alert('Veiculo em uso', 'Nao foi possivel carregar os dados do veiculo em uso.');
    }
  }

  const fethHistoric = (isSync = false) => {
    try {
      const response = historic.filtered(`status = 'arrival' SORT(created_at DESC)`);
      const formatted = response.map(item => ({
        id: String(item._id),
        licensePlate: item.license_plate,
        isSync,
        created_at: dayjs(item.created_at).format('[Saida em] DD/MM/YYYY [as] HH:mm'),
      }));
      setVehicleHistoric(formatted);
    } catch (error) {
      Alert.alert('Erro', 'Erro');
    }
  }

  const handleHistoricDetails = (id: string) => {
    navigate('Arrival', { id });
  }

  const progressNotification = async (transferred: number, transferable: number) => {
    const percentage = (transferred/transferable) * 100;
    if (percentage === 100) {
      fethHistoric(true);
    }
  }

  useEffect(() => {
    fetchVehicle();
  }, []);

  useEffect(() => {
    fethHistoric();
  }, [historic]);

  useEffect(() => {
    realm.addListener('change', () => fetchVehicle());
    return () => realm.removeListener('change', fetchVehicle);
  }, []);

  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
      const historicByUserQuery = realm.objects('Historic').filtered(`user_id = '${user.id}'`);
      mutableSubs.add(historicByUserQuery, { name: 'historic_by_user' });
    });
  }, [realm]);

  useEffect(() => {
    const syncSession = realm.syncSession;
    if (!syncSession) return;
    syncSession.addConnectionNotification(
      ProgressDirection.Upload,
      ProgressMode.ReportIndefinitely,
      progressNotification,
    );
    return () => syncSession.removeProgressNotification(progressNotification);
  }, []);

  return (
    <Container>
      <HomeHeader />
      
      <Content>
        <CarStatus licensePlate={vehicleInUse?.license_plate} onPress={handleRegisterMovement} />
        <Title>Historico</Title>
        <FlatList
          data={vehicleHistoric}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <HistoricCard data={item} onPress={() => handleHistoricDetails(item.id)} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={(
            <Label>Nenhum veiculo utilizado</Label>
          )}
        />
      </Content>
    </Container>
  );
}


