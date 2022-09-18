import {BluetoothProfile} from '../interface';

import {
  SENSOR_1_2,
  SENSOR_3_4,
  SENSOR_5_6,
  SENSOR_7_8,
} from './femfit.definitions';
import {readSensorCharacteristic} from './femfit.helpers';

export const femfitProfile: BluetoothProfile = {
  notifyChannels: {
    SENSOR_SERVICE: [SENSOR_1_2, SENSOR_3_4, SENSOR_5_6, SENSOR_7_8],
  },
  handlers: {
    [SENSOR_1_2]: readSensorCharacteristic,
    [SENSOR_3_4]: readSensorCharacteristic,
    [SENSOR_5_6]: readSensorCharacteristic,
    [SENSOR_7_8]: readSensorCharacteristic,
  },
};
