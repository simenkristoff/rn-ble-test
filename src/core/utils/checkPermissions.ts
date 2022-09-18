import {PermissionsAndroid} from 'react-native';

export async function checkPermission(key: string) {
  PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS[key]).then(
    granted => {
      if (granted) {
        console.log('Permission OK');
      } else {
        console.log('We are here');
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS[key]).then(
          accept => {
            if (accept) {
              console.log('User accepted permission');
            } else {
              console.log('User denied permission');
            }
          },
        );
      }
    },
  );
}
