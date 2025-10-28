const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8800/api';

// Objeto com as funções para manipular dispositivos
export const devicesAPI = {
    // Função para buscar todos os dispositivos
    // GET http://localhost:8800/api/devices
    async getAll() {
        try {
            const response = await fetch(`${API_URL}/devices`);

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Erro ao buscar dispositivos:", error);
            throw error;
        }
    },

    // Buscar um dispositivo por ID
    // GET http://localhost:8800/api/devices/:id
    async getById(id) {
        try {
            const response = await fetch(`${API_URL}/devices/${id}`);

            if (!response.ok) {
                throw new Error(`Dispositivo não encontrado: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Erro ao buscar dispositivo ${id}:`, error);
            throw error;
        }
    },

    // Criar um novo dispositivo
    // POST http://localhost:8800/api/devices
    async create(device) {
        try {
            const response = await fetch(`${API_URL}/devices`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(device)
            });

            if (!response.ok) {
                throw new Error(`Erro ao criar: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao criar dispositivo:', error);
            throw error;
        }
    },

    // Atualizar um dispositivo existente
    // PUT http://localhost:8800/api/devices/:id

    async update(id, device) {
        try {
            const response = await fetch(`${API_URL}/devices/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(device)
            });

            if (!response.ok) {
                throw new Error(`Erro ao atualizar: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Erro ao atualizar dispositivo ${id}:`, error);
            throw error;
        }
    },

    // Deletar um dispositivo
    // DELETE http://localhost:8800/api/devices/:id
    async delete(id) {
        try {
            const response = await fetch(`${API_URL}/devices/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`Erro ao deletar: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Erro ao deletar dispositivo ${id}:`, error);
            throw error;
        }
    }
};