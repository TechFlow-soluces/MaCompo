import React from 'react';
import { motion } from 'framer-motion';
import { FaFutbol } from 'react-icons/fa';

const LandingPage: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #0f2027 100%)',
      color: '#ffffff',
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999
    }}>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ marginBottom: '30px' }}
      >
        <div style={{
          position: 'relative',
          width: '120px',
          height: '120px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(46, 204, 113, 0.1)',
          borderRadius: '50%',
          boxShadow: '0 0 30px rgba(46, 204, 113, 0.2)'
        }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <FaFutbol size={60} color="#2ecc71" />
          </motion.div>
        </div>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          marginBottom: '10px',
          background: 'linear-gradient(to right, #ffffff, #2ecc71)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center',
          letterSpacing: '1px'
        }}
      >
        MaCompo
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        style={{
          fontSize: '1.1rem',
          color: 'rgba(255, 255, 255, 0.6)',
          letterSpacing: '2px',
          textTransform: 'uppercase'
        }}
      >
        Créez vos compositions tactiques
      </motion.p>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '200px' }}
        transition={{ delay: 1.5, duration: 1.5 }}
        style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #2ecc71, transparent)',
          marginTop: '40px'
        }}
      />
    </div>
  );
};

export default LandingPage;
