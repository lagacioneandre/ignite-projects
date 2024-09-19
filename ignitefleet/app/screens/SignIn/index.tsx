import { Alert, View } from 'react-native';
import { Container, Slogan, Title } from './styles';
import backgroundImg from '../../assets/background.png';
import { Button } from '@components/Button';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { IOS_CLIENT_ID, WEB_CLIENT_ID } from '@env';
import { useState } from 'react';
import { Realm, useApp } from '@realm/react';

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: WEB_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
});

export default function SignIn() {
  const [isLoading, setIsloading] = useState(false);
  const app = useApp();

  const handleGoogleSignIn = async () => {
    setIsloading(true);
    try {
      const { idToken } = await GoogleSignin.signIn();
      if (idToken) {
        const credentials = Realm.Credentials.jwt(idToken);
        await app.logIn(credentials);
        
      } else {
        setIsloading(false);
        Alert.alert('Erro', 'Erro ao fazer o login.');
      }
    } catch (error) {
      setIsloading(false);
      console.log(error);
      Alert.alert('Erro', 'Erro ao fazer o login.');
    }
  }

  return (
    <Container source={backgroundImg}>
      <Title>Ignite Fleet</Title>
      <Slogan>Gestao de uso de veiculos</Slogan>
      <Button title='Entrar com o Google' isLoading={isLoading} onPress={handleGoogleSignIn} />
    </Container>
  );
}


