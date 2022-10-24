import { observer } from 'mobx-react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import styles from './Input.module.css';

const Input = ({inputStore,currenciesStore}) => {

    function setValue({target}){
        inputStore.value = target.value;

        if(inputStore.type){
            currenciesStore.inputStoreTo.value = currenciesStore.calc(target.value,inputStore.type,2)
        }else{
            currenciesStore.inputStoreFrom.value = currenciesStore.calc(target.value,inputStore.type,2);
        }
        if(currenciesStore.inputStoreFrom.value > 0 && currenciesStore.inputStoreTo.value > 0){
            currenciesStore.getDopText(inputStore.type);
        }
    }
    
    return (
        <Box>
            <TextField  
                focused  
                type='number'  
                className={styles['valueField']} 
                sx={{ mt:'-2px', fontSize:'1.2rem', width: '100%', border: 0 }}
                value={inputStore.value} 
                onChange={setValue}/>
            <TextField 
                disabled 
                className={styles['customField']}
                sx={{ mt:'-1px', width: '100%' , border:0, height:'60px'}}
                InputProps={{
                    startAdornment: 
                    <InputAdornment className={styles['textDop']}
                    position="start">
                        {inputStore.type ? currenciesStore.dopTextFrom : currenciesStore.dopTextTo}
                    </InputAdornment>,
                }}
            />
        </Box>
    )
};

export default observer(Input);