
import { action,computed,makeObservable,observable } from "mobx";
 
import {fetchMulti} from '../api/currencies';


class RatesStore  {
    active= 0;
    data = [];

    handleChange(active){
        this.active = active;
    } 

    loadData(){
       if(this.data.length==0){
            fetchMulti().then((data)=>{
                this.data = data;
            }).catch( response => response );
       }
    }

    constructor(){
        makeObservable(this,{
            active:observable,
            handleChange:action,
            loadData:action,
            data:observable,
        });
    }
}

export default RatesStore;

