import { useState } from "react";
import { MdOutlineInfo, MdOutlineMonitorHeart } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FaWifi, FaRegHdd } from "react-icons/fa";
import EditDeviceInfo from "./EditDeviceInfo";

const Details = ({ selectedDevice, setSelectedDevice, onUpdateDevice, onDeleteDevice }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSave = (updatedDevice) => {
        onUpdateDevice(updatedDevice);
    };

    return (
        <>
            <div className="w-30 md:w-80 bg-gray-500 transition-width duration-300 h-screen overflow-y-auto">
                {/* Cabeçalho */}
                <div className="flex justify-between items-center px-4 py-2">
                    {/* Esquerda: ícone + texto */}
                    <div className="flex items-center space-x-2">
                        <MdOutlineInfo size={24} />
                        <span className="font-semibold">Detalhes</span>
                    </div>

                    {/* Direita: botão Editar */}
                    {selectedDevice && (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="p-2 cursor-pointer"
                            title="Editar Dispositivo"
                        >
                            <span className="rounded-md hover:bg-gray-600 transition-colors">Editar</span>
                        </button>
                    )}
                </div>

                {/* Painel de Detalhes */}
                <div className="p-4 bg-gray-600 rounded-lg m-2">
                    {selectedDevice ? (
                        <div className="bg-white rounded-lg p-4 shadow-md">
                            <h3 className="font-bold text-lg mb-3 bg-gray-200 pb-2">
                                {selectedDevice.name}
                            </h3>
                            <div className="space-y-2">
                                {/* Localização */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <IoLocationOutline />
                                        <span className="font-semibold text-lg">Localização</span>
                                    </div>
                                    <div className="bg-gray-300 rounded-xl h-16 mb-2 flex flex-col justify-center px-3">
                                        <div className="flex justify-between">
                                            <span className="font-medium text-gray-600">Andar:</span>
                                            <span className="text-gray-900 font-mono text-xs">
                                                {selectedDevice.floor === 0 ? 'Térreo' : `${selectedDevice.floor}º Andar`}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium text-gray-600">Sala:</span>
                                            <span className="text-gray-900 font-mono text-xs">{selectedDevice.room}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Rede */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaWifi />
                                        <span className="font-semibold text-lg">Rede</span>
                                    </div>
                                    <div className="bg-gray-300 rounded-xl h-16 mb-2 flex flex-col justify-center px-3">
                                        <div className="flex justify-between">
                                            <span className="font-medium text-gray-600">Endereço IP:</span>
                                            <span className="text-gray-900 font-mono text-xs">{selectedDevice.ip}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium text-gray-600">Endereço MAC:</span>
                                            <span className="text-gray-900 font-mono text-xs">{selectedDevice.mac}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Especificações */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaRegHdd />
                                        <span className="font-semibold text-lg">Especificações</span>
                                    </div>
                                    <div className="bg-gray-300 rounded-xl mb-2 flex flex-col justify-center px-3 py-2">
                                        <div className="flex justify-between">
                                            <span className="font-medium text-gray-600">Tipo:</span>
                                            <span className="text-gray-900 font-mono text-xs">{selectedDevice.type}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="font-medium text-gray-600">SO:</span>
                                            <span className="text-gray-900 font-mono text-xs">{selectedDevice.os}</span>
                                        </div>
                                        {selectedDevice.cpu && (
                                            <>
                                                <div className="flex justify-between">
                                                    <span className="font-medium text-gray-600">Processador:</span>
                                                    <span className="text-gray-900 font-mono text-xs">{selectedDevice.cpu}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="font-medium text-gray-600">RAM:</span>
                                                    <span className="text-gray-900 font-mono text-xs">{selectedDevice.ram}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="font-medium text-gray-600">Armazenamento:</span>
                                                    <span className="text-gray-900 font-mono text-xs">{selectedDevice.storage}</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Monitoramento */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <MdOutlineMonitorHeart />
                                        <span className="font-semibold text-lg">Monitoramento</span>
                                    </div>
                                    <div className="bg-gray-300 rounded-xl mb-2 flex flex-col justify-center px-3 py-2">
                                        {selectedDevice.lastConnection && (
                                            <div className="flex justify-between">
                                                <span className="font-medium text-gray-600">Última conexão:</span>
                                                <span className="text-gray-900 font-mono text-xs">{selectedDevice.lastConnection}</span>
                                            </div>
                                        )}
                                        {selectedDevice.uptime && (
                                            <div className="flex justify-between">
                                                <span className="font-medium text-gray-600">Tempo ativo:</span>
                                                <span className="text-gray-900 font-mono text-xs">{selectedDevice.uptime}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between">
                                            <span className="font-medium text-gray-600">Status:</span>
                                            <span
                                                className={`font-semibold ${selectedDevice.status === 'online'
                                                    ? 'text-green-600'
                                                    : 'text-red-600'
                                                    }`}
                                            >
                                                {selectedDevice.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-300 text-center py-4">
                            Selecione um dispositivo para ver os detalhes.
                        </p>
                    )}
                </div>
            </div>

            {/* Modal de Edição */}
            <EditDeviceInfo
                device={selectedDevice}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
            />
        </>
    );
};

export default Details;
