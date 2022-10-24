import Converter from './components/Converter';
import { configure } from "mobx"

configure({
    enforceActions: "never",
})

function App() {
  return (
      <Converter/>
  )
}

export default App;
