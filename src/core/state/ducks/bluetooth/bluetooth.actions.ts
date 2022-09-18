import bluetoothReducer from './bluetooth.reducer';

export const sagaActionConstants = {
  START_SCAN_FOR_DEVICE: bluetoothReducer.actions.startDeviceScan.type,
  CONNECT_DEVICE_START: bluetoothReducer.actions.connectDevice.type,
  CONNECT_DEVICE_END: bluetoothReducer.actions.onConnectDeviceEnd.type,
};
