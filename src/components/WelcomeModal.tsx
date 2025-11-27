import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeModalProps {
    onComplete: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onComplete }) => {
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username.trim()) {
            setError('Veuillez entrer un nom');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Mode localStorage uniquement, pas d'appel API
            localStorage.setItem('username', username.trim());

            // Petit délai pour l'effet visuel
            await new Promise(resolve => setTimeout(resolve, 500));

            onComplete();
        } catch (err) {
            setError('Erreur lors de la sauvegarde. Réessayez.');
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(10, 14, 26, 0.95)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999,
                backdropFilter: 'blur(10px)'
            }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="glass"
                    style={{
                        padding: '50px 40px',
                        width: '450px',
                        maxWidth: '90vw',
                        borderRadius: '20px',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 100px rgba(46, 204, 113, 0.1)',
                        border: '1px solid rgba(46, 204, 113, 0.2)'
                    }}
                >
                    {/* Logo */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        style={{
                            textAlign: 'center',
                            marginBottom: '20px'
                        }}
                    >
                        <img
                            src="/logo.png"
                            alt="MaCompo"
                            style={{
                                width: '120px',
                                height: 'auto',
                                filter: 'drop-shadow(0 0 20px rgba(46, 204, 113, 0.3))'
                            }}
                        />
                    </motion.div>

                    {/* Title */}
                    <h2 style={{
                        textAlign: 'center',
                        marginBottom: '10px',
                        color: 'var(--color-primary)',
                        fontSize: '2rem',
                        fontWeight: 800
                    }}>
                        Bienvenue !
                    </h2>

                    <p style={{
                        textAlign: 'center',
                        color: 'var(--color-text-secondary)',
                        marginBottom: '40px',
                        fontSize: '1rem'
                    }}>
                        Pour commencer, dis-nous comment tu t'appelles
                    </p>

                    {/* Error */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                padding: '12px',
                                background: 'rgba(231, 76, 60, 0.1)',
                                border: '1px solid rgba(231, 76, 60, 0.3)',
                                borderRadius: '8px',
                                color: '#e74c3c',
                                marginBottom: '20px',
                                textAlign: 'center'
                            }}
                        >
                            {error}
                        </motion.div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '10px',
                                color: 'var(--color-text)',
                                fontWeight: 600
                            }}>
                                Ton nom
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Ex: Jo, Marc, Sophie..."
                                autoFocus
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '15px',
                                    borderRadius: '12px',
                                    border: '2px solid rgba(46, 204, 113, 0.2)',
                                    background: 'rgba(0,0,0,0.3)',
                                    color: 'white',
                                    fontSize: '1.1rem',
                                    transition: 'all 0.3s',
                                    outline: 'none'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = 'var(--color-primary)';
                                    e.target.style.boxShadow = '0 0 20px rgba(46, 204, 113, 0.3)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'rgba(46, 204, 113, 0.2)';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                        </div>

                        <motion.button
                            type="submit"
                            disabled={loading || !username.trim()}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                padding: '15px',
                                borderRadius: '12px',
                                background: loading || !username.trim()
                                    ? 'rgba(46, 204, 113, 0.3)'
                                    : 'linear-gradient(135deg, var(--color-primary), #27ae60)',
                                color: loading || !username.trim() ? 'rgba(255,255,255,0.5)' : 'black',
                                fontWeight: 'bold',
                                fontSize: '1.1rem',
                                marginTop: '10px',
                                border: 'none',
                                cursor: loading || !username.trim() ? 'not-allowed' : 'pointer',
                                boxShadow: loading || !username.trim()
                                    ? 'none'
                                    : '0 4px 20px rgba(46, 204, 113, 0.4)',
                                transition: 'all 0.3s'
                            }}
                        >
                            {loading ? 'Connexion...' : 'Commencer 🚀'}
                        </motion.button>
                    </form>

                    <p style={{
                        textAlign: 'center',
                        marginTop: '25px',
                        color: 'var(--color-text-secondary)',
                        fontSize: '0.85rem'
                    }}>
                        Pas besoin de mot de passe, c'est simple comme bonjour ! 👋
                    </p>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default WelcomeModal;
