/**
 * Serviço para buscar pets da API
 */

import { API_URL } from "../config/api";

/**
 * Busca pets por categoria
 * @param {string} category - Categoria dos pets (pacientes, novos, especiais)
 * @returns {Promise<Array>} Lista de pets formatada para o componente PetShowcase
 */
export const getPets = async (category) => {
    try {
        let endpoint = `${API_URL}/pets`;
        let queryParams = new URLSearchParams();

        // Configurar parâmetros com base na categoria
        if (category === 'pacientes') {
            // Pets que estão esperando há mais tempo
            queryParams.append('sort', 'waitingTime');
            queryParams.append('order', 'desc');
        } else if (category === 'novos') {
            // Pets recém adicionados
            queryParams.append('sort', 'createdAt');
            queryParams.append('order', 'desc');
        } else if (category === 'especiais') {
            // Pets com necessidades especiais
            queryParams.append('specialCondition', 'true');
        }

        // Limitar a 10 pets por categoria
        queryParams.append('limit', '10');

        // Fazer requisição à API
        const response = await fetch(`${endpoint}?${queryParams.toString()}`);

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const result = await response.json();
        console.log(`Resposta da API para categoria ${category}:`, result);

        // Extrair os dados de pets da resposta
        // A API pode retornar os pets em result.data ou diretamente em result
        const petsData = result.data || result;

        if (!Array.isArray(petsData)) {
            console.error('Formato de resposta inesperado:', result);
            return [];
        }

        // Formatar os dados para o formato esperado pelo PetShowcase
        return petsData.map(pet => ({
            id: pet._id,
            name: pet.name,
            // Se imagem for um array, pega a primeira, senão usa a imagem diretamente
            image: Array.isArray(pet.image) && pet.image.length > 0
                ? pet.image[0]
                : (pet.image || 'https://i.imgur.com/WanR0b3.png'),
            gender: pet.gender,
            age: pet.age
        }));
    } catch (error) {
        console.error(`Erro ao buscar pets da categoria ${category}:`, error);
        return [];
    }
};

/**
 * Busca um pet específico pelo ID
 * @param {string} id - ID do pet
 * @returns {Promise<Object|null>} Dados do pet ou null em caso de erro
 */
export const getPetById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/pets/${id}`);

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Erro ao buscar pet com ID ${id}:`, error);
        return null;
    }
};