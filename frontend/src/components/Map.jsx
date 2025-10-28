import { useRef } from "react";
import InferiorMap from "../assets/inferior-map.svg?react";
import SuperiorMap from "../assets/superior-map.svg?react";

function Map({ devices, selectedFloor, selectedDevice, onDeviceClick }) {
    const svgRef = useRef(null);

    // Filtra os dispositivos para o andar selecionado
    const filteredDevices = selectedFloor !== null
        ? devices.filter(device => device.floor === selectedFloor)
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
                {selectedFloor == null
                    ? <p className="text-gray-500">Nenhum andar selecionado.</p>
                    : selectedFloor === 0
                        ? <InferiorMap
                            ref={svgRef}
                            className="w-full h-130 max-w-4xl"
                        />
                        : <SuperiorMap
                            ref={svgRef}
                            className="w-full h-100 max-w-6xl"
                        />}


                {/* Marcadores dos Dispositivos */}
                {filteredDevices.map(device => (
                    <div
                        key={device.id}
                        onClick={() => onDeviceClick(device)}
                        className={`absolute w-4 h-4 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center
                    ${device.status === 'online' ? 'bg-green-500' : 'bg-red-500'}
                    ${selectedDevice?.id === device.id
                                ? 'ring-4 ring-blue-400 scale-100 z-10'
                                : 'hover:scale-100 hover:ring-2 hover:ring-sky-300'}
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