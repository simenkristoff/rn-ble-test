import {reduce} from 'lodash';
import {Peripheral, PeripheralInfo} from 'react-native-ble-manager';

import {
  BluetoothDevice,
  CharacteristicInfo,
  ConnectedBluetoothDevice,
} from './bluetooth.interface';

export const peripheralToAvailableDevice = (
  peripheral: Peripheral,
): BluetoothDevice => {
  const {id, name, rssi, advertising} = peripheral;
  return {
    id,
    name: name || 'Unknown device',
    rssi,
    isConnectable: advertising.isConnectable || false,
  };
};

export const peripheralToConnectedDevice = (
  peripheral: Peripheral & PeripheralInfo,
): ConnectedBluetoothDevice => {
  const emptyServices = reduce(
    peripheral.services,
    (prev, curr) => {
      prev[curr.uuid] = {};
      return prev;
    },
    {} as Record<string, Record<string, CharacteristicInfo>>,
  );

  return {
    ...peripheralToAvailableDevice(peripheral),
    services: reduce(
      peripheral.characteristics,
      (prev, curr) => {
        prev[curr.service][curr.characteristic] = {
          properties: Object.keys(curr.properties),
          value: [],
        };
        return prev;
      },
      emptyServices,
    ),
  };
};
