# Guide de Publication - MaCompo sur iOS App Store

## ⚠️ Prérequis OBLIGATOIRES

### 1. Matériel requis
- **Un Mac** (MacBook, iMac, Mac Mini) - **OBLIGATOIRE**
  - Impossible de compiler une app iOS sans Mac
  - Pas de solution alternative fiable
  - Un Mac d'occasion suffit (à partir de ~300€)

### 2. Compte Apple Developer
- **Coût** : 99€/an (renouvelable chaque année)
- **Inscription** : https://developer.apple.com/programs/enroll/
- **Validation** : 24-48h généralement
- **Paiement** : Carte bancaire requise

### 3. Logiciels requis
- **Xcode** (gratuit sur Mac App Store)
  - Version minimale : 14.0+
  - Taille : ~15 GB
  - macOS 12.5 ou supérieur requis

---

## 🚀 Si tu as un Mac : Étapes complètes

### Étape 1 : Préparer le projet iOS

#### a) Sur ton PC actuel
```bash
# Ajouter la plateforme iOS au projet
npx cap add ios

# Build l'app
npm run build

# Sync avec iOS
npx cap sync ios
```

#### b) Transférer le projet sur Mac
- Copie tout le dossier du projet sur ton Mac
- Via clé USB, cloud (Dropbox, Google Drive), ou GitHub

### Étape 2 : Sur Mac - Ouvrir le projet

```bash
# Dans le terminal Mac
cd /chemin/vers/ton/projet
npx cap open ios
```

Ça va ouvrir Xcode avec ton projet.

### Étape 3 : Configurer le projet dans Xcode

#### a) Sélectionner ton équipe Apple Developer
1. Dans Xcode, clique sur le projet (icône bleue en haut à gauche)
2. Onglet **Signing & Capabilities**
3. **Team** : Sélectionne ton compte Apple Developer
4. **Bundle Identifier** : `com.macompo.app` (doit être unique)

#### b) Vérifier les infos de l'app
1. **General** tab :
   - Display Name : `MaCompo`
   - Bundle Identifier : `com.macompo.app`
   - Version : `1.0.0`
   - Build : `1`

#### c) Configurer l'icône
1. Dans le navigateur de projet, cherche **Assets.xcassets**
2. Clique sur **AppIcon**
3. Glisse ton icône (1024x1024) dans chaque taille requise

### Étape 4 : Installer CocoaPods et dépendances

```bash
# Dans le terminal Mac
cd ios/App
pod install
```

### Étape 5 : Tester sur simulateur

1. Dans Xcode, en haut : sélectionne un simulateur (ex: iPhone 14)
2. Clique sur le bouton ▶️ (Play)
3. L'app devrait se lancer dans le simulateur
4. Teste toutes les fonctionnalités

### Étape 6 : Créer l'app dans App Store Connect

1. Va sur https://appstoreconnect.apple.com
2. **Mes apps** → **+** → **Nouvelle app**
3. Remplis :
   - Plateformes : iOS
   - Nom : `MaCompo`
   - Langue principale : Français
   - Bundle ID : `com.macompo.app` (celui de Xcode)
   - SKU : `macompo-001` (identifiant unique interne)
   - Accès complet/limité : Complet

### Étape 7 : Archiver et uploader l'app

#### a) Dans Xcode
1. Menu **Product** → **Destination** → **Any iOS Device**
2. Menu **Product** → **Archive**
3. Attends la compilation (quelques minutes)
4. Une fenêtre "Archives" s'ouvre

#### b) Distribuer l'app
1. Sélectionne ton archive
2. Clique sur **Distribute App**
3. Choisis **App Store Connect**
4. Clique sur **Upload**
5. Laisse toutes les options par défaut
6. Clique sur **Upload**

L'upload peut prendre 10-30 minutes.

### Étape 8 : Remplir la fiche App Store

Retourne sur App Store Connect :

#### a) Informations de l'app

**Confidentialité** :
- URL de la politique de confidentialité (optionnelle si pas de données personnelles)
- Ou cocher "Cette app ne collecte aucune donnée"

**Catégorie** :
- Principale : Sports
- Secondaire : Utilitaires

**Classification du contenu** :
- Répondre au questionnaire
- App tout public (4+)

#### b) Préparer la soumission

**Captures d'écran** (obligatoires) :
- iPhone 6.7" (iPhone 14 Pro Max) : 1290 x 2796 px
- iPhone 6.5" (iPhone 11 Pro Max) : 1242 x 2688 px
- Minimum : 3 captures d'écran
- Format : PNG ou JPEG

**Textes** :
- Nom : `MaCompo`
- Sous-titre (30 caractères max) : `Compositions tactiques foot`
- Description (4000 caractères max) : Utilise celle du guide Android
- Mots-clés (100 caractères max) : `football,tactique,composition,sport,terrain,coach,entrainement`
- URL de support : ton site ou email
- URL marketing (optionnel)

**Version** :
- Version : 1.0.0
- Copyright : `2025 [Ton nom]`
- Informations de contact : ton email

**Informations de build** :
- Sélectionne le build uploadé précédemment
- Si pas encore disponible, attendre 10-30 minutes

#### c) Informations de révision (App Review)

**Coordonnées** :
- Prénom, Nom
- Téléphone
- Email

**Remarques** (optionnel) :
```
Première version de MaCompo.
Application de composition tactique de football.
Toutes les données sont stockées localement (localStorage).
Pas de connexion serveur requise.
```

### Étape 9 : Soumettre pour révision

1. Vérifie que tout est rempli (pastille verte partout)
2. Clique sur **Ajouter pour révision**
3. Clique sur **Soumettre pour révision**

**Délai de révision** : 24h à 7 jours (souvent 2-3 jours)

---

## 📱 Configuration AdMob pour iOS

### Fichier `ios/App/App/Info.plist`

Ajoute avant `</dict>` :

```xml
<key>GADApplicationIdentifier</key>
<string>ca-app-pub-3940256099942544~1458002511</string>
<key>SKAdNetworkItems</key>
<array>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>cstr6suwn9.skadnetwork</string>
  </dict>
</array>
```

Remplace par ton vrai ID AdMob iOS quand tu l'as.

### Fichier `src/components/AdBanner.tsx`

Modifier pour supporter iOS :

```typescript
import { useEffect } from 'react';
import { AdMob, type BannerAdOptions, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

const AdBanner = () => {
    useEffect(() => {
        if (!Capacitor.isNativePlatform()) {
            console.log('AdMob non disponible sur web');
            return;
        }

        const initializeAdMob = async () => {
            try {
                await AdMob.initialize({
                    testingDevices: [],
                    initializeForTesting: true,
                });

                console.log('AdMob initialisé');

                // ID AdMob différent selon la plateforme
                const adId = Capacitor.getPlatform() === 'ios'
                    ? 'ca-app-pub-3940256099942544/2934735716' // iOS test
                    : 'ca-app-pub-3940256099942544/6300978111'; // Android test

                const options: BannerAdOptions = {
                    adId: adId,
                    adSize: BannerAdSize.BANNER,
                    position: BannerAdPosition.BOTTOM_CENTER,
                    margin: 0,
                    isTesting: true,
                };

                await AdMob.showBanner(options);
                console.log('Bannière AdMob affichée');
            } catch (error) {
                console.error('Erreur AdMob:', error);
            }
        };

        initializeAdMob();

        return () => {
            if (Capacitor.isNativePlatform()) {
                AdMob.hideBanner().catch(err => console.error('Erreur hide banner:', err));
            }
        };
    }, []);

    return null;
};

export default AdBanner;
```

---

## 🎨 Assets iOS spécifiques

### Icône de l'app (obligatoire)
- **Taille** : 1024 x 1024 px
- **Format** : PNG (sans transparence)
- **Nom** : `AppIcon.png`

### Captures d'écran (obligatoires)

**Tailles requises** :
- iPhone 6.7" : 1290 x 2796 px (iPhone 14 Pro Max)
- iPhone 6.5" : 1242 x 2688 px (iPhone 11 Pro Max)

**Comment générer** :
1. Lance l'app dans le simulateur Xcode
2. Menu **Device** → **Screenshot**
3. Ou Cmd+S

**Nombre minimum** : 3 screenshots

**Écrans suggérés** :
1. Dashboard (Mes tactiques)
2. Board (Création de compo)
3. Modal nouvelle tactique

---

## 💰 Coûts iOS

| Item | Coût | Fréquence |
|------|------|-----------|
| Compte Apple Developer | 99€ | Annuel |
| Mac (si besoin d'acheter) | 300€ - 1500€ | Une fois |
| Total première année (avec Mac) | 399€ - 1599€ | - |
| Années suivantes | 99€ | Annuel |

---

## 🆚 Différences Android vs iOS

| Aspect | Android | iOS |
|--------|---------|-----|
| **Coût initial** | 25€ une fois | 99€/an |
| **Matériel requis** | PC Windows/Mac/Linux | Mac obligatoire |
| **Délai de révision** | 1-7 jours | 1-7 jours |
| **Difficulté** | ⭐⭐ | ⭐⭐⭐⭐ |
| **Mise à jour** | Gratuit | Gratuit |

---

## ❌ Si tu n'as PAS de Mac

### Option 1 : Louer un Mac en ligne
- **MacStadium** : ~30€/mois
- **MacinCloud** : ~25€/mois
- Permet de compiler sans acheter un Mac

### Option 2 : Service de build cloud
- **Ionic Appflow** : ~30€/mois
- Compile l'app iOS pour toi dans le cloud
- Pas besoin de Mac

### Option 3 : Demander à quelqu'un avec un Mac
- Ami, famille, freelance
- Tu lui donnes accès au projet
- Il compile et upload pour toi

### Option 4 : Acheter un Mac d'occasion
- Mac Mini M1 d'occasion : ~400€
- MacBook Air d'occasion : ~500€
- Investissement si tu veux développer régulièrement

### Option 5 : Reporter la publication iOS
- Publier d'abord sur Android uniquement
- Attendre d'avoir un Mac
- Beaucoup d'apps ne sont que sur Android au début

---

## ✅ Checklist publication iOS

Avant de soumettre :

- [ ] Mac disponible et Xcode installé
- [ ] Compte Apple Developer actif (99€ payés)
- [ ] Projet iOS ajouté avec `npx cap add ios`
- [ ] App compilée et testée sur simulateur
- [ ] Bundle Identifier configuré et unique
- [ ] Icône 1024x1024 ajoutée
- [ ] Screenshots pris (minimum 3)
- [ ] App créée dans App Store Connect
- [ ] Build archivé et uploadé
- [ ] Fiche App Store remplie
- [ ] AdMob configuré (si applicable)
- [ ] App soumise pour révision

---

## 🎯 Recommandation

**Si tu débutes et n'as pas de Mac :**

1. **Commence par Android** (plus simple, moins cher)
2. **Teste le succès de l'app** sur Android
3. **Si ça marche bien**, investis dans un Mac pour iOS
4. Ou utilise un service de build cloud

**Si tu as déjà un Mac :**
- Vas-y, suis ce guide étape par étape !
- C'est plus complexe qu'Android mais faisable

---

## 📞 Support et ressources

- **Apple Developer** : https://developer.apple.com
- **App Store Connect** : https://appstoreconnect.apple.com
- **Documentation Capacitor iOS** : https://capacitorjs.com/docs/ios
- **Xcode Documentation** : https://developer.apple.com/xcode/
- **Human Interface Guidelines** : https://developer.apple.com/design/

---

## 🚀 Prochaines étapes

1. **Décide si tu veux publier sur iOS maintenant** ou attendre
2. **Si oui** : Achète/loue un Mac et inscris-toi Apple Developer
3. **Si non** : Focus sur Android d'abord
4. Reprends contact quand tu es prêt pour iOS !

---

**Bon courage ! 🍎⚽**
