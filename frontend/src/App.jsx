import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Map from './components/Map';
import Details from './components/Details';
import { devicesAPI } from './lib/api';

function App() {
    const [devices, setDevices] = useState([]);
    const [selectedFloor, setSelectedFloor] = useState(null);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [error, setError] = useState(null);

    // Carregando os dispositivos do backend
    useEffect(() => {
        fetchDevices();
    }, []);

    const fetchDevices = async () => {
        try {
            setError(null);
            const data = await devicesAPI.getAll();
            setDevices(data);
        } catch (err) {
            console.error('Erro ao buscar dispositivos:', err);
            setError('Erro ao conectar ao servidor.');
        }
    };

    // Atualizar dispositivo
    const updateDevice = async (updatedDevice) => {
        try {
            await devicesAPI.update(updatedDevice.id, updatedDevice);
            await fetchDevices(); // Recarrega os dispositivos após a atualização

            // Atualiza o dispositivo selecionado com os novos dados
            const updated = await devicesAPI.getById(updatedDevice.id);
            setSelectedDevice(updated);
        } catch (err) {
            console.error('Erro ao atualizar dispositivo:', err);
            throw err; // Propaga o erro para o modal tratar
        }
    };

    // Adicionar dispositivo
    const addDevice = async (newDevice) => {
        try {
            const createdDevice = await devicesAPI.create(newDevice);
            await fetchDevices();
            return createdDevice;
        } catch (err) {
            console.error('Erro ao adicionar dispositivo:', err);
            throw err;
        }
    };

    // Deletar dispositivo
    const deleteDevice = async (deviceId) => {
        if (!confirm('Tem certeza que deseja deletar este dispositivo?')) return;

        try {
            await devicesAPI.delete(deviceId);
            await fetchDevices();
            if (selectedDevice?.id === deviceId) {
                setSelectedDevice(null);
            }
        } catch (err) {
            console.error('Erro ao deletar dispositivo:', err);
            alert('Erro ao deletar dispositivo.');
        }
    };

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-lg">
                    <div className="text-5xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Erro de Conexão</h2>
                    <p className="text-gray-700 mb-6">{error}</p>
                    <button
                        onClick={fetchDevices}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold cursor-pointer"
                    >
                        Tentar Novamente
                    </button>
                </div>
            </div>
        );
    }

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
                    onDeleteDevice={deleteDevice}
                />
            )}
        </div>
    );
}

export default App;