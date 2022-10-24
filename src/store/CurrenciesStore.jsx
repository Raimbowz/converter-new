import { action,computed,makeObservable,observable } from "mobx";
import {getCurrencies,fetchAll} from '../api/currencies';

class CurrenciesStore  {
    data = [];
    rates = {};
    activeRate = 0;
    currency = '';
    selectStoreTo = {};
    selectStoreFrom = {};
    inputStoreTo = {}
    inputStoreFrom = {};
    dopTextFrom = '';
    dopTextTo = '';

    constructor(){
        makeObservable(this,{
            data:observable,
            selectStoreTo:observable,
            selectStoreFrom:observable,
            inputStoreTo:observable,
            inputStoreFrom:observable,
            activeRate:observable,
            dopTextFrom:observable,
            dopTextTo:observable,
            currency:observable,
            loadData:action,
            getRates:action,
            calc:action,
            swap:action,
            getActiveRate:action,
        });
    }

    loadData(){
        return new Promise((resolve,reject)=>{
            if(this.data.length==0){
                getCurrencies().then((currencies)=>{
                    this.data = currencies;
                    resolve();
                }).catch((response) => { reject(response) });
            }else{
                reject();
            }
        }); 
    }

    getRates(from){
        if(from){
            return new Promise((resolve,reject)=>{
                fetchAll(from)
                .then((data) => {
                    this.rates = data.results; 
                    this.getActiveRate();
                    if(this.inputStoreFrom.value>0){
                        this.getDopText();
                    }
                    resolve();
                })
                .catch((response) => { reject(response) }); 
            }); 
        }  
    }

    getActiveRate(){
        Object.entries(this.rates).map((keyName,i) => {
            if(keyName[0] == this.selectStoreTo.value){
                this.activeRate = keyName[1];
                return 1;
            }
        })
    }

    calc(value,type,toFixed=3) {
        let result,toFixedRes;
        if(!this.activeRate){
            this.getActiveRate();
        }

        type ? result = this.activeRate * value : result = value / this.activeRate;
    
        if(result>0){
            toFixedRes = toFixed;
        }else{
            toFixedRes = toFixed+1;
        }

        return result.toFixed(toFixed);
    }

    swap(){
       let selectTo =  this.selectStoreTo.value;
       let selectFrom = this.selectStoreFrom.value;
       let valueTo = this.inputStoreTo.value;
       let valueFrom = this.inputStoreFrom.value;

       this.selectStoreTo.value = selectFrom;
       this.selectStoreFrom.value = selectTo;

       this.getRates(selectTo).then(()=>{
            if(!this.activeRate){
                this.getActiveRate();
            }
            this.inputStoreTo.value = this.calc(valueFrom,1,2);
       });

       this.getDopText();
    }

    getDopText(){
        let SPACE = ' ';
        let resTo = this.calc(1,0);
        let resFrom = this.calc(1,1);

        this.dopTextFrom = 1 + SPACE + this.selectStoreFrom.value + SPACE +
        '=' + SPACE + resFrom + SPACE +
        this.selectStoreTo.value;

        if(this.selectStoreTo.value!=''){
            this.dopTextTo = 1 + SPACE + this.selectStoreTo.value + SPACE + 
            '=' + SPACE + resTo + SPACE + 
            this.selectStoreFrom.value;
        }else{
            this.dopTextTo = '';
        }
    }
}

export default CurrenciesStore;

