import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlus, FaChalkboardTeacher, FaTrash } from 'react-icons/fa';
import { getAllTactics, createTactic, deleteTactic as deleteStoredTactic, type Tactic } from '../storage';
import AdBanner from '../components/AdBanner';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [tacticsList, setTacticsList] = useState<Tactic[]>([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [showNewTacticModal, setShowNewTacticModal] = useState(false);
    const [newTacticName, setNewTacticName] = useState('');
    const [newTacticDescription, setNewTacticDescription] = useState('');
    const username = localStorage.getItem('username') || 'Utilisateur';

    useEffect(() => {
        loadTactics();
    }, []);

    const loadTactics = () => {
        try {
            const tactics = getAllTactics();
            setTacticsList(tactics);
        } catch (error) {
            console.error('Erreur chargement tactiques:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTactic = () => {
        if (!newTacticName.trim()) return;

        setCreating(true);
        try {
            const newTactic = createTactic(newTacticName, newTacticDescription || undefined);
            setTacticsList([newTactic, ...tacticsList]);
            setShowNewTacticModal(false);
            setNewTacticName('');
            setNewTacticDescription('');
            // Naviguer vers le board pour commencer à créer
            navigate(`/board?tacticId=${newTactic.id}`);
        } catch (error) {
            console.error('Erreur création tactique:', error);
            alert('Erreur lors de la création de la tactique');
        } finally {
            setCreating(false);
        }
    };

    const handleDeleteTactic = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm('Êtes-vous sûr de vouloir supprimer cette tactique ?')) return;

        try {
            deleteStoredTactic(id);
            setTacticsList(tacticsList.filter(t => t.id !== id));
        } catch (error) {
            console.error('Erreur suppression tactique:', error);
            alert('Erreur lors de la suppression');
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "Aujourd'hui";
        if (diffDays === 1) return 'Hier';
        if (diffDays < 7) return `Il y a ${diffDays} jours`;
        return date.toLocaleDateString('fr-FR');
    };

    return (
        <>
            <AdBanner />
            <div style={{ padding: '40px 20px', background: 'var(--color-bg)', minHeight: '100vh', color: 'var(--color-text)' }}>
            {/* Header centré */}
            <header style={{ textAlign: 'center', marginBottom: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '15px' }}>
                    <img
                        src="/logo.png"
                        alt="MaCompo"
                        style={{
                            width: '60px',
                            height: 'auto',
                            filter: 'drop-shadow(0 0 10px rgba(46, 204, 113, 0.3))',
                            marginRight: '15px'
                        }}
                    />
                    <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Mes Tactiques</h1>
                </div>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '25px' }}>
                    Salut {username} 👋 · {tacticsList.length} tactique{tacticsList.length > 1 ? 's' : ''}
                </p>

                <button
                    onClick={() => setShowNewTacticModal(true)}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '12px 30px',
                        background: 'var(--color-primary)',
                        color: 'black',
                        borderRadius: '12px',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(46, 204, 113, 0.3)'
                    }}
                >
                    <FaPlus size={14} /> Nouvelle Tactique
                </button>
            </header>

            {/* Loading */}
            {loading && (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '20px' }}>⚽</div>
                    <p>Chargement des tactiques...</p>
                </div>
            )}

            {/* Empty state */}
            {!loading && tacticsList.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        textAlign: 'center',
                        padding: '80px 20px',
                        maxWidth: '500px',
                        margin: '0 auto'
                    }}
                >
                    <div style={{ fontSize: '4rem', marginBottom: '20px' }}>⚽</div>
                    <h2>Aucune tactique pour le moment</h2>
                    <p style={{ color: 'var(--color-text-secondary)', marginTop: '10px', marginBottom: '30px' }}>
                        Créez votre première tactique pour commencer
                    </p>
                    <button
                        onClick={() => setShowNewTacticModal(true)}
                        style={{
                            padding: '15px 30px',
                            background: 'var(--color-primary)',
                            color: 'black',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Créer ma première tactique
                    </button>
                </motion.div>
            )}

            {/* Tactics Grid */}
            {!loading && tacticsList.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
                    {tacticsList.map((tactic) => (
                        <motion.div
                            key={tactic.id}
                            whileHover={{ y: -5 }}
                            className="glass"
                            style={{
                                padding: '25px',
                                borderRadius: '16px',
                                cursor: 'pointer',
                                position: 'relative'
                            }}
                            onClick={() => navigate(`/board?tacticId=${tactic.id}`)}
                        >
                            {/* Delete button */}
                            <button
                                onClick={(e) => handleDeleteTactic(tactic.id, e)}
                                style={{
                                    position: 'absolute',
                                    top: '15px',
                                    right: '15px',
                                    background: 'rgba(231, 76, 60, 0.2)',
                                    border: '1px solid rgba(231, 76, 60, 0.3)',
                                    color: '#e74c3c',
                                    padding: '8px 12px',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px'
                                }}
                            >
                                <FaTrash size={12} />
                            </button>

                            {/* Preview */}
                            <div style={{
                                height: '150px',
                                background: 'linear-gradient(135deg, rgba(45, 106, 79, 0.3), rgba(34, 139, 34, 0.2))',
                                borderRadius: '12px',
                                marginBottom: '20px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '2px dashed rgba(46, 204, 113, 0.3)'
                            }}>
                                <FaChalkboardTeacher size={50} color="rgba(46, 204, 113, 0.5)" />
                            </div>

                            {/* Info */}
                            <h3 style={{ marginBottom: '8px', fontSize: '1.2rem' }}>{tactic.name}</h3>
                            {tactic.description && (
                                <p style={{
                                    color: 'var(--color-text-secondary)',
                                    fontSize: '0.9rem',
                                    marginBottom: '12px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {tactic.description}
                                </p>
                            )}
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
                                Modifié {formatDate(tactic.updatedAt)}
                            </p>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Modal Nouvelle Tactique */}
            {showNewTacticModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.8)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                    backdropFilter: 'blur(5px)'
                }} onClick={() => !creating && setShowNewTacticModal(false)}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass"
                        style={{
                            padding: '40px',
                            width: '500px',
                            maxWidth: '90vw',
                            borderRadius: '16px'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 style={{ marginBottom: '25px' }}>Nouvelle Tactique</h2>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                                Nom de la tactique *
                            </label>
                            <input
                                type="text"
                                value={newTacticName}
                                onChange={(e) => setNewTacticName(e.target.value)}
                                placeholder="Ex: 4-3-3 Offensive"
                                autoFocus
                                disabled={creating}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    background: 'rgba(0,0,0,0.3)',
                                    color: 'white'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '30px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                                Description (optionnel)
                            </label>
                            <textarea
                                value={newTacticDescription}
                                onChange={(e) => setNewTacticDescription(e.target.value)}
                                placeholder="Ex: Formation offensive avec ailiers rapides"
                                disabled={creating}
                                rows={3}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    background: 'rgba(0,0,0,0.3)',
                                    color: 'white',
                                    resize: 'vertical'
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '15px' }}>
                            <button
                                onClick={() => setShowNewTacticModal(false)}
                                disabled={creating}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    borderRadius: '8px',
                                    background: 'rgba(255,255,255,0.1)',
                                    color: 'white',
                                    border: 'none',
                                    cursor: creating ? 'not-allowed' : 'pointer'
                                }}
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleCreateTactic}
                                disabled={creating || !newTacticName.trim()}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    borderRadius: '8px',
                                    background: creating || !newTacticName.trim()
                                        ? 'rgba(46, 204, 113, 0.3)'
                                        : 'var(--color-primary)',
                                    color: creating || !newTacticName.trim() ? 'rgba(255,255,255,0.5)' : 'black',
                                    fontWeight: 'bold',
                                    border: 'none',
                                    cursor: creating || !newTacticName.trim() ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {creating ? 'Création...' : 'Créer'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
            </div>
        </>
    );
};

export default Dashboard;
