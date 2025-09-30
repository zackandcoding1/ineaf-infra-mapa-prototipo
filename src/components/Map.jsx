import { useRef, useState } from "react";
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
                    className="w-full h-auto max-w-4xl" />
            </div>

            {/* Marcadores dos Dispositivos */}
            {filteredDevices.map(device => (
                <div 
                key={device.id}
                onClick={() => onDeviceClick(device)}
                className={`absolute w-6 h-6 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center
                    ${device.status === 'online' ? 'bg-green-500' : 'bg-red-500'}
                    ${selectedDevice?.id === device.id
                        ? 'ring-4 ring-blue-400 scale-150 z-10'
                        : 'hover:scale-125 hover:ring-2 hover:ring-white'}
                    `}
                    style={{
                        left: `${device.x}px`,
                        top: `${device.y}px`,
                        transform: 'translate(-50%, -50%)'
                    }}
                    title={device.name}
                >
                    {/* Animação para o dispositivo selecionado */}
                    {selectedDevice?.id === device.id && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Map;