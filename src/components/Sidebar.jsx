import React, { useState } from 'react';
import { FaRegBuilding, FaBars } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
import { MdOutlineInfo } from "react-icons/md";
import devicesData from "../data/devices.json";


const Sidebar = () => {
    const [selectedDevice, setSelectedDevice] = useState(null);

    const showDeviceDetails = (device) => {
        console.log(`Clicou no dispositivo ${device.id}`);
        setSelectedDevice(device);
    };

    return (
        <div className='flex'>
            <div className='w-20 md:w-80 bg-gray-500 transition-width duration-300'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-xl font-bold'>InfraMapa</h2>
                </div>

                <nav className='mt-4'>
                    <div className='flex items-center p-4 hover:bg-gray-700 cursor-pointer'>
                        <FaRegBuilding size={24} />
                        <span className="ml-4 md:block">
                            Andar
                        </span>
                    </div>
                    <div className='flex items-center p-4 hover:bg-gray-700 cursor-pointer'>
                        <FaComputer size={24} />
                        <span className="ml-4 md:block">
                            Dispositivos
                        </span>
                    </div>
                    <div className="overflow-y-auto max-h-92
                        [&::-webkit-scrollbar]:w-3
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:border-white
                        [&::-webkit-scrollbar-track]:bg-gray-100 
                        [&::-webkit-scrollbar-thumb]:bg-gray-300 
                        dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                        {devicesData.map((device) =>
                            <div onClick={() => showDeviceDetails(device)} key={device.id} className="p-4 m-2 text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer">
                                <h3 className="font-semibold mb-1">{device.name}</h3>
                            </div>
                        )}
                    </div>
                    <div className='flex items-center p-4 hover:bg-gray-700 cursor-pointer'>
                        <MdOutlineInfo size={24} />
                        <span className="ml-4 md:block">
                            Detalhes
                        </span>
                    </div>

                    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mt-2">
                        {selectedDevice ? (
                            <div className="text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                <h3 className="font-semibold mb-2">{selectedDevice.name}</h3>
                                <p>IP: {selectedDevice.ip}</p>
                                <p>MAC: {selectedDevice.mac}</p>
                                <p>SO: {selectedDevice.os}</p>
                                <p>Status: {selectedDevice.status}</p>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">Selecione um dispositivo para ver os detalhes</p>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar;