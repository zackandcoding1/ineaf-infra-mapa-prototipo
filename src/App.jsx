import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Map from "./components/Map";
import Details from "./components/Details";

function App() {
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);

  return (
    <div className="flex h-screen">
      <Sidebar
        selectedFloor={selectedFloor}
        setSelectedFloor={setSelectedFloor}
        selectedDevice={selectedDevice}
        setSelectedDevice={setSelectedDevice}
      />
      <Map
        selectedFloor={selectedFloor}
        selectedDevice={selectedDevice}
        onDeviceClick={setSelectedDevice}
      />
      <Details
        selectedFloor={selectedFloor}
        selectedDevice={selectedDevice}
        onDeviceClick={setSelectedDevice}/>
    </div>
  );
}

export default App;