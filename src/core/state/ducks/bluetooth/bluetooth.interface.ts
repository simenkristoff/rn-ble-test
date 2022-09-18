export type BluetoothDevice = {
  id: string;
  name: string;
  isConnectable: boolean;
  rssi: number;
};

export type CharacteristicInfo = {properties: string[]; value: any};

export interface ConnectedBluetoothDevice extends BluetoothDevice {
  services: Record<string, Record<string, CharacteristicInfo>>;
}
