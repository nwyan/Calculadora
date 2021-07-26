import { ATUALIZAR_DEVICES, SELECT_DEVICE,DADOS_TYPE, DADOS_DEVICE} from './actions';
const initialState = {
    devices: [],
    selectedDevice: '',
    dadosType: [],
    dadosDevice: [],
}
export default (state = initialState, { type, payload }) => {
    switch (type) {
        case ATUALIZAR_DEVICES:
            return {
                ...state,
                devices: payload
            }
        case SELECT_DEVICE:
            return {
                ...state,
                selectedDevice: payload
            }
        case DADOS_TYPE:
            return {
                ...state,
                dadosType: payload
            }
        case DADOS_DEVICE:
            return {
                ...state,
                dadosDevice: payload,
            }
        default:
            return state
    }
}
