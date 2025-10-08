import { MdOutlineInfo, MdOutlineMonitorHeart } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FaWifi, FaRegHdd } from "react-icons/fa";

const Details = ({ selectedFloor, setSelectedFloor, selectedDevice, setSelectedDevice }) => {
    return (
        <div className='w-30 md:w-80 bg-gray-500 transition-width duration-300 h-screen overflow-y-auto'>
            {/* Seção de Detalhes */}
            <div className='flex items-center p-4 text-white font-semibold border-t border-gray-600'>
                <MdOutlineInfo size={24} />
                <span className="ml-4 md:block">Detalhes</span>
            </div>

            {/* Painel de Detalhes */}
            <div className='p-4 bg-gray-600 rounded-lg m-2'>
                {selectedDevice ? (
                    <div className='bg-white rounded-lg p-4 shadow-md'>
                        <h3 className='font-bold text-lg mb-3 bg-gray-200 pb-2'>
                            {selectedDevice.name}
                        </h3>
                        <div className='space-y-2'>
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <IoLocationOutline />
                                    <span className="font-semibold text-lg">Localização</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='font-medium text-gray-600'>Andar:</span>
                                    <span className='text-gray-900'>
                                        {selectedDevice.floor === 0 ? 'Térreo' : `${selectedDevice.floor}º Andar`}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-600">Sala:</span>
                                    <span className="text-gray-900 font-mono text-xs">{selectedDevice.room}</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <FaWifi />
                                    <span className="font-semibold text-lg">Rede</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-600">Endereço IP:</span>
                                    <span className="text-gray-900 font-mono text-xs">
                                        {selectedDevice.ip}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-600">Endereço MAC:</span>
                                    <span className="text-gray-900 font-mono text-xs">
                                        {selectedDevice.mac}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <FaRegHdd />
                                    <span className="font-semibold text-lg">Especificações</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-600">SO:</span>
                                    <span className="text-gray-900 font-mono text-xs">{selectedDevice.os}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-600">Processador:</span>
                                    <span className="text-gray-900 font-mono text-xs">{selectedDevice.cpu}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-600">Memória RAM:</span>
                                    <span className="text-gray-900 font-mono text-xs">{selectedDevice.ram}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-600">Armazenamento:</span>
                                    <span className="text-gray-900 font-mono text-xs">{selectedDevice.storage}</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <MdOutlineMonitorHeart />
                                    <span className="font-semibold text-lg">Monitoramento</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-600">Última conexão:</span>
                                    <span className="text-gray-900 font-mono text-xs">{selectedDevice.lastConnection}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-600">Tempo ativo:</span>
                                    <span className="text-gray-900 font-mono text-xs">{selectedDevice.uptime}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='font-medium text-gray-600'>Status:</span>
                                    <span className={`font-semibold ${selectedDevice.status === 'online'
                                        ? 'text-green-600'
                                        : 'text-red-600'
                                        }`}>
                                        {selectedDevice.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className='text-sm text-gray-300 text-center py-4'>
                        Selecione um dispositivo para ver os detalhes.
                    </p>
                )}
            </div>
        </div>
    )
}

export default Details