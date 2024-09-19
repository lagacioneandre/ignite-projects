import { Header } from '@components/Header';
import { Container, Content, Message } from './styles';
import { LicensePlateInput } from '@components/LicensePlateInput';
import { TextAreaInput } from '@components/TextAreaInput';
import { Button } from '@components/Button';
import { Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { useRealm, useUser } from '@realm/react';
import { Historic } from 'app/libs/realm/schemas/Historic';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LocationAccuracy, LocationObjectCoords, LocationSubscription, requestBackgroundPermissionsAsync, useForegroundPermissions, watchPositionAsync } from 'expo-location';
import { getAddressLocation } from '@utils/getAddressLocation';
import { Loading } from '@components/Loading';
import { LocationInfo } from '@components/LocationInfo';
import { Car } from 'phosphor-react-native';
import { Map } from '@components/Map';
import { startLocatioTask } from 'app/tasks/backgroundLocationTask';

const keyboardAvoidingViewBehavior = Platform.OS === 'android' ? 'height' : 'position';

export default function Departure() {
  const [description, setDescription] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [isLoading, setisloading] = useState(false);
  const realm = useRealm();
  const user = useUser();
  const { goBack } = useNavigation();
  const [locationForegroundPermition, requestLocationForegroundPermition] = useForegroundPermissions();
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const [currentCoords, setCurrentCoords] = useState<LocationObjectCoords | null>(null);

  const handleDepartureRegister = async () => {
    setisloading(true);
    const backgroundPermission = await requestBackgroundPermissionsAsync();
    if (!backgroundPermission.granted) {
      setisloading(false);
      return Alert.alert('Localizacao', 'E necessario permitir que o APP acese a sua localizacao.');
    }
    await startLocatioTask();
    try {
      realm.write(() => {
        realm.create('Historic', Historic.generate({
          user_id: user.id,
          license_plate: licensePlate,
          description,
        }));
      });
      Alert.alert('Sucesso', 'Saida registrada com sucesso.');
      goBack();
    } catch (error) {
      Alert.alert('Erro', 'Error ao salvar registro.');
    } finally {
      setisloading(false);
    }
  }

  useEffect(() => {
    requestLocationForegroundPermition();
  }, []);

  useEffect(() => {
    if (!locationForegroundPermition?.granted) return;
    setIsLoadingLocation(true);
    let subscription: LocationSubscription;
    watchPositionAsync({
        accuracy: LocationAccuracy.High,
        timeInterval: 1000
      },
      location => {
        setCurrentCoords(location.coords);
        getAddressLocation(location.coords)
          .then(address => setCurrentAddress(address || null))
          .finally(() => setIsLoadingLocation(false));
      }
    ).then(response => subscription = response);

    return () => subscription?.remove();
  }, [locationForegroundPermition]);

  if (!locationForegroundPermition?.granted) {
    <Container>
      <Header title='Saida' />
      <Message>
        Voce precisa permitir que o aplicativo acessa sua localizacao.
      </Message>
    </Container>
  }

  if (isLoadingLocation) {
    return (
      <Loading />
    );
  }

  return (
    <Container>
      <Header title='Saida' />
      {/* <KeyboardAvoidingView style={{ flex: 1 }} behavior={keyboardAvoidingViewBehavior}> */}
      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView>
          {
            currentCoords && <Map coordinates={[currentCoords]} />
          }
          <Content>
            {
              currentAddress && <LocationInfo icon={Car} label='Localizacao atual' description={currentAddress} />
            }
            <LicensePlateInput label='Placa do veiculo' placeholder='BRA1234' onChangeText={setDescription} />
            <TextAreaInput label='Finalidade' placeholder='Vou utilizar o veiculo para...' onChangeText={setLicensePlate} />
            <Button title='Registrar saida' onPress={handleDepartureRegister} isLoading={isLoading} />
          </Content>
        </ScrollView>
      </KeyboardAwareScrollView>
      {/* </KeyboardAvoidingView> */}
    </Container>
  );
}


