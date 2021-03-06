import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { isOrderDelivered } from '../../utils';
import Colors from '../../constants/Colors';
import { StackParams } from '../../navigation/types';

interface IProps {
  route: RouteProp<StackParams, 'MapScreen'>;
  navigation: StackNavigationProp<StackParams>;
}

const MapScreen = ({ navigation, route }: IProps) => {
  const { orders } = route.params;

  const handleTouch = (id_cpte: string): void => {
    navigation.navigate('OrderScreen', { id_cpte });
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons
          style={styles.icon}
          name="arrow-left-thick"
          size={33}
          color={Colors.black}
        />
      </TouchableWithoutFeedback>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: parseFloat(orders[0].latitud),
          longitude: parseFloat(orders[0].longitud),
          latitudeDelta: 0.0112,
          longitudeDelta: 0.0075,
        }}>
        {orders.map((order) => (
          <Marker
            key={order.id_cpte}
            identifier={order.id_cpte}
            pinColor={
              isOrderDelivered(order.id_estado) ? Colors.lightGreen : Colors.red
            }
            coordinate={{
              latitude: parseFloat(order.latitud),
              longitude: parseFloat(order.longitud),
            }}
            title={order.nombre_cliente}
            description={`Orden No ${order.id_cpte}`}
            onCalloutPress={() => handleTouch(order.id_cpte)}
          />
        ))}
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 99,
  },
  map: {
    flex: 1,
  },
});
