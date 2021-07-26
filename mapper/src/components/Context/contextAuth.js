import React,{useState, useEffect, createContext} from 'react';
import firebase from '../FirebaseConnection/firebaseConnection';
export const AuthContext = createContext({});
export default AuthProvider;

function AuthProvider ({children}) {

    const [user, setUser] = useState(null);
    const [loadind, setLoading] = useState(true);
    
    useEffect(() => {
        async function loadingStorage(){
            const storageUser = await localStorage.getItem('Auth_user');

            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false)
            }
            setLoading(false)
        }
        loadingStorage()
    },[])
    
    //função para logar o usuário
    async function logar(email, password){
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async(value) => {
            let uid = value.user.uid
            await firebase.database().ref('users').child(uid).once('value')
            .then((snapshot) => {
                let data = {
                    uid: uid,
                    name: snapshot.val().name,
                    email: value.user.email
                }
                setUser(data);
                storageUser(data)
            })
        })
        .catch((error) => {
            alert(error)
        })
    }
    
    //salvando dado no Storage
    async function storageUser(data){
        await localStorage.setItem('Auth_user', JSON.stringify(data));
    }
    
    //deslogar usuario
    async function signOut(){
        await firebase.auth().signOut();
        await localStorage.removeItem('Auth_user')
    
            setUser(null)
    
    }
    
    //cadastrar usuario no firebase
    async function cadastro(email, password, name, enterprise, lastName){
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async(value) => {
            let uid = value.user.uid;
            await firebase.database().ref('users').child(uid).set({
                name: name,
                lastName: lastName,
                enterprise: enterprise
            })
            .then(()=>{
                let data ={
                    uid: uid,
                    name: name,
                    lastName: lastName,
                    email: value.user.email,
                    enterprise: enterprise
                }
                setUser(data)
                storageUser(data)
            })
            .catch((error) =>{
                console.log(`Erro aqui ${error}`)
            })
        })
    }
    return(
        <AuthContext.Provider value={{signed: !!user, user, cadastro, logar, signOut, loadind}}>
            {children}
        </AuthContext.Provider>
    )
}
