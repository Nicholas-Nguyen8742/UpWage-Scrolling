import "./styles/App.css";
import Filters from "./components/Filters/Filters";
import MapContainer from "./components/MapContainer/MapContainer";
import data from "./data/mockdata";
import features from "./data/mockFeatures";

function App() {
  return (
    <main>
      <Filters data={data} features={features.features} />
        <MapContainer locations={features.locations} />
    </main>
  );
}

export default App;
