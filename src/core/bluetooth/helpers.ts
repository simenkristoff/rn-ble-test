import BleManager from 'react-native-ble-manager';

export const startScan = (serviceUUIDs: string[]) => {
  BleManager.scan(serviceUUIDs, 5).then(() => {
    console.log('Scanning for bluetooth devices');
  });
};

export const connectDevice = async (deviceId: string) => {
  await BleManager.connect(deviceId);
  return BleManager.retrieveServices(deviceId);
};
