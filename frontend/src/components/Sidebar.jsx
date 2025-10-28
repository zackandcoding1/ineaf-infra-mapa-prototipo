import { FaRegBuilding } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";

const Sidebar = ({ devices, selectedFloor, setSelectedFloor, selectedDevice, setSelectedDevice }) => {

    // Extrai andares únicos e ordena
    const floors = [...new Set(devices.map(device => device.floor))].sort();

    const selectFloor = (floor) => {
        console.log(`Andar ${floor} selecionado`);
        setSelectedFloor(floor);
        setSelectedDevice(null);
    }

    const showDeviceDetails = (device) => {
        console.log(`Clicou no dispositivo ${device.id}`);
        setSelectedDevice(device);
    }

    // Filtra dispositivos com base no andar selecionado
    const filteredDevices = (selectedFloor === null || selectedFloor === undefined)
        ? []
        : devices.filter(device => device.floor === selectedFloor);

    return (
        <div className='flex'>
            <div className='w-30 md:w-64 bg-gray-500 transition-width duration-300 h-screen overflow-y-auto'>
                <div className='flex justify-between items-center p-4 border-b border-gray-600'>
                    <h2 className='text-xl font-bold text-white'>InfraMapa</h2>
                </div>

                <nav className='mt-4'>
                    {/* Seção de Andares */}
                    <div>
                        <div className='flex items-center p-4 text-white font-semibold'>
                            <FaRegBuilding size={24} />
                            <span className="ml-4 md:block">Andares</span>
                        </div>

                        {/* Lista de Andares */}
                        <div className='space-y-2 px-4 mb-4'>
                            {floors.map((floor) => (
                                <div
                                    key={floor}
                                    onClick={() => selectFloor(floor)}
                                    className={`p-3 rounded-md cursor-pointer transition-colors w-full ${selectedFloor === floor
                                        ? 'bg-zinc-600 text-white'
                                        : 'bg-gray-600 text-gray-200 hover:bg-gray-700'
                                        }`}>
                                    <div className="flex items-center justify-between">
                                        <span className='md:block'>
                                            {floor === 0 ? 'Térreo' : `${floor}º Andar`}
                                        </span>
                                        <span className="">
                                            {floor === 0 ? <IoHomeOutline size={18} /> : <FaRegBuilding size={18} />}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Seção de Dispositivos */}
                    <div>
                        <div className='flex items-center p-4 text-white font-semibold'>
                            <FaComputer size={24} />
                            <span className="ml-4 md:block">
                                Dispositivos
                                {selectedFloor !== null && (
                                    <span className="ml-2 px-2 py-1 rounded-full">
                                        {` (${filteredDevices.length})`}
                                    </span>
                                )}
                            </span>
                        </div>

                        {/* Lista de Dispositivos */}
                        <div className='overflow-y-auto max-h-80 mx-2
                                [&::-webkit-scrollbar]:w-2
                                [&::-webkit-scrollbar-thumb]:rounded-full
                                [&::-webkit-scrollbar-track]:bg-gray-600
                                [&::-webkit-scrollbar-thumb]:bg-gray-400
                                hover:[&::-webkit-scrollbar-thumb]:bg-gray-300'>
                            {selectedFloor === null ? (
                                <p className='text-sm text-gray-300 p-4 text-center'>
                                    Selecione um andar para ver os dispositivos.
                                </p>
                            ) : filteredDevices.length === 0 ? (
                                <p className='text-sm text-gray-300 p-4 text-center'>
                                    Nenhum dispositivo encontrado neste andar.
                                </p>
                            ) : (
                                filteredDevices.map((device) => (
                                    <div
                                        onClick={() => showDeviceDetails(device)}
                                        key={device.id}
                                        className={`p-4 m-2 rounded-lg border cursor-pointer transition-all ${selectedDevice?.id === device.id
                                            ? 'bg-sky-600 border-sky-400 text-white'
                                            : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-100 hover:text-sky-700'
                                            }`}>
                                        <h3 className='font-semibold mb-1'>{device.name}</h3>
                                        <p className='text-xs opacity-75'>IP: {device.ip}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar;