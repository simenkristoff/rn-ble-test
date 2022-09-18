import {PeripheralInfo} from 'react-native-ble-manager';
import {AnyAction} from 'redux';
import {call, takeEvery, put} from 'redux-saga/effects';

import {connectDevice, startScan} from '../../../bluetooth/helpers';

import {sagaActionConstants} from './bluetooth.actions';

function* watchConnectDevice(action: {
  type: typeof sagaActionConstants.CONNECT_DEVICE_START;
  payload: string;
}): Generator<AnyAction, void, any> {
  const serviceInfo: PeripheralInfo = yield call(connectDevice, action.payload);
  yield put({
    type: sagaActionConstants.CONNECT_DEVICE_END,
    payload: serviceInfo,
  });
}

function* watchStartDeviceScan(): Generator<AnyAction, void, any> {
  try {
    yield call(startScan, []);
  } catch (err) {
    console.log(err);
  }
}

export function* bluetoothSaga() {
  yield takeEvery(
    sagaActionConstants.START_SCAN_FOR_DEVICE,
    watchStartDeviceScan,
  );
  yield takeEvery(sagaActionConstants.CONNECT_DEVICE_START, watchConnectDevice);
}
