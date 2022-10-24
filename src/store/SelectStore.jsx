import { action,makeObservable,observable } from "mobx";

class SelectStore {
    value = '';
    label = '';
    type = 0;

    constructor(type=0,value=null){
        makeObservable(this,{
            value:observable,
            label:observable,
            handleValueChange:action,
            handleLabelChange:action,
        });
        this.type = type;
        if(value!=null){
            this.value = value;
        }
    }

    handleValueChange(value){
        this.value = value;
    } 

    handleLabelChange(value){ 
        this.value = value;
    }  
}

export default SelectStore;
