import React, { useState, useRef } from 'react';
import { FaRegBuilding } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
import { MdOutlineInfo } from "react-icons/md";
import devicesData from "../data/devices.json";

const Sidebar = () => {
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [selectedFloor, setSelectedFloor] = useState(null);

    // Extrai andares únicos e ordena
    const floors = [...new Set(devicesData.map(device => device.floor))].sort();

    const selectFloor = (floor) => {
        console.log(`Andar ${floor} selecionado`);
        setSelectedFloor(floor);
        setSelectedDevice(null); // Limpa o dispositivo selecionado ao mudar de andar
    }

    const showDeviceDetails = (device) => {
        console.log(`Clicou no dispositivo ${device.id}`);
        setSelectedDevice(device);
    }

    // Filtra dispositivos com base no andar selecionado
    const filteredDevices = (selectedFloor === null || selectedFloor === undefined)
        ? []
        : devicesData.filter(device => device.floor === selectedFloor);

    return (
        <div className='flex'>
            <div className='w-20 md:w-80 bg-gray-500 transition-width duration-300 h-screen overflow-y-auto'>
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
                        <div className='ml-4 mb-2'>
                            {floors.map((floor) => (
                                <div
                                    key={floor}
                                    onClick={() => selectFloor(floor)}
                                    className={`p-3 mx-2 rounded-md cursor-pointer transition-colors ${selectedFloor === floor
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-600 text-gray-200 hover:bg-gray-700'}`}>
                                    <span className='ml-4 md:block'>
                                        {floor === 0 ? 'Térreo' : `${floor}º Andar`}
                                    </span>
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
                                {/* {selectedFloor !== null && (
                                    <span className="ml-2 px-2 py-1 rounded-full">
                                        {` (${filteredDevices.length})`}
                                    </span>
                                )} */}
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
                                            ? 'bg-blue-600 border-blue-400 text-white'
                                            : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-100 hover:text-blue-700'
                                            }`}>
                                        <h3 className='font-semibold mb-1'>{device.name}</h3>
                                        <p className='text-xs opacity-75'>IP: {device.ip}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Seção de Detalhes */}
                    <div className='flex items-center p-4 text-white font-semibold border-t border-gray-600'>
                        <MdOutlineInfo size={24} />
                        <span className="ml-4 md:block">Detalhes</span>
                    </div>

                    {/* Painel de Detalhes */}
                    <div className='p-4 bg-gray-600 rounded-lg m-2'>
                        {selectedDevice ? (
                            <div className='bg-white rounded-lg p-4 shadow-md'>
                                <h3 className='font-bold text-lg mb-3 text-gray-800 border-b pb-2'>
                                    {selectedDevice.name}
                                </h3>
                                <div className='space-y-2'>
                                    <div className='flex justify-between'>
                                        <span className='font-medium text-gray-600'>Andar:</span>
                                        <span className='text-gray-900'>
                                            {selectedDevice.floor === 0 ? 'Térreo' : `${selectedDevice.floor}º Andar`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-600">IP:</span>
                                        <span className="text-gray-900 font-mono text-xs">
                                            {selectedDevice.ip}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-600">MAC:</span>
                                        <span className="text-gray-900 font-mono text-xs">
                                            {selectedDevice.mac}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-600">SO:</span>
                                        <span className="text-gray-900">{selectedDevice.os}</span>
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

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedDevice(null);
                                    }}
                                    className='mt-4 w-full px-3 py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors cursor-pointer'>
                                    Fechar
                                </button>
                            </div>
                        ) : (
                            <p className='text-sm text-gray-300 text-center py-4'>
                                Selecione um dispositivo para ver os detalhes.
                            </p>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar;