import api from '../Connections/api';

export async function downloadData (options) {

    const user = localStorage.getItem('user')
    var resp = await api.get(`data?${options}&user=${user}`).catch(err => console.log(err))
    
    return resp.data
}
