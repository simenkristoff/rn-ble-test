import useBluetooth from '../hooks/useBluetooth';

const WithBluetooth = (props: any) => useBluetooth() && props.children;

export default WithBluetooth;
