import React from 'react';
import {Dialog, Icon} from '@rneui/themed';
import {ScrollView} from 'react-native';
import {ListItem} from '@rneui/base/dist/ListItem';

import {BluetoothDevice} from '../core/state/ducks/bluetooth/bluetooth.interface';

export type ConnectDeviceModalProps = {
  visible: boolean;
  toggle: () => void;
  isScanning: boolean;
  devices: BluetoothDevice[];
};

const ConnectDeviceModal: React.FC<ConnectDeviceModalProps> = ({
  visible,
  toggle,
  isScanning,
  devices,
}) => {
  return (
    <Dialog isVisible={visible} onBackdropPress={toggle}>
      <Dialog.Title title="Connect device" />
      <ScrollView>
        {devices.map(device => (
          <ListItem key={device.id}>
            <Icon name="bluetooth-b" type="font-awesome" />
            <ListItem.Content>
              <ListItem.Title>{device.name}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    </Dialog>
  );
};

export default ConnectDeviceModal;
