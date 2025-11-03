import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const EditDeviceInfo = ({ device, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        id: "",
        floor: 0,
        room: "",
        name: "",
        type: "Desktop",
        ip: "",
        mac: "",
        os: "",
        cpu: "",
        ram: "",
        storage: "",
        lastConnection: "",
        uptime: "",
        status: "offline",
        x: 0,
        y: 0
    });

    const [loading, setLoading] = useState(false);

    // Preenche o formulário quando o dispositivo muda
    useEffect(() => {
        if (device) {
            setFormData({
                ...device,
                // Garante que os valores padrão sejam definidos
                type: device.type || "Desktop",
                cpu: device.cpu || "",
                ram: device.ram || "",
                storage: device.storage || "",
                lastConnection: device.lastConnection || "",
                uptime: device.uptime || ""
            });
        }
    }, [device]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Definine quais campos são numéricos
        const numericFields = ['floor', 'x', 'y', 'id'];

        setFormData(prev => ({
            ...prev,
            [name]: numericFields.includes(name) ? Number(value) : value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await onSave(formData);
            onClose();
        } catch (error) {
            console.error('Erro ao salvar:', error);
            alert('Erro ao salvar as alterações. Tente novamente.');
        } finally {
            setLoading(false);
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto text-white">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                    <p className="text-xl font-bold">Editar Dispositivo</p>
                    <button
                        onClick={onClose}
                        className="hover:bg-gray-700 p-2 rounded-full transition-colors cursor-pointer">
                        <IoClose size={24} />
                    </button>
                </div>

                {/* Formulário */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Informações Básicas */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Informações Básicas</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Nome do Dispositivo
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Status
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="online">Online</option>
                                    <option value="offline">Offline</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Andar
                                </label>
                                <select
                                    name="floor"
                                    value={formData.floor}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value={0}>Térreo</option>
                                    <option value={1}>1º Andar</option>
                                </select>
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium mb-2">
                                    Sala
                                </label>
                                <input
                                    type="text"
                                    name="room"
                                    value={formData.room}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Informações de Rede */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Informações de Rede</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Endereço IP
                                </label>
                                <input
                                    type="text"
                                    name="ip"
                                    value={formData.ip}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    // pattern="^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Endereço MAC
                                </label>
                                <input
                                    type="text"
                                    name="mac"
                                    value={formData.mac}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Especificações do Sistema */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Especificações do Sistema</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Tipo
                                </label>
                                <select
                                    name="type"
                                    value={formData.type || 'Desktop'}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Desktop">Desktop</option>
                                    <option value="Notebook">Notebook</option>
                                    <option value="Servidor">Servidor</option>
                                </select>
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium mb-2">
                                    Sistema Operacional
                                </label>
                                <input
                                    type="text"
                                    name="os"
                                    value={formData.os}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Processador (opcional)
                                </label>
                                <input
                                    type="text"
                                    name="cpu"
                                    value={formData.cpu || ''}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Memória RAM (opcional)
                                </label>
                                <input
                                    type="text"
                                    name="ram"
                                    value={formData.ram || ''}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium mb-2">
                                    Armazenamento (opcional)
                                </label>
                                <input
                                    type="text"
                                    name="storage"
                                    value={formData.storage || ''}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Posição no Mapa */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Posição no Mapa</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Posição X
                                </label>
                                <input
                                    type="number"
                                    name="x"
                                    value={formData.x}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Posição Y
                                </label>
                                <input
                                    type="number"
                                    name="y"
                                    value={formData.y}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Botões */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors cursor-pointer"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors cursor-pointer"
                        >
                            Salvar Alterações
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default EditDeviceInfo;