import { useEffect } from 'react';
import { AdMob, type BannerAdOptions, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

const AdBanner = () => {
    useEffect(() => {
        // Vérifier si on est sur une plateforme native (pas web)
        if (!Capacitor.isNativePlatform()) {
            console.log('AdMob non disponible sur web');
            return;
        }

        const initializeAdMob = async () => {
            try {
                // Initialiser AdMob
                await AdMob.initialize({
                    testingDevices: [], // Ajouter des device IDs ici pour le test
                    initializeForTesting: true, // Mode test
                });

                console.log('AdMob initialisé');

                // Afficher la bannière
                const options: BannerAdOptions = {
                    adId: 'ca-app-pub-3940256099942544/6300978111', // ID de test Google
                    adSize: BannerAdSize.BANNER,
                    position: BannerAdPosition.BOTTOM_CENTER,
                    margin: 0,
                    isTesting: true, // Mode test
                };

                await AdMob.showBanner(options);
                console.log('Bannière AdMob affichée');
            } catch (error) {
                console.error('Erreur AdMob:', error);
            }
        };

        initializeAdMob();

        // Cleanup : masquer la bannière quand le composant est démonté
        return () => {
            if (Capacitor.isNativePlatform()) {
                AdMob.hideBanner().catch(err => console.error('Erreur hide banner:', err));
            }
        };
    }, []);

    // Ce composant n'affiche rien visuellement (la bannière est gérée nativement)
    return null;
};

export default AdBanner;
