import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Peripheral, PeripheralInfo} from 'react-native-ble-manager';

import {BluetoothDevice} from '../bluetooth/bluetooth.interface';

import {
  peripheralToAvailableDevice,
  peripheralToConnectedDevice,
} from './bluetooth.utils';

type BluetootState = {
  isScanning: boolean;
  isConnecting: boolean;
  availableDevices: BluetoothDevice[];
  connectedDevices: Record<string, any>;
};

const initialState: BluetootState = {
  isScanning: false,
  isConnecting: false,
  availableDevices: [],
  connectedDevices: {},
};

const bluetoothReducer = createSlice({
  name: 'bluetooth',
  initialState,
  reducers: {
    startDeviceScan: state => {
      state.isScanning = true;
    },
    stopDeviceScan: state => {
      state.isScanning = false;
    },
    disconnectDevice: (state: BluetootState, action: PayloadAction<string>) => {
      console.log(action.payload);
      const deviceId = action.payload;
      if (Object.keys(state.connectedDevices).includes(deviceId)) {
        delete state.connectedDevices[deviceId];
      }
    },
    connectDevice: (state: BluetootState, _action: PayloadAction<string>) => {
      state.isConnecting = true;
    },
    onConnectDeviceEnd: (
      state: BluetootState,
      action: PayloadAction<Peripheral & PeripheralInfo>,
    ) => {
      state.isConnecting = false;
      state.connectedDevices[action.payload.id] = peripheralToConnectedDevice(
        action.payload,
      );
      state.availableDevices = [];
    },
    clearAvailableDevices: state => {
      state.availableDevices = [];
    },
    updateCharacteristic: (
      state: BluetootState,
      action: PayloadAction<{
        value: any[];
        peripheral: string;
        characteristic: string;
        service: string;
      }>,
    ) => {
      const {value, peripheral, characteristic, service} = action.payload;
      state.connectedDevices[peripheral].services[service][
        characteristic
      ].value = value;
    },
    onDeviceFound: (
      state: BluetootState,
      action: PayloadAction<Peripheral>,
    ) => {
      if (
        !state.availableDevices.some(device => device.id === action.payload.id)
      ) {
        const device = peripheralToAvailableDevice(action.payload);
        state.availableDevices.push(device);
      }
    },
  },
});

export const {
  startDeviceScan,
  stopDeviceScan,
  disconnectDevice,
  clearAvailableDevices,
  updateCharacteristic,
  connectDevice,
  onConnectDeviceEnd,
  onDeviceFound,
} = bluetoothReducer.actions;

export default bluetoothReducer;
