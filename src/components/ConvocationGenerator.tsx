import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCopy, FaCheck } from 'react-icons/fa';
import type { Joueur } from '../types';

interface ConvocationGeneratorProps {
    players: Joueur[];
    onClose: () => void;
}

const ConvocationGenerator: React.FC<ConvocationGeneratorProps> = ({ players, onClose }) => {
    const [matchType, setMatchType] = useState('');
    const [matchDate, setMatchDate] = useState('');
    const [matchTime, setMatchTime] = useState('');
    const [opponent, setOpponent] = useState('');
    const [location, setLocation] = useState('');
    const [meetingPlace, setMeetingPlace] = useState('');
    const [meetingTime, setMeetingTime] = useState('');
    const [copied, setCopied] = useState(false);

    const generateText = (): string => {
        const playersList = [...players]
            .sort((a, b) => a.numero - b.numero)
            .map(p => {
                const fullName = p.prenom ? `${p.prenom} ${p.nom.toUpperCase()}` : p.nom.toUpperCase();
                return `  ${p.numero}. ${fullName}`;
            })
            .join('\n');

        return `⚽ CONVOCATION - ${matchType || '[type de match]'}

Match contre ${opponent || '[adversaire]'}
📍 À ${location || '[ville]'}
📅 Le ${matchDate || '[date]'}
🕐 Coup d'envoi : ${matchTime || '[heure]'}

📌 RENDEZ-VOUS
Lieu : ${meetingPlace || '[lieu de rendez-vous]'}
Heure : ${meetingTime || '[heure de rendez-vous]'}

👥 JOUEURS CONVOQUÉS (${players.length}) :

${playersList}`;
    };

    const handleCopy = () => {
        const text = generateText();
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const canGenerate = matchType && matchDate && matchTime && opponent && location && meetingPlace && meetingTime;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.85)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
                backdropFilter: 'blur(8px)',
                padding: '20px',
            }}
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass"
                style={{
                    width: '900px',
                    maxWidth: '95vw',
                    maxHeight: '90vh',
                    borderRadius: '16px',
                    padding: '30px',
                    overflow: 'auto',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                    <h2 style={{ margin: 0 }}>📋 Générateur de Convocation</h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            border: 'none',
                            color: 'white',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                        }}
                    >
                        ✕ Fermer
                    </button>
                </div>

                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '25px' }}>
                    Remplissez les informations du match pour générer votre texte de convocation.
                </p>

                {/* Formulaire */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                            Type de match *
                        </label>
                        <input
                            type="text"
                            value={matchType}
                            onChange={(e) => setMatchType(e.target.value)}
                            placeholder="Ex: Match de Championnat"
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                background: 'rgba(0,0,0,0.3)',
                                color: 'white',
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                            Date du match *
                        </label>
                        <input
                            type="text"
                            value={matchDate}
                            onChange={(e) => setMatchDate(e.target.value)}
                            placeholder="Ex: Samedi 7 Décembre 2025"
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                background: 'rgba(0,0,0,0.3)',
                                color: 'white',
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                            Heure du coup d'envoi *
                        </label>
                        <input
                            type="text"
                            value={matchTime}
                            onChange={(e) => setMatchTime(e.target.value)}
                            placeholder="Ex: 15h00"
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                background: 'rgba(0,0,0,0.3)',
                                color: 'white',
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                            Adversaire *
                        </label>
                        <input
                            type="text"
                            value={opponent}
                            onChange={(e) => setOpponent(e.target.value)}
                            placeholder="Ex: AS Lyon"
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                background: 'rgba(0,0,0,0.3)',
                                color: 'white',
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                            Ville du match *
                        </label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Ex: Lyon"
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                background: 'rgba(0,0,0,0.3)',
                                color: 'white',
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                            Lieu de rendez-vous *
                        </label>
                        <input
                            type="text"
                            value={meetingPlace}
                            onChange={(e) => setMeetingPlace(e.target.value)}
                            placeholder="Ex: Parking du stade"
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                background: 'rgba(0,0,0,0.3)',
                                color: 'white',
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                            Heure de rendez-vous *
                        </label>
                        <input
                            type="text"
                            value={meetingTime}
                            onChange={(e) => setMeetingTime(e.target.value)}
                            placeholder="Ex: 14h30"
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                background: 'rgba(0,0,0,0.3)',
                                color: 'white',
                            }}
                        />
                    </div>
                </div>

                {/* Aperçu */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        <h3>Aperçu du texte</h3>
                        <motion.button
                            onClick={handleCopy}
                            disabled={!canGenerate}
                            whileHover={canGenerate ? { scale: 1.05 } : {}}
                            whileTap={canGenerate ? { scale: 0.95 } : {}}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 20px',
                                background: !canGenerate
                                    ? 'rgba(46, 204, 113, 0.3)'
                                    : copied
                                    ? 'rgba(39, 174, 96, 0.8)'
                                    : 'var(--color-primary)',
                                color: !canGenerate ? 'rgba(255,255,255,0.5)' : 'black',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                border: 'none',
                                cursor: !canGenerate ? 'not-allowed' : 'pointer',
                            }}
                        >
                            {copied ? <><FaCheck /> Copié !</> : <><FaCopy /> Copier le texte</>}
                        </motion.button>
                    </div>

                    <pre
                        style={{
                            background: 'rgba(0,0,0,0.4)',
                            padding: '20px',
                            borderRadius: '8px',
                            border: '1px solid rgba(46, 204, 113, 0.3)',
                            whiteSpace: 'pre-wrap',
                            fontFamily: 'monospace',
                            fontSize: '0.9rem',
                            lineHeight: '1.6',
                            color: canGenerate ? 'white' : 'rgba(255,255,255,0.5)',
                            maxHeight: '400px',
                            overflow: 'auto',
                        }}
                    >
                        {generateText()}
                    </pre>
                </div>

                {!canGenerate && (
                    <p
                        style={{
                            marginTop: '15px',
                            color: '#f39c12',
                            fontSize: '0.9rem',
                            textAlign: 'center',
                        }}
                    >
                        ⚠️ Remplissez tous les champs pour générer la convocation
                    </p>
                )}
            </motion.div>
        </div>
    );
};

export default ConvocationGenerator;
