import { useRef } from "react";
import InferiorMap from "../assets/inferior-map.svg?react";
import devicesData from "../data/devices.json";

function Map({ selectedFloor, selectedDevice, onDeviceClick }) {
    const svgRef = useRef(null);

    // Filtra os dispositivos para o andar selecionado
    const filteredDevices = selectedFloor !== null
        ? devicesData.filter(device => device.floor === selectedFloor)
        : [];

    return (
        <div className="p-8 bg-gray-100 min-h-screen flex-1">
            <h2 className="text-2xl font-bold mb-4">
                {selectedFloor === null
                    ? 'Selecione um andar'
                    : selectedFloor === 0
                        ? 'Térreo'
                        : `${selectedFloor}º Andar`
                }
            </h2>

            <div className="relative inline-block">
                <InferiorMap
                    ref={svgRef}
                    className="w-full h-150 max-w-4xl" />
                    
                {/* Marcadores dos Dispositivos */}
                {selectedDevice && (
                    <div
                        className={`absolute w-4 h-4 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center
                            ${selectedDevice.status === 'online' ? 'bg-green-500' : 'bg-red-500'}
                            ring-4 ring-blue-400 shadow-lg z-10
                        `}
                        style={{
                            left: `${selectedDevice.x}px`,
                            top: `${selectedDevice.y}px`,
                            transform: 'translate(-50%, -50%)'
                        }}
                        title={selectedDevice.name}
                    >
                        {/* Animação do marcador */}
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    </div>
                )}
            </div>

        </div>
    );
}

export default Map;