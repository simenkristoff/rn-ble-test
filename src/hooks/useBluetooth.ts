import {useEffect} from 'react';
import {NativeModules, NativeEventEmitter, Platform} from 'react-native';
import BleManager, {Peripheral} from 'react-native-ble-manager';
import {useDispatch} from 'react-redux';

import {profiles} from '../core/bluetooth/profiles';
import {
  onDeviceFound,
  stopDeviceScan,
  disconnectDevice,
  updateCharacteristic,
} from '../core/state/ducks/bluetooth/bluetooth.reducer';
import {checkPermission} from '../core/utils/checkPermissions';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

BleManager.start({showAlert: false});
const useBluetooth = () => {
  const dispatch = useDispatch();
  const handleDiscoverPeripheral = (peripheral: Peripheral) => {
    console.log(peripheral);
    dispatch(onDeviceFound(peripheral));
  };

  const handleStopScan = () => {
    console.log('Stopped scanning for devices');
    dispatch(stopDeviceScan());
  };

  const handleUpdateCharacteristic = (data: {
    value: number[];
    peripheral: string;
    characteristic: string;
    service: string;
  }) => {
    const readData = profiles.femfit.handlers[data.characteristic](data.value);
    dispatch(updateCharacteristic({...data, value: readData}));
  };

  const handleDisconnectedPeripheral = (data: {
    status: number;
    peripheral: string;
  }) => {
    const peripheral = data.peripheral;
    if (peripheral) {
      dispatch(disconnectDevice(peripheral));
    }
  };

  const verifyPermissions = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      await checkPermission('ACCESS_FINE_LOCATION');
      await checkPermission('BLUETOOTH_SCAN');
    }
  };

  useEffect(() => {
    BleManager.start({showAlert: false});
    verifyPermissions();
    bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral,
    );
    bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);
    bleManagerEmitter.addListener(
      'BleManagerDisconnectPeripheral',
      handleDisconnectedPeripheral,
    );
    bleManagerEmitter.addListener(
      'BleManagerDidUpdateValueForCharacteristic',
      handleUpdateCharacteristic,
    );

    return () => {
      bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
      bleManagerEmitter.removeAllListeners('BleManagerStopScan');
      bleManagerEmitter.removeAllListeners('BleManagerDisconnectPeripheral');
      bleManagerEmitter.removeAllListeners(
        'BleManagerDidUpdateValueForCharacteristic',
      );
    };
  });

  return true;
};

export default useBluetooth;
