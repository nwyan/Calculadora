import { combineReducers } from 'redux';
import devicesState from './Devices/reducer';
let defaultObjRet = {   // <- Estrutura que adiciona uma saída padrão pra qlqr entrada
  get: function(target, device) {
    return target.hasOwnProperty(device) ? target[device] : {data:[], props:[]};
  }
};
let initialState = new Proxy({}, defaultObjRet);  // Garante q ñ dê undefined caso um device ainda não exista
const device = ( state = initialState, {type, payload} ) => {
    if(type === 'DEVICE_DATA'){
        const [device, data] = payload
        let newState = {...state, [device]: {data, props: Object.keys(data[0])} }
        return new Proxy(newState, defaultObjRet)
    }
    else return state
}
const MQTTclient = ( state = null, {type, payload} ) => {
  return (type === 'MQTT_CLIENT') ? payload : state
}
const MQTTcurrentTopic = ( state = null, {type, payload} ) => {
  return (type === 'MQTT_CT') ? payload : state
}
export default combineReducers({
    devicesState,
    device,
    MQTTclient,
    MQTTcurrentTopic
})
