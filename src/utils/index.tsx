import AsyncStorage from '@react-native-async-storage/async-storage';
import preparingImage from '../../assets/preparing.png';
import deliveringImage from '../../assets/delivering.png';
import disDeliveringImage from '../../assets/delivering_disabled.png';
import deliveredImage from '../../assets/delivered.png';
import disDeliveredImage from '../../assets/delivered_disabled.png';
import naviraImage from '../../assets/navira.png';

export const handleStatusImages = (
  status: string,
  isDisabled: boolean = false,
): string => {
  switch (status) {
    case 'Preparado':
      return preparingImage;
    case 'En Camino':
      return isDisabled ? disDeliveringImage : deliveringImage;
    case 'Entregado':
      return isDisabled ? disDeliveredImage : deliveredImage;
    case 'No Entregado':
      return naviraImage;
    default:
      return preparingImage;
  }
};

export const setDataInStorage = (key: string, value: any): void => {
  try {
    const data = JSON.stringify(value);
    AsyncStorage.setItem(key, data);
  } catch (e) {
    console.error('Error while trying to save data in local storage', e);
  }
};

export const getDataFromStorage = async (key: string): Promise<any> => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data !== null) return data;
  } catch (e) {
    console.error('Error while trying to get data from local storage', e);
  }
};

export const parseCodeToStatus = (
  code: string,
  isCustomer: boolean = false,
) => {
  switch (code) {
    case '4':
      return isCustomer ? 'Entregado' : 'Conformado (T)';
    case '5':
      return isCustomer ? 'Entregado' : 'Observado por rotura';
    case '6':
      return isCustomer ? 'Devuelto' : 'Devolucion en deposito';
    case '7':
      return isCustomer ? 'Devuelto' : 'Devolucion a remitente';
    case '8':
      return isCustomer ? 'En Reparto' : 'Redespacho';
    case '9':
      return isCustomer ? 'Entregado' : 'Observado por faltante';
    case '14':
      return isCustomer ? 'Devuelto' : 'Devolucion parcial';
    case '18':
      return isCustomer ? 'Entregado' : 'Conforme TE';
    case '21':
      return isCustomer ? 'Entregado' : 'Recibido y conformado';
    case '24':
      return isCustomer ? 'Entregado' : 'Entrega parcial';
  }
};
