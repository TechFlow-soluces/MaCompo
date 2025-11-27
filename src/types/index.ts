export interface Joueur {
    id: string;
    nom: string;
    prenom?: string;
    numero: number;
    poste: string; // 'G', 'D', 'M', 'A'
    x: number;
    y: number;
    couleur: string; // Hex code pour le maillot
}

export interface Composition {
    id: string;
    nom: string;
    joueurs: Joueur[];
    dateCreation: number;
}

export type Outil = 'selection' | 'deplacement' | 'dessin' | 'gomme';
