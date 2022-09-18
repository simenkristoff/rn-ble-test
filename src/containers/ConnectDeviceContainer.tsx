import {Button} from '@rneui/themed';
import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import ConnectDeviceModal, {
  ConnectDeviceModalProps,
} from '../components/ConnectDeviceModal';
import {RootState} from '../core/state/configureStore';
import {
  clearAvailableDevices,
  startDeviceScan,
} from '../core/state/ducks/bluetooth/bluetooth.reducer';

const ConnectDeviceContainer: React.FC = () => {
  const bluetoothState = useSelector((state: RootState) => state.bluetooth);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (visible) {
      dispatch(startDeviceScan());
    } else {
      dispatch(clearAvailableDevices());
    }
  }, [visible]);

  const toggle = () => {
    setVisible(!visible);
  };

  const mapStateToProps: ConnectDeviceModalProps = {
    visible,
    toggle: useCallback(() => toggle(), []),
    isScanning: bluetoothState.isScanning,
    devices: bluetoothState.availableDevices,
  };

  return (
    <View>
      <Button title="Connect device" onPress={toggle} />
      <ConnectDeviceModal {...mapStateToProps} />
    </View>
  );
};

export default ConnectDeviceContainer;
