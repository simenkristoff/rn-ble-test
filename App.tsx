import React, {useState} from 'react';
import {Button, SafeAreaView, ScrollView, Text} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ListItem, Dialog} from '@rneui/themed';
import BleManager from 'react-native-ble-manager';

import {RootState, store} from './src/core/state/configureStore';
import {
  connectDevice,
  startDeviceScan,
} from './src/core/state/ducks/bluetooth/bluetooth.reducer';
import WithBluetooth from './src/hoc/WithBluetooth';
import {profiles} from './src/core/bluetooth/profiles';
import ConnectDeviceContainer from './src/containers/ConnectDeviceContainer';

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <WithBluetooth>
          <Home />
        </WithBluetooth>
      </Provider>
    </SafeAreaProvider>
  );
};

const Home = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState<boolean>(false);

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const devices = useSelector(
    (state: RootState) => state.bluetooth.availableDevices,
  );
  const fm = useSelector(
    (state: RootState) => state.bluetooth.connectedDevices,
  );
  const foo = () => {
    for (const service of Object.keys(profiles.femfit.notifyChannels)) {
      for (const char of profiles.femfit.notifyChannels[service]) {
        BleManager.startNotification('D0:5E:57:61:4A:32', service, char);
      }
    }
  };

  const stopNotify = () => {
    for (const service of Object.keys(profiles.femfit.notifyChannels)) {
      for (const char of profiles.femfit.notifyChannels[service]) {
        BleManager.stopNotification('D0:5E:57:61:4A:32', service, char);
      }
    }
  };
  return (
    <SafeAreaView>
      <ConnectDeviceContainer />
      {/* <Button
        title="Press Here"
        onPress={() => {
          dispatch(startDeviceScan());
        }}
      />
      <Button title="Start notify" onPress={() => foo()} />
      <Button title="Stop notify" onPress={() => stopNotify()} />

      <Button title="Connect device" onPress={toggleDialog} />
      <Dialog isVisible={visible} onBackdropPress={toggleDialog}>
        <Dialog.Title title="Connect device" />
      </Dialog>

      <ScrollView>
        {fm['D0:5E:57:61:4A:32'] && (
          <Text>
            {JSON.stringify(
              fm['D0:5E:57:61:4A:32'].services[
                '0d9e0001-c111-49cd-bba3-85c7471cb6fa'
              ],
              undefined,
              2,
            )}
          </Text>
        )}
      </ScrollView>

      <ScrollView>
        {devices.map(device => {
          return (
            <ListItem
              key={device.id}
              onPress={() => dispatch(connectDevice(device.id))}>
              <ListItem.Content>
                <ListItem.Title>{device.name}</ListItem.Title>
                <Text>{device.rssi}</Text>
                <ListItem.Subtitle>{device.id}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          );
        })}
      </ScrollView> */}
    </SafeAreaView>
  );
};

export default App;
