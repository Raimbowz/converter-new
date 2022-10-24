import axios from "axios";


const apiKey = '94c4c27169-8dc6b059fe-rk1q86';
const axiosConfig = {
    headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
}
};
const options = {method: 'GET', headers: {accept: 'application/json'}};
const baseUrl = 'https://api.fastforex.io';

export const getCurrencies = async () =>{
    
    const url = baseUrl + '/currencies?&api_key='+apiKey;
    return new Promise((resolve,reject)=>{
        axios.post(url,{},axiosConfig)
            .then( response => resolve(response.data.currencies) )
            .catch( response => reject(response) )
    });  
    
    
}

export function fetchOne (from,to){
    const url = baseUrl + '/fetch-one?from='+from+'&to='+to+'&api_key='+apiKey;

    return new Promise((resolve,reject)=>{
        axios.post(url,{},this.axiosConfig)
            .then( response => resolve(response.data) )
            .catch( response => reject(response) )
    });
}

/*  Получить несколько курсов валют одновременно
*
*  @from Базовая валюта, по умолчанию USD , 3 символа
*  @to Целевые Валюты, разделенные запятой
*/


export function fetchMulti(from,to) {
    console.log([from,to]);
    const url = baseUrl + '/fetch-multi?from='+from+'&to='+to+'&api_key='+apiKey;

    return new Promise((resolve,reject)=>{
        fetch(url, options)
        .then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
}


/*
*  Получить несколько курсов валют одновременно
*
*  @from Базовая валюта, по умолчанию USD , 3 символа
*  @to Целевые Валюты, разделенные запятой
*/

export const convert = async(from,to,amount) =>{
    const url = baseUrl + '/convert?from='+from+'&to='+to+'&amount'+amount+'&api_key='+apiKey;

    return new Promise((resolve,reject)=>{
        axios.post(url,{},this.axiosConfig)
            .then( response => resolve(response.data) )
            .catch( response => reject(response) )
    });
}

export function fetchAll(from) {

    const url = baseUrl + '/fetch-all?from='+from+'&api_key='+apiKey;

    return new Promise((resolve,reject)=>{
        fetch(url, options)
          .then(response => response.json())
          .then(response => resolve(response))
          .catch(err => reject(err));

    });
}



export function  getCurrencyByIp (){
    const url = 'https://ipapi.co/json';

    return new Promise((resolve,reject)=>{
        fetch('https://ipapi.co/json/')
        .then(function(response) {
          response.json().then(jsonData => {
            resolve(jsonData);
          });
        })
        .catch(function(error) {
            reject(error)
        });
    });
}
