import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import { Audio } from 'expo-av';

const BiscoitoAberto  = require('./src/images/biscoitoAberto.png')
const BiscoitoFechado = require('./src/images/biscoito.png')

const frases = [
  'A vida trará coisas boas se tiver paciência.',
  'Demonstre amor e alegria em todas as oportunidades e verá que a paz nasce dentro de si.',
  'Não compense na ira o que lhe falta na razão.',
  'Defeitos e virtudes são apenas dois lados da mesma moeda.',
  'A maior de todas as torres começa no solo.',
  'Não há que ser forte. Há que ser flexível.',
  'Todos os dias organiza os seus cabelos, por que não faz o mesmo com o coração?',
  'Há três coisas que jamais voltam; a flecha lançada, a palavra dita e a oportunidade perdida.',
  'A juventude não é uma época da vida, é um estado de espírito.',
  'Podemos escolher o que semear, mas somos obrigados a colher o que plantamos.',
  'Dê toda a atenção á formação dos seus filhos, sobretudo com bons exemplos da sua própria vida.',
  'Siga os bons e aprenda com eles.',
];

export default function App() {

  const [getSound, setSound] = useState(null);
  const [getTextoFrase, setTextoFrase] = useState('');
  const [getTextoBotao, setTextoBotao] = useState('Quebrar biscoito');

  const playSound = async () => {

    const { sound } = await Audio.Sound.createAsync(
      require('./src/sounds/biscoito.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();

  }

  const quebraBiscoito = () => {

    if (getTextoBotao == 'Voltar') {

      setTextoFrase('');
      setTextoBotao('Quebrar biscoito');

    }else{
      const numeroAleatorio = Math.floor(Math.random() * frases.length);
      playSound();
      setTextoFrase(' "' + frases[numeroAleatorio] + '" ');
      setTextoBotao('Voltar');
    }

  }

  React.useEffect(() => {
    return getSound
      ? () => {
        console.log('Unloading Sound');
        getSound.unloadAsync();
      }
      : undefined;
  }, [getSound]);



  return (
    <View style={styles.container}>
      <View style={styles.containerImg}>
        <Image
          style={styles.img}
          source={getTextoBotao == 'Voltar' ? BiscoitoAberto : BiscoitoFechado}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.textoFrase}>{getTextoFrase}</Text>
      </View>
      
      <View style={styles.container}>
        <TouchableOpacity style={styles.botao} onPress={() => quebraBiscoito()}>
          <View style={styles.btnArea}>
            <Text style={styles.btnTexto}>{getTextoBotao}</Text>
          </View>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerImg: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerFrase: {
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerBotao: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 250,
    height: 250
  },
  textoFrase: {
    fontSize: 20,
    color: '#dd7b22',
    margin: 30,
    fontStyle: 'italic',
    textAlign: 'center'
  },
  botao: {
    width: 230,
    height: 50,
    borderWidth: 2,
    borderColor: '#dd7b22',
    borderRadius: 25
  },
  btnArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dd7b22'
  },
  autor: {
    height: 30
  },
  textoAutor: {
    color: '#ccc'
  }

});
