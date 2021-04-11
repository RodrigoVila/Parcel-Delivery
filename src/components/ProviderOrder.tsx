import React, { useState } from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';

import Colors from '../constants/Colors';
import { ProviderStackParams } from '../navigation';
interface Props {
  data: {
    id_cpte: string;
    nombre_cliente: string;
    direccion: string;
    nu_paquetes: string;
    latitud: string;
    longitud: string;
  };
  navigation: StackNavigationProp<ProviderStackParams>;
}

const ProviderOrder = ({ data, navigation }: Props) => {
  const [orderStatus, setOrderStatus] = useState('');
  const { id_cpte, nombre_cliente, direccion, nu_paquetes } = data;

  const handleTouch = (): void => {
    id_cpte && navigation.navigate('OrderScreen', { id_cpte });
  };

  const handleDeliverColor = (): object => {
    if (orderStatus === 'Entregado') return { color: Colors.lightGreen };
    if (orderStatus === 'Rechazado') return { color: Colors.red };
    else return { color: Colors.mediumBlue };
  };

  const handleIcon = (): string => {
    if (orderStatus === 'Entregado') return 'check-bold';
    if (orderStatus === 'Rechazado') return 'close-thick';
    else return 'exclamation-thick';
  };

  return (
    <>
      <TouchableNativeFeedback onPress={handleTouch}>
        <View style={styles.container}>
          <View style={orderStatus !== '' && styles.overlay} />
          <View style={styles.topContainer}>
            <Text style={styles.topText}>N°: {id_cpte}</Text>
          </View>

          <View style={styles.middleContainer}>
            <Text style={[styles.text, styles.bold]}>{nombre_cliente}</Text>
          </View>

          <View style={styles.bottomContainer}>
            {orderStatus !== '' && (
              <MaterialCommunityIcons
                style={[styles.checkIcon, handleDeliverColor()]}
                name={handleIcon()}
                size={33}
              />
            )}
            <Text style={styles.text}>{direccion}</Text>
            <View style={styles.bottomRightContainer}>
              <MaterialCommunityIcons
                name="package-variant-closed"
                size={20}
                color={Colors.white}
              />
              <Text style={styles.text}>{nu_paquetes}</Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    </>
  );
};

export default ProviderOrder;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    borderBottomWidth: 1,
    borderColor: Colors.purple2,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  topContainer: {
    marginHorizontal: 15,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  topText: {
    fontWeight: '700',
    fontSize: 20,
    color: Colors.whitish,
  },

  middleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  text: {
    color: Colors.whitish,
    fontSize: 18,
    textAlign: 'center',
  },

  bold: {
    fontWeight: 'bold',
  },

  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
  },

  checkIcon: {
    position: 'absolute',
    bottom: 5,
    left: 0,
  },

  bottomRightContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
  },
});