import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Terrain from '../components/Terrain';
import ConvocationGenerator from '../components/ConvocationGenerator';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { addPlayer, clearPlayers, updatePlayerDetails, removePlayer } from '../store/playersSlice';
import { getTacticById, getFormationsByTacticId, createFormation, type Player as StoragePlayer } from '../storage';
import type { Joueur } from '../types';
import { FaSave, FaHome, FaFileAlt, FaPlus, FaTrash, FaTimes, FaEdit } from 'react-icons/fa';

const Board: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const tacticId = searchParams.get('tacticId');

    const [saving, setSaving] = useState(false);
    const [showConvocation, setShowConvocation] = useState(false);
    const [showEditor, setShowEditor] = useState(false);
    const [formationName, setFormationName] = useState('Formation 1');

    const username = localStorage.getItem('username') || 'Utilisateur';
    const players = useSelector((state: any) => state.players.present || []);
    const selectedPlayerId = useSelector((state: any) => state.players.selectedPlayerId);
    const selectedPlayer = players.find((p: Joueur) => p.id === selectedPlayerId);

    // Charger la tactique si un ID est fourni
    useEffect(() => {
        if (tacticId) {
            loadTactic();
        }
    }, [tacticId]);

    // Écouter l'événement de double-clic sur joueur
    useEffect(() => {
        const handleOpenEditor = () => {
            setShowEditor(true);
        };
        window.addEventListener('openPlayerEditor', handleOpenEditor);
        return () => window.removeEventListener('openPlayerEditor', handleOpenEditor);
    }, []);

    const loadTactic = () => {
        if (!tacticId) return;

        try {
            const tactic = getTacticById(tacticId);
            if (!tactic) return;

            const formations = getFormationsByTacticId(tacticId);

            if (formations && formations.length > 0) {
                const formation = formations[0];
                setFormationName(formation.name);

                dispatch(clearPlayers());
                formation.players.forEach((player: StoragePlayer) => {
                    const joueur: Joueur = {
                        id: player.id,
                        nom: player.nom,
                        prenom: player.prenom,
                        numero: player.numero,
                        poste: 'M',
                        x: player.positionX,
                        y: player.positionY,
                        couleur: player.couleur
                    };
                    dispatch(addPlayer(joueur));
                });
            }
        } catch (error) {
            console.error('Erreur chargement tactique:', error);
        }
    };

    const ajouterJoueur = () => {
        const id = Date.now().toString();
        const nouveauJoueur: Joueur = {
            id,
            nom: 'Nouveau',
            prenom: '',
            numero: players.length + 1,
            poste: 'M',
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            couleur: '#2ecc71'
        };
        dispatch(addPlayer(nouveauJoueur));
        setShowEditor(true);
    };

    const resetPlateau = () => {
        if (confirm('Voulez-vous vraiment supprimer tous les joueurs ?')) {
            dispatch(clearPlayers());
        }
    };

    const handleSave = () => {
        if (!tacticId) {
            alert('Impossible de sauvegarder : aucune tactique sélectionnée');
            return;
        }

        if (players.length === 0) {
            alert('Ajoutez au moins un joueur avant de sauvegarder');
            return;
        }

        setSaving(true);
        try {
            const playersData: StoragePlayer[] = players.map((p: Joueur) => ({
                id: p.id,
                numero: p.numero,
                nom: p.nom,
                prenom: p.prenom || '',
                couleur: p.couleur,
                positionX: p.x,
                positionY: p.y
            }));

            createFormation(tacticId, formationName, playersData);

            alert('✅ Formation sauvegardée avec succès !');
        } catch (error) {
            console.error('Erreur sauvegarde:', error);
            alert('❌ Erreur lors de la sauvegarde');
        } finally {
            setSaving(false);
        }
    };

    const handleGenerateConvocation = () => {
        if (players.length === 0) {
            alert('Ajoutez des joueurs avant de générer une convocation');
            return;
        }
        setShowConvocation(true);
    };

    const handleUpdatePlayer = (field: string, value: any) => {
        if (selectedPlayer) {
            dispatch(updatePlayerDetails({ id: selectedPlayer.id, [field]: value }));
        }
    };

    const handleDeletePlayer = () => {
        if (selectedPlayer && confirm(`Supprimer ${selectedPlayer.nom} ?`)) {
            dispatch(removePlayer(selectedPlayer.id));
            setShowEditor(false);
        }
    };

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            position: 'relative',
            overflow: 'hidden',
            background: 'var(--color-bg)',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Header Compact */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 10,
                padding: '10px',
                background: 'rgba(15, 23, 42, 0.8)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(46, 204, 113, 0.2)'
            }}>
                <div>
                    <h1 style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: 'var(--color-primary)',
                        margin: 0
                    }}>
                        {username} ⚽ {players.length} joueurs
                    </h1>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="glass"
                        style={{
                            padding: '8px 12px',
                            borderRadius: '6px',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            background: 'rgba(52, 152, 219, 0.3)',
                            color: 'white'
                        }}
                    >
                        <FaHome size={14} />
                    </button>

                    <button
                        onClick={handleGenerateConvocation}
                        disabled={players.length === 0}
                        className="glass"
                        style={{
                            padding: '8px 12px',
                            borderRadius: '6px',
                            border: 'none',
                            cursor: players.length === 0 ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            background: players.length === 0 ? 'rgba(52, 152, 219, 0.1)' : 'rgba(52, 152, 219, 0.3)',
                            color: players.length === 0 ? 'rgba(255,255,255,0.3)' : 'white',
                            opacity: players.length === 0 ? 0.5 : 1
                        }}
                    >
                        <FaFileAlt size={14} />
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={saving || !tacticId || players.length === 0}
                        className="glass"
                        style={{
                            padding: '8px 12px',
                            borderRadius: '6px',
                            border: 'none',
                            cursor: saving || !tacticId || players.length === 0 ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            background: saving || !tacticId || players.length === 0 ? 'rgba(46, 204, 113, 0.2)' : 'var(--color-primary)',
                            color: saving || !tacticId || players.length === 0 ? 'rgba(255,255,255,0.3)' : 'black',
                            opacity: saving || !tacticId || players.length === 0 ? 0.5 : 1
                        }}
                    >
                        <FaSave size={14} />
                    </button>
                </div>
            </div>

            {/* Zone du Terrain */}
            <div style={{
                position: 'absolute',
                top: '50px',
                left: 0,
                right: 0,
                bottom: showEditor ? '280px' : '80px',
                transition: 'bottom 0.3s ease'
            }}>
                <Terrain
                    largeur={window.innerWidth}
                    hauteur={window.innerHeight - (showEditor ? 330 : 130)}
                />
            </div>

            {/* Barre d'outils en bas */}
            <div style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 20,
                padding: '15px',
                background: 'rgba(15, 23, 42, 0.95)',
                backdropFilter: 'blur(10px)',
                borderTop: '2px solid var(--color-primary)',
                display: 'flex',
                gap: '10px',
                justifyContent: 'center'
            }}>
                <button
                    onClick={ajouterJoueur}
                    style={{
                        flex: 1,
                        maxWidth: '150px',
                        padding: '12px 20px',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        background: 'var(--color-primary)',
                        color: 'black'
                    }}
                >
                    <FaPlus /> Ajouter
                </button>

                <button
                    onClick={() => selectedPlayer && setShowEditor(!showEditor)}
                    disabled={!selectedPlayer}
                    style={{
                        flex: 1,
                        maxWidth: '150px',
                        padding: '12px 20px',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: !selectedPlayer ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        background: !selectedPlayer ? 'rgba(52, 152, 219, 0.2)' : 'rgba(52, 152, 219, 0.5)',
                        color: !selectedPlayer ? 'rgba(255,255,255,0.3)' : 'white',
                        opacity: !selectedPlayer ? 0.5 : 1
                    }}
                >
                    <FaEdit /> Modifier
                </button>

                <button
                    onClick={resetPlateau}
                    disabled={players.length === 0}
                    style={{
                        flex: 1,
                        maxWidth: '150px',
                        padding: '12px 20px',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: players.length === 0 ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        background: players.length === 0 ? 'rgba(231, 76, 60, 0.2)' : 'rgba(231, 76, 60, 0.5)',
                        color: players.length === 0 ? 'rgba(255,255,255,0.3)' : 'white',
                        opacity: players.length === 0 ? 0.5 : 1
                    }}
                >
                    <FaTrash /> Effacer
                </button>
            </div>

            {/* Éditeur de joueur (slide-up depuis le bas) */}
            <AnimatePresence>
                {showEditor && selectedPlayer && (
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25 }}
                        style={{
                            position: 'fixed',
                            bottom: '80px',
                            left: 0,
                            right: 0,
                            zIndex: 15,
                            background: 'rgba(30, 41, 59, 0.98)',
                            backdropFilter: 'blur(10px)',
                            borderTop: '2px solid rgba(46, 204, 113, 0.5)',
                            padding: '20px',
                            maxHeight: '200px',
                            overflowY: 'auto'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <h3 style={{ margin: 0, color: 'var(--color-primary)', fontSize: '1rem' }}>
                                Joueur #{selectedPlayer.numero}
                            </h3>
                            <button
                                onClick={() => setShowEditor(false)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontSize: '1.2rem'
                                }}
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* Ligne 1: Nom et Numéro */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                            <input
                                type="text"
                                placeholder="Nom"
                                value={selectedPlayer.nom}
                                onChange={(e) => handleUpdatePlayer('nom', e.target.value)}
                                style={{
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    background: 'rgba(0,0,0,0.3)',
                                    color: 'white',
                                    fontSize: '1rem'
                                }}
                            />
                            <input
                                type="number"
                                placeholder="Numéro"
                                value={selectedPlayer.numero}
                                onChange={(e) => handleUpdatePlayer('numero', parseInt(e.target.value))}
                                style={{
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    background: 'rgba(0,0,0,0.3)',
                                    color: 'white',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>

                        {/* Ligne 2: Couleur et Supprimer */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 12px',
                                borderRadius: '8px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                background: 'rgba(0,0,0,0.3)'
                            }}>
                                <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>Couleur</span>
                                <input
                                    type="color"
                                    value={selectedPlayer.couleur}
                                    onChange={(e) => handleUpdatePlayer('couleur', e.target.value)}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        background: 'transparent'
                                    }}
                                />
                            </div>

                            <button
                                onClick={handleDeletePlayer}
                                style={{
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    fontSize: '0.95rem',
                                    fontWeight: 700,
                                    background: 'rgba(231, 76, 60, 0.5)',
                                    color: 'white'
                                }}
                            >
                                <FaTrash /> Supprimer
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Générateur de convocation */}
            {showConvocation && (
                <ConvocationGenerator
                    players={players}
                    onClose={() => setShowConvocation(false)}
                />
            )}

        </div>
    );
};

export default Board;
