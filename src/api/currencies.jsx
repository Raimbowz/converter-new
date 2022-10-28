const apiKey = '25418d26dc-23d4f61d1b-rkgfy2';
const options = {method: 'GET', headers: {accept: 'application/json'}};
const baseUrl = 'https://api.fastforex.io';

export const getCurrencies = async () =>{
    
    const url = baseUrl + '/currencies?&api_key='+apiKey;
    return new Promise((resolve,reject)=>{
        fetch(url, options)
        .then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    });     
}

export function fetchOne (from,to){
    const url = baseUrl + '/fetch-one?from='+from+'&to='+to+'&api_key='+apiKey;

    return new Promise((resolve,reject)=>{
       fetch(url, options)
        .then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
}

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

export const convert = async(from,to,amount) =>{
    const url = baseUrl + '/convert?from='+from+'&to='+to+'&amount'+amount+'&api_key='+apiKey;

    return new Promise((resolve,reject)=>{
        fetch(url, options)
        .then(response => response.json())
        .then(response => resolve(response))
        .catch(err => reject(err));
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
