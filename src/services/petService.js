/**
 * Serviço para buscar pets da API
 */

import { API_URL } from "../config/api";

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos em milissegundos

/**
 * Busca pets por categoria com cache
 * @param {string} category - Categoria dos pets (pacientes, novos, especiais)
 * @param {number} page - Número da página
 * @param {number} limit - Limite de pets por página
 * @returns {Promise<Array>} Lista de pets formatada para o componente PetShowcase
 */
export const getPets = async (category, page = 1, limit = 10) => {
    try {
        // Verificar cache
        const cacheKey = `pets_${category}_${page}_${limit}`;
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
            const { data, timestamp } = JSON.parse(cachedData);
            if (Date.now() - timestamp < CACHE_DURATION) {
                console.log('Retornando dados do cache para:', category);
                return data;
            }
        }

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

        // Adicionar parâmetros de paginação
        queryParams.append('page', page);
        queryParams.append('limit', limit);

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
        const formattedPets = petsData.map(pet => ({
            id: pet._id,
            name: pet.name,
            // Se imagem for um array, pega a primeira, senão usa a imagem diretamente
            image: Array.isArray(pet.image) && pet.image.length > 0
                ? pet.image[0]
                : (pet.image || 'https://i.imgur.com/WanR0b3.png'),
            gender: pet.gender,
            age: pet.age
        }));

        // Salvar no cache
        localStorage.setItem(cacheKey, JSON.stringify({
            data: formattedPets,
            timestamp: Date.now()
        }));

        return formattedPets;
    } catch (error) {
        console.error(`Erro ao buscar pets da categoria ${category}:`, error);
        return [];
    }
};

/**
 * Busca um pet específico pelo ID com cache
 * @param {string} id - ID do pet
 * @returns {Promise<Object|null>} Dados do pet ou null em caso de erro
 */
export const getPetById = async (id) => {
    try {
        // Verificar cache
        const cacheKey = `pet_${id}`;
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
            const { data, timestamp } = JSON.parse(cachedData);
            if (Date.now() - timestamp < CACHE_DURATION) {
                console.log('Retornando dados do cache para pet:', id);
                return data;
            }
        }

        const response = await fetch(`${API_URL}/pets/${id}`);

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();

        // Salvar no cache
        localStorage.setItem(cacheKey, JSON.stringify({
            data,
            timestamp: Date.now()
        }));

        return data;
    } catch (error) {
        console.error(`Erro ao buscar pet com ID ${id}:`, error);
        return null;
    }
};