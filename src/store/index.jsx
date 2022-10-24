import {injectStores} from '@mobx-devtools/tools';

import InputStore from './InputStore';
import SelectStore from './SelectStore';
import CurrenciesStore from './CurrenciesStore';
import RatesStore from './RatesStore';

const inputStore = new InputStore();
const currenciesStore = new CurrenciesStore();
const selectStore = new SelectStore();
const ratesStore = new RatesStore();

injectStores({
    inputStore,selectStore,currenciesStore,ratesStore
});

export {inputStore,selectStore,currenciesStore,ratesStore};