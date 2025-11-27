import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor pour ajouter le username depuis localStorage
api.interceptors.request.use(
    (config) => {
        const username = localStorage.getItem('username');
        if (username) {
            config.headers['X-Username'] = username;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor pour gérer les erreurs
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Username manquant ou invalide
            localStorage.removeItem('username');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

// API Users
export const users = {
    getOrCreate: (username: string) => api.post('/users', { username }),
};

// API Tactics
export const tactics = {
    getAll: () => api.get('/tactics'),
    getOne: (id: string) => api.get(`/tactics/${id}`),
    create: (data: { name: string; description?: string }) => api.post('/tactics', data),
    update: (id: string, data: { name?: string; description?: string }) => api.put(`/tactics/${id}`, data),
    delete: (id: string) => api.delete(`/tactics/${id}`),
    createFormation: (tacticId: string, data: {
        name: string;
        players: Array<{
            numero: number;
            nom: string;
            prenom?: string;
            couleur: string;
            positionX: number;
            positionY: number;
        }>;
    }) => api.post(`/tactics/${tacticId}/formations`, data),
};

export const auth = {
    login: (email: string, password: string) => api.post('/auth/login', { email, password }),
    register: (email: string, password: string, username: string) => api.post('/auth/register', { email, password, username }),
};

export default api;
