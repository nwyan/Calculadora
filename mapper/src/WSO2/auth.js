import React, { useState, useEffect } from 'react';
import { AUTH_CONFIG } from './config';
import {queryString} from 'query-string';
const Auth = (props) => {
    //const {} = props

    const [accesToken, setAccesToken] = useState();
    const [expiresAt, setExpiresAt] = useState();

    var url = AUTH_CONFIG.authUrl + "?response_type=id_token token&client_id="
        + AUTH_CONFIG.clientId + "&scope=openid&nonce=13e2312637dg136e1&";
    var redirectUrl = "redirect_uri=" + AUTH_CONFIG.callbackUrl;
    url = url + redirectUrl;
    window.location.href = url;


    useEffect(() => {
        handleAuthentication();
    }, [])


    const handleAuthentication = () =>{
        const authResult = queryString.parse(window.location.hash);
        console.log(authResult)
        if(authResult && authResult.access_token){
            localStorage.setItem('isLoggedIn','true');

            //Tempo de acesso a sessão expira em
            let expiresAt = (authResult.expires_in * 1000) + new Date().getTime();
            setAccesToken(authResult.access_token)
            setExpiresAt(expiresAt);

            localStorage.setItem('accessToken', accesToken)
        }
        else{
            console.log('Ocorreu um erro enquanto era feita a autenticação');
            alert('Erro ao tentar logar, cheque seu console para poder checar')
        }
    }

}
export default Auth;
