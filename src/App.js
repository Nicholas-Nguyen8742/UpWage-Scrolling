import './styles/App.css';
import Filters from './components/Filters/Filters';
import data from './data/mockdata';
import features from './data/mockFeatures';


function App() {
  return (
    <main>
      <Filters data={data} features={features}/>
    </main>
  );
}

export default App;
