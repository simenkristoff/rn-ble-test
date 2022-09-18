import {femfitProfile} from './femfit/femfit.profile';
import {BluetoothProfile} from './interface';

export const profiles: Record<string, BluetoothProfile> = {
  femfit: femfitProfile,
};
