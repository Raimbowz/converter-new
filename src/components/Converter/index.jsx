import switcher from "../../img/swap.svg";
import styles from './Converter.module.css';
 
import React,{ useEffect } from 'react';
import { observer } from   'mobx-react';
import Input from '../Input';
import SelectBox from '../Select';
import SelectStore from '../../store/SelectStore';
import InputStore from '../../store/InputStore';
import CurrenciesStore from '../../store/CurrenciesStore';
import {getCurrencyByIp} from '../../api/currencies';
import Grid from '@mui/material/Unstable_Grid2'; 
import Container from '@mui/material/Container';

const currenciesStore = new CurrenciesStore();

var currrencyFrom = localStorage.getItem('currencyFrom');
var currrencyTo = localStorage.getItem('currencyTo');

if(!currrencyFrom){
  getCurrencyByIp().then((res)=>{
    currenciesStore.currency = res.currency;
    localStorage.setItem('currencyFrom',res.currency);
    currenciesStore.getRates(res.currency).then(function(){
      selectStoreFrom.value = res.currency;
    });
  });
}

const typeFrom = 1;
const selectStoreFrom = new SelectStore(typeFrom,currrencyFrom);
const selectStoreTo = new SelectStore(!typeFrom,currrencyTo);
const inputStoreFrom = new InputStore(typeFrom);
const inputStoreTo = new InputStore(!typeFrom);

const Converter =  ()  =>{
  useEffect(() => {
    currenciesStore.loadData().then(()=>{
      currenciesStore.getRates(currrencyFrom);

    });
  }, []); 

  currenciesStore.inputStoreFrom = inputStoreFrom;
  currenciesStore.inputStoreTo = inputStoreTo;
  currenciesStore.selectStoreTo = selectStoreTo;
  currenciesStore.selectStoreFrom = selectStoreFrom;
  
  function currencyChange(){
    currenciesStore.swap();
  }

  return (
    <Container maxWidth="md" className={styles['main-container']}>
      <Grid  container spacing={2}>
        <Grid  xs={12} md={5}>
            <SelectBox label='У меня есть' 
            currencies={currenciesStore.data} 
            selectStore={selectStoreFrom} 
            currenciesStore={currenciesStore}/>
            <Input inputStore={inputStoreFrom} 
            currenciesStore={currenciesStore}  />
        </Grid>
        <Grid className={styles.Converter} xs>
          <img className={styles['switcher-img']} src={switcher} onClick={currencyChange} alt='Поменять валюты местами' />
        </Grid>
        <Grid  xs={12} md={5}>
            <SelectBox label='Я получу'
            currencies={currenciesStore.data}
            selectStore={selectStoreTo} 
            currenciesStore={currenciesStore}/>
            <Input inputStore={inputStoreTo} 
            currenciesStore={currenciesStore}
            />
        </Grid>
      </Grid>
    </Container>
  );
};

export default observer(Converter);