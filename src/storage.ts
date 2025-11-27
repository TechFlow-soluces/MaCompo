// Système de stockage localStorage pour l'application
// Remplace les appels API

export interface Tactic {
    id: string;
    name: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    formations?: Formation[];
}

export interface Formation {
    id: string;
    tacticId: string;
    name: string;
    players: Player[];
    createdAt: string;
}

export interface Player {
    id: string;
    numero: number;
    nom: string;
    prenom?: string;
    couleur: string;
    positionX: number;
    positionY: number;
}

const STORAGE_KEYS = {
    TACTICS: 'macompo_tactics',
    FORMATIONS: 'macompo_formations',
};

// Helper pour générer des IDs uniques
const generateId = (): string => {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// ========== TACTICS ==========

export const getAllTactics = (): Tactic[] => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.TACTICS);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Erreur lecture tactiques:', error);
        return [];
    }
};

export const getTacticById = (id: string): Tactic | null => {
    const tactics = getAllTactics();
    return tactics.find(t => t.id === id) || null;
};

export const createTactic = (name: string, description?: string): Tactic => {
    const tactics = getAllTactics();
    const newTactic: Tactic = {
        id: generateId(),
        name,
        description,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        formations: [],
    };

    tactics.unshift(newTactic); // Ajouter au début
    localStorage.setItem(STORAGE_KEYS.TACTICS, JSON.stringify(tactics));
    return newTactic;
};

export const updateTactic = (id: string, updates: { name?: string; description?: string }): Tactic | null => {
    const tactics = getAllTactics();
    const index = tactics.findIndex(t => t.id === id);

    if (index === -1) return null;

    tactics[index] = {
        ...tactics[index],
        ...updates,
        updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEYS.TACTICS, JSON.stringify(tactics));
    return tactics[index];
};

export const deleteTactic = (id: string): boolean => {
    const tactics = getAllTactics();
    const filtered = tactics.filter(t => t.id !== id);

    if (filtered.length === tactics.length) return false; // Pas trouvé

    localStorage.setItem(STORAGE_KEYS.TACTICS, JSON.stringify(filtered));

    // Supprimer aussi les formations associées
    const formations = getAllFormations();
    const filteredFormations = formations.filter(f => f.tacticId !== id);
    localStorage.setItem(STORAGE_KEYS.FORMATIONS, JSON.stringify(filteredFormations));

    return true;
};

// ========== FORMATIONS ==========

export const getAllFormations = (): Formation[] => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.FORMATIONS);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Erreur lecture formations:', error);
        return [];
    }
};

export const getFormationsByTacticId = (tacticId: string): Formation[] => {
    const formations = getAllFormations();
    return formations.filter(f => f.tacticId === tacticId);
};

export const createFormation = (tacticId: string, name: string, players: Player[]): Formation => {
    const formations = getAllFormations();
    const newFormation: Formation = {
        id: generateId(),
        tacticId,
        name,
        players,
        createdAt: new Date().toISOString(),
    };

    formations.unshift(newFormation);
    localStorage.setItem(STORAGE_KEYS.FORMATIONS, JSON.stringify(formations));

    // Mettre à jour la date de modification de la tactique
    updateTactic(tacticId, {});

    return newFormation;
};

export const deleteFormation = (id: string): boolean => {
    const formations = getAllFormations();
    const filtered = formations.filter(f => f.id !== id);

    if (filtered.length === formations.length) return false;

    localStorage.setItem(STORAGE_KEYS.FORMATIONS, JSON.stringify(filtered));
    return true;
};

// ========== UTILS ==========

export const clearAllData = (): void => {
    localStorage.removeItem(STORAGE_KEYS.TACTICS);
    localStorage.removeItem(STORAGE_KEYS.FORMATIONS);
};

// Export pour debug
export const exportData = () => {
    return {
        tactics: getAllTactics(),
        formations: getAllFormations(),
    };
};
