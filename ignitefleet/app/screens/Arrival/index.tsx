import { useNavigation, useRoute } from "@react-navigation/native";
import { Container, Content, Description, Footer, Label, LicensePlate } from "./styles";
import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";
import { X } from 'phosphor-react-native';
import { Historic } from "app/libs/realm/schemas/Historic";
import { BSON } from "realm";
import { Alert } from "react-native";
import { useObject, useRealm } from "@realm/react";
import { stopLocationTask } from "app/tasks/backgroundLocationTask";

type Props = {
  id: string;
}

export default function Arrival() {
  const route = useRoute();
  const { id } = route.params as Props;
  const historic = useObject(Historic, new BSON.UUID(id));
  const realm = useRealm();
  const { goBack } = useNavigation();
  const title = historic?.status === 'departure' ? 'Chegada' : 'Detalhes';

  const handleConfirm = () => {
    Alert.alert(
      'Cancelar',
      'Cancelar a utilizacao do veiculo',
      [{
        text: 'Nao',
        style: 'cancel',
      }, {
        text: 'Sim',
        onPress: () => handleRemove()
      }]
    );
  }

  const handleRemove = () => {
    realm.write(() => {
      realm.delete(historic);
    });

    goBack();
  }

  const handleArrive = async () => {
    try {
      if (!historic) return Alert.alert('Error', 'Erro ao obter os dados.');
      await stopLocationTask();
      realm.write(() => {
        historic.status = 'arrival';
        historic.update_at = new Date();
      });
      Alert.alert('Sucesso', 'Chegada registrada com sucesso.');
      goBack();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar registro.');
    }
  }

  return (
    <Container>
      <Header title={title} />

      <Content>
        <Label>Placa do veiculo</Label>
        <LicensePlate>{historic?.license_plate}</LicensePlate>
        <Label>Finalidade</Label>
        <Description>{historic?.description}</Description>
        {
          historic?.status === 'departure' &&
          <Footer>
            <ButtonIcon icon={X} onPress={handleConfirm} />
            <Button title="Registrar chegada" onPress={handleArrive} />
          </Footer>
        }
      </Content>
    </Container>
  );
}


