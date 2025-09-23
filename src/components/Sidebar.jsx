import React from 'react'
import { FaRegBuilding, FaBars } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
import { MdOutlineInfo } from "react-icons/md";


const Sidebar = () => {
  return (
    <div className='flex'>
        <div className='w-20 md:w-64 bg-gray-500 transition-width duration-300'>
            <div className='flex justify-between items-center'>
                <h2 className='text-xl font-bold'>InfraMapa</h2>
                <button>
                    <FaBars size={24}/>
                </button>
            </div>

            <nav className='mt-4'>
                <ul>
                    <li className='flex items-center p-4 hover:bg-gray-700 cursor-pointer'>
                        <FaRegBuilding  size={24} />
                        <span className="ml-4 md:block">
                            Andar
                        </span>
                    </li>
                </ul>
                <ul>
                    <li className='flex items-center p-4 hover:bg-gray-700 cursor-pointer'>
                        <FaComputer  size={24} />
                        <span className="ml-4 md:block">
                            Dispositivos
                        </span>
                    </li>
                </ul>
                <ul>
                    <li className='flex items-center p-4 hover:bg-gray-700 cursor-pointer'>
                        <MdOutlineInfo  size={24} />
                        <span className="ml-4 md:block">
                            Detalhes
                        </span>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
  )
}

export default Sidebar;