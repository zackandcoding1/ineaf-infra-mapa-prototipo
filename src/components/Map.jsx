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
        <div className="p-8 min-h-screen flex-1">
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
                {filteredDevices.map(device => (
                    <div
                        key={device.id}
                        onClick={() => onDeviceClick(device)}
                        className={`absolute w-5 h-5 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center
                    ${device.status === 'online' ? 'bg-green-500' : 'bg-red-500'}
                    ${selectedDevice?.id === device.id
                                ? 'ring-4 ring-blue-400 scale-100 z-10'
                                : 'hover:scale-100 hover:ring-2 hover:ring-white'}
                    `}
                        style={{
                            left: `${device.x}px`,
                            top: `${device.y}px`,
                            transform: 'translate(-50%, -50%)'
                        }}
                        title={device.name}
                    >
                        {/* Animação do marcador */}
                        {selectedDevice?.id === device.id &&
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        }
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Map;