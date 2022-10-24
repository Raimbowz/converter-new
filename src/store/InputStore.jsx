import { action,makeObservable,observable } from "mobx";

class InputStore {
    value= 0;
    type = 0;


    setValue(value){
        this.value = value;
    } 


    constructor(type){
        makeObservable(this,{
            value:observable,
           
            type:observable,
            setValue:action,
          
        });
        this.type = type;
    }
}

export default InputStore;
