import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Map from './components/Map';
import Details from './components/Details';
import devicesDataJSON from './data/devices.json';

function App() {
    const [devices, setDevices] = useState([]);
    const [selectedFloor, setSelectedFloor] = useState(null);
    const [selectedDevice, setSelectedDevice] = useState(null);

    // Carrega os dados inicialmente
    useEffect(() => {
        // Tenta carregar do localStorage primeiro
        const savedDevices = localStorage.getItem('infraMapaDevices');
        if (savedDevices) {
            setDevices(JSON.parse(savedDevices));
        } else {
            setDevices(devicesDataJSON);
        }
    }, []);

    // Salva no localStorage sempre que os devices mudarem
    useEffect(() => {
        if (devices.length > 0) {
            localStorage.setItem('infraMapaDevices', JSON.stringify(devices));
        }
    }, [devices]);

    // Função para atualizar um dispositivo
    const updateDevice = (updatedDevice) => {
        setDevices(prevDevices =>
            prevDevices.map(device =>
                device.id === updatedDevice.id ? updatedDevice : device
            )
        );
        // Atualiza o dispositivo selecionado também
        setSelectedDevice(updatedDevice);
    };

    // // Função para adicionar dispositivo (opcional)
    // const addDevice = (newDevice) => {
    //     setDevices(prevDevices => [...prevDevices, newDevice]);
    // };

    // // Função para deletar dispositivo (opcional)
    // const deleteDevice = (deviceId) => {
    //     setDevices(prevDevices =>
    //         prevDevices.filter(device => device.id !== deviceId)
    //     );
    //     if (selectedDevice?.id === deviceId) {
    //         setSelectedDevice(null);
    //     }
    // };

    return (
        <div className='flex h-screen'>
            <Sidebar
                devices={devices}
                selectedFloor={selectedFloor}
                setSelectedFloor={setSelectedFloor}
                selectedDevice={selectedDevice}
                setSelectedDevice={setSelectedDevice}
            />
            <Map
                devices={devices}
                selectedFloor={selectedFloor}
                selectedDevice={selectedDevice}
                onDeviceClick={setSelectedDevice}
            />
            {selectedDevice && (
                <Details
                    selectedDevice={selectedDevice}
                    setSelectedDevice={setSelectedDevice}
                    onUpdateDevice={updateDevice}
                    // onDeleteDevice={deleteDevice}
                />
            )}
        </div>
    );
}

export default App;