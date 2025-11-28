# Guide Complet - Publication de MaCompo sur Google Play Store

**Version de l'app** : MaCompo 1.0
**Package ID** : `com.jonathanbous.macompo`
**Date de création** : 28 novembre 2025

---

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Prérequis (15 minutes)](#prérequis-15-minutes)
3. [Configuration AdMob (10 minutes)](#configuration-admob-10-minutes)
4. [Création et sécurisation du Keystore (10 minutes)](#création-et-sécurisation-du-keystore-10-minutes)
5. [Configuration de la signature (5 minutes)](#configuration-de-la-signature-5-minutes)
6. [Build de production (10 minutes)](#build-de-production-10-minutes)
7. [Création des assets (30 minutes)](#création-des-assets-30-minutes)
8. [Configuration Google Play Console (45 minutes)](#configuration-google-play-console-45-minutes)
9. [Publication (10 minutes)](#publication-10-minutes)
10. [Après la publication](#après-la-publication)
11. [Mises à jour futures](#mises-à-jour-futures)
12. [Dépannage](#dépannage)

---

## Vue d'ensemble

### Ce que vous allez faire

1. Créer un compte AdMob pour la monétisation
2. Intégrer AdMob dans votre application
3. Créer un keystore (clé de signature) pour signer votre app
4. Générer un fichier AAB signé pour Google Play
5. Créer des screenshots et assets graphiques
6. Configurer votre application sur Google Play Console
7. Publier votre application

### Temps total estimé

**2 à 3 heures** pour une première publication (dont 1 heure pour les screenshots et assets).

### Outils nécessaires

- **Android Studio** (déjà installé)
- **JDK 17** (inclus avec Android Studio)
- **Node.js et npm** (déjà installé)
- Votre **tablette Android** pour les screenshots
- Un compte **Google Play Developer** (25€ de frais uniques)

---

## Prérequis (15 minutes)

### 1. Compte Google Play Developer

Si vous n'avez pas encore de compte :

1. Allez sur https://play.google.com/console/signup
2. Connectez-vous avec votre compte Google
3. Payez les **25 USD** de frais d'inscription (paiement unique)
4. Remplissez le formulaire de développeur
5. Acceptez les conditions d'utilisation

**Note** : La validation du compte peut prendre jusqu'à 48h.

---

### 2. Email de contact professionnel

Google exige un email de contact public pour votre application.

**Recommandation** : Créez un email dédié

1. Allez sur https://gmail.com
2. Créez un nouveau compte : **macompo.app@gmail.com** (ou similaire)
3. Notez le mot de passe dans un gestionnaire de mots de passe
4. Cet email sera visible publiquement sur le Play Store

**Alternative** : Utilisez votre email personnel existant.

---

### 3. Privacy Policy (Politique de confidentialité)

Google exige une Privacy Policy accessible en ligne.

#### Option A : GitHub Pages (GRATUIT - Recommandé)

Si votre code est sur GitHub :

1. Créez un dossier `docs/` à la racine de votre projet
2. Créez le fichier `docs/privacy-policy.html` :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Politique de Confidentialité - MaCompo</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 40px auto;
            padding: 0 20px;
            color: #333;
        }
        h1 { color: #2c3e50; }
        h2 { color: #34495e; margin-top: 30px; }
        .last-updated { color: #7f8c8d; font-style: italic; }
    </style>
</head>
<body>
    <h1>Politique de Confidentialité</h1>
    <p class="last-updated">Dernière mise à jour : 28 novembre 2025</p>

    <h2>1. Introduction</h2>
    <p>
        MaCompo ("nous", "notre", "nos") s'engage à protéger votre vie privée.
        Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos données personnelles.
    </p>

    <h2>2. Données collectées</h2>
    <p>
        MaCompo est une application de gestion de tactiques de football qui fonctionne entièrement hors ligne.
        Nous collectons uniquement :
    </p>
    <ul>
        <li><strong>Données stockées localement</strong> : Vos tactiques, joueurs et compositions sont enregistrés uniquement sur votre appareil.</li>
        <li><strong>Identifiant publicitaire</strong> : Google AdMob peut collecter votre identifiant publicitaire à des fins de diffusion de publicités personnalisées.</li>
    </ul>

    <h2>3. Utilisation des données</h2>
    <ul>
        <li><strong>Stockage local</strong> : Toutes vos tactiques sont stockées localement sur votre appareil et ne sont jamais envoyées à nos serveurs.</li>
        <li><strong>Publicités</strong> : L'identifiant publicitaire est utilisé par Google AdMob pour afficher des publicités pertinentes.</li>
    </ul>

    <h2>4. Partage des données</h2>
    <p>
        Nous ne vendons, n'échangeons ni ne louons vos informations personnelles. Les seules données partagées sont :
    </p>
    <ul>
        <li><strong>Google AdMob</strong> : Pour la diffusion de publicités (voir <a href="https://policies.google.com/privacy">Politique de confidentialité Google</a>)</li>
    </ul>

    <h2>5. Sécurité</h2>
    <p>
        Vos données sont stockées uniquement sur votre appareil et sont protégées par les mécanismes de sécurité de votre système d'exploitation Android.
    </p>

    <h2>6. Vos droits</h2>
    <ul>
        <li><strong>Désinstallation</strong> : Vous pouvez supprimer toutes vos données en désinstallant l'application.</li>
        <li><strong>Publicités personnalisées</strong> : Vous pouvez désactiver les publicités personnalisées dans les paramètres de votre appareil Android (Paramètres > Google > Annonces).</li>
    </ul>

    <h2>7. Applications tierces</h2>
    <p>
        Cette application utilise Google AdMob pour afficher des publicités. AdMob peut collecter des données conformément à sa propre politique de confidentialité :
        <br><a href="https://policies.google.com/privacy">https://policies.google.com/privacy</a>
    </p>

    <h2>8. Modifications</h2>
    <p>
        Nous pouvons mettre à jour cette politique de confidentialité de temps en temps. Nous vous informerons de tout changement en publiant la nouvelle politique sur cette page.
    </p>

    <h2>9. Contact</h2>
    <p>
        Pour toute question concernant cette politique de confidentialité, contactez-nous :
        <br>Email : <a href="mailto:macompo.app@gmail.com">macompo.app@gmail.com</a>
    </p>
</body>
</html>
```

3. Commitez et pushez sur GitHub
4. Activez GitHub Pages :
   - Allez dans **Settings** > **Pages**
   - Source : **Deploy from a branch**
   - Branch : **master** (ou main)
   - Folder : **/docs**
   - Cliquez **Save**
5. Attendez 2-3 minutes
6. Votre URL sera : `https://VOTRE-USERNAME.github.io/VOTRE-REPO/privacy-policy.html`

**Notez cette URL** : Vous en aurez besoin pour Google Play Console.

#### Option B : Hébergement gratuit alternatif

Si vous n'utilisez pas GitHub :
- **Netlify** : https://www.netlify.com/ (gratuit)
- **Vercel** : https://vercel.com/ (gratuit)
- **Firebase Hosting** : https://firebase.google.com/docs/hosting (gratuit)

---

## Configuration AdMob (10 minutes)

AdMob vous permet de monétiser votre application avec des publicités.

### 1. Créer un compte AdMob

1. Allez sur https://admob.google.com/
2. Connectez-vous avec votre compte Google
3. Cliquez **Commencer**
4. Acceptez les conditions d'utilisation
5. Remplissez les informations de paiement (où Google vous enverra l'argent)

---

### 2. Créer une application AdMob

1. Dans le menu AdMob, cliquez **Applications**
2. Cliquez **Ajouter une application**
3. **L'application est-elle déjà publiée sur Google Play ou l'App Store ?** → **Non**
4. **Nom de l'application** : `MaCompo`
5. **Plateforme** : **Android**
6. Cliquez **Ajouter**

AdMob génère un **App ID** de la forme : `ca-app-pub-1234567890123456~1234567890`

**IMPORTANT** : Notez cet App ID, vous en aurez besoin.

---

### 3. Créer des unités publicitaires

Créez des unités publicitaires pour afficher des annonces dans votre app.

#### Bannière (en bas de l'écran)

1. Dans votre app AdMob, cliquez **Unités publicitaires**
2. Cliquez **Ajouter une unité publicitaire**
3. Format : **Bannière**
4. Nom : `Bannière principale`
5. Cliquez **Créer une unité publicitaire**
6. Notez l'**ID de l'unité publicitaire** : `ca-app-pub-1234567890123456/9876543210`

#### Interstitielle (plein écran entre les actions)

1. Cliquez **Ajouter une unité publicitaire**
2. Format : **Interstitielle**
3. Nom : `Interstitielle générale`
4. Cliquez **Créer une unité publicitaire**
5. Notez l'**ID de l'unité publicitaire** : `ca-app-pub-1234567890123456/1111111111`

---

### 4. Configurer AdMob dans votre application

#### A. Installer le plugin Capacitor AdMob

```bash
npm install @capacitor-community/admob
npx cap sync
```

#### B. Ajouter l'App ID dans AndroidManifest.xml

Ouvrez `android/app/src/main/AndroidManifest.xml` et ajoutez **AVANT** la balise `</application>` :

```xml
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY"/>
```

**Remplacez** `ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY` par votre App ID AdMob réel.

#### C. Initialiser AdMob dans votre code

Dans votre fichier principal (ex: `src/main.tsx` ou `src/App.tsx`), ajoutez :

```typescript
import { AdMob } from '@capacitor-community/admob';

// Initialiser AdMob au démarrage
AdMob.initialize({
  requestTrackingAuthorization: true,
  initializeForTesting: false, // Passez à true pour tester
});
```

#### D. Afficher une bannière

```typescript
import { AdMob, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';

// Afficher une bannière en bas de l'écran
const showBanner = async () => {
  await AdMob.showBanner({
    adId: 'ca-app-pub-XXXXXXXXXXXXXXXX/BBBBBBBBBB', // Votre ID de bannière
    adSize: BannerAdSize.BANNER,
    position: BannerAdPosition.BOTTOM_CENTER,
  });
};
```

#### E. Afficher une publicité interstitielle

```typescript
import { AdMob, AdOptions } from '@capacitor-community/admob';

const showInterstitial = async () => {
  const options: AdOptions = {
    adId: 'ca-app-pub-XXXXXXXXXXXXXXXX/IIIIIIIIII', // Votre ID d'interstitielle
  };

  await AdMob.prepareInterstitial(options);
  await AdMob.showInterstitial();
};

// Appelez showInterstitial() après des actions importantes
// Ex: après avoir sauvegardé une tactique
```

#### F. IDs de test (pour développement)

Pendant le développement, utilisez les IDs de test Google :

```typescript
// Bannière de test
adId: 'ca-app-pub-3940256099942544/6300978111'

// Interstitielle de test
adId: 'ca-app-pub-3940256099942544/1033173712'
```

**Avant la publication**, remplacez par vos vrais IDs AdMob.

---

### 5. Rebuild et tester

```bash
npm run build
npx cap sync android
npx cap run android
```

Vérifiez que les publicités s'affichent correctement sur votre appareil.

---

## Création et sécurisation du Keystore (10 minutes)

Le **keystore** est un fichier contenant la clé cryptographique qui signe votre application.

**CRITIQUE** : Si vous perdez ce fichier ou le mot de passe, vous ne pourrez JAMAIS mettre à jour votre app sur Google Play. Vous devrez créer une nouvelle application avec un nouveau package ID.

---

### Méthode 1 : Avec Android Studio (RECOMMANDÉ)

#### Étape 1 : Ouvrir le projet Android

1. Lancez **Android Studio**
2. **File** > **Open**
3. Naviguez vers `C:\Users\j.bous\.gemini\antigravity\scratch\tactical-football-board\android`
4. Cliquez **OK**
5. Attendez que Gradle sync se termine (2-5 minutes)

#### Étape 2 : Générer le keystore

1. **Build** > **Generate Signed Bundle / APK**
2. Sélectionnez **Android App Bundle**
3. Cliquez **Next**
4. Cliquez **Create new...** (à côté de "Key store path")

#### Étape 3 : Remplir les informations

**Key store path** :
```
C:\Users\j.bous\.gemini\antigravity\scratch\tactical-football-board\android\macompo-release-key.jks
```

**Password** : Choisissez un mot de passe FORT (minimum 6 caractères)
- Exemple : `MaCompo2025!Secure`
- **NOTEZ-LE IMMÉDIATEMENT** dans un endroit sûr

**Confirm** : Retapez le même mot de passe

**Alias** : `macompo-key-alias`

**Key password** : Utilisez le **même mot de passe** que ci-dessus (pour simplifier)

**Confirm** : Retapez le mot de passe

**Validity (years)** : `25`

**Certificate** :
- **First and Last Name** : `Jonathan Bous` (votre nom complet)
- **Organizational Unit** : `MaCompo`
- **Organization** : `MaCompo`
- **City or Locality** : `Paris` (votre ville)
- **State or Province** : `Île-de-France` (votre région)
- **Country Code (XX)** : `FR`

#### Étape 4 : Créer le keystore

1. Cliquez **OK**
2. Le fichier `macompo-release-key.jks` est créé dans `android/`

**NE FERMEZ PAS ENCORE ANDROID STUDIO** - vous en aurez besoin pour le build.

---

### Méthode 2 : Avec keytool (ligne de commande)

Si vous préférez la ligne de commande :

```bash
cd android
keytool -genkeypair -v -storetype PKCS12 -keystore macompo-release-key.jks -alias macompo-key-alias -keyalg RSA -keysize 2048 -validity 9125
```

**Répondez aux questions** :
- **Keystore password** : Choisissez un mot de passe FORT et notez-le
- **Key password** : Appuyez sur Entrée pour utiliser le même mot de passe
- **First and Last Name** : Votre nom
- **Organizational Unit** : MaCompo
- **Organization** : MaCompo
- **City** : Votre ville
- **State** : Votre région
- **Country Code** : FR
- Tapez `yes` pour confirmer

---

### Sauvegarder le keystore (CRUCIAL)

**ATTENTION** : Cette étape est OBLIGATOIRE.

1. **Ouvrez** le fichier `android/keystore-info.txt` (déjà présent)
2. **Remplissez** vos mots de passe :

```
Keystore password : [VOTRE_MOT_DE_PASSE]
Key password : [VOTRE_MOT_DE_PASSE]
```

3. **Sauvegardez ce fichier** dans au moins 3 endroits différents :

#### Sauvegarde 1 : Clé USB
- Copiez `android/macompo-release-key.jks` sur une clé USB
- Copiez également `android/keystore-info.txt` sur la clé USB
- Étiquetez la clé USB "KEYSTORE MACOMPO - NE PAS EFFACER"

#### Sauvegarde 2 : Cloud sécurisé
- **Google Drive** : Créez un dossier "MaCompo Keystore" et uploadez les 2 fichiers
- Ou **Dropbox**, **OneDrive**, etc.

#### Sauvegarde 3 : Gestionnaire de mots de passe
- Si vous utilisez **1Password**, **LastPass**, **Bitwarden**, etc.
- Créez une entrée "MaCompo Keystore" avec :
  - Le fichier `.jks` en pièce jointe
  - Les mots de passe dans les champs sécurisés

#### Sauvegarde 4 (optionnelle) : Email
- Envoyez-vous par email les fichiers `.jks` et `.txt`
- Archivez l'email et marquez-le comme important

**Note** : Le fichier `.jks` est déjà dans `.gitignore`, il ne sera JAMAIS commité sur Git. C'est normal et souhaité pour la sécurité.

---

## Configuration de la signature (5 minutes)

Vous devez maintenant configurer Gradle pour qu'il utilise votre keystore lors du build.

### Vérifier gradle.properties

Le fichier `android/gradle.properties` doit contenir :

```properties
MACOMPO_RELEASE_STORE_FILE=macompo-release-key.jks
MACOMPO_RELEASE_KEY_ALIAS=macompo-key-alias
MACOMPO_RELEASE_STORE_PASSWORD=VOTRE_MOT_DE_PASSE_ICI
MACOMPO_RELEASE_KEY_PASSWORD=VOTRE_MOT_DE_PASSE_ICI

org.gradle.jvmargs=-Xmx2048m -Dfile.encoding=UTF-8
android.useAndroidX=true
android.enableJetifier=true
```

**Remplacez** `VOTRE_MOT_DE_PASSE_ICI` par votre vrai mot de passe keystore.

**Note** : Ce fichier est également dans `.gitignore` pour ne pas exposer vos mots de passe.

---

### Vérifier build.gradle

Ouvrez `android/app/build.gradle` et vérifiez que ces lignes sont présentes (elles devraient déjà l'être) :

```gradle
android {
    ...

    signingConfigs {
        release {
            if (project.hasProperty('MACOMPO_RELEASE_STORE_FILE')) {
                storeFile file(MACOMPO_RELEASE_STORE_FILE)
                storePassword MACOMPO_RELEASE_STORE_PASSWORD
                keyAlias MACOMPO_RELEASE_KEY_ALIAS
                keyPassword MACOMPO_RELEASE_KEY_PASSWORD
            }
        }
    }

    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

Si ces lignes sont déjà présentes, **ne changez rien**.

---

## Build de production (10 minutes)

Vous êtes maintenant prêt à générer le fichier AAB (Android App Bundle) signé.

### Méthode 1 : Avec Android Studio (RECOMMANDÉ)

1. Ouvrez Android Studio avec votre projet Android ouvert
2. **Build** > **Generate Signed Bundle / APK**
3. Sélectionnez **Android App Bundle**
4. Cliquez **Next**
5. **Key store path** : Sélectionnez `android/macompo-release-key.jks`
6. **Key store password** : Entrez votre mot de passe
7. **Key alias** : `macompo-key-alias`
8. **Key password** : Entrez votre mot de passe
9. Cochez **Remember passwords** (optionnel, pour ne pas les retaper à chaque fois)
10. Cliquez **Next**
11. **Build Variants** : Cochez **release**
12. Cliquez **Finish**

**Attendez** que le build se termine (2-5 minutes).

Une notification apparaîtra en bas à droite : **"locate"** ou **"analyze"**.

Le fichier AAB sera dans :
```
android\app\release\app-release.aab
```

---

### Méthode 2 : Ligne de commande

```bash
# Depuis la racine du projet
cd android
gradlew bundleRelease
```

ou sur Windows :

```cmd
cd android
.\gradlew bundleRelease
```

**Attendez** que le build se termine.

Le fichier AAB sera dans :
```
android\app\build\outputs\bundle\release\app-release.aab
```

---

### Vérifier le fichier AAB

1. Naviguez vers le dossier contenant `app-release.aab`
2. Vérifiez la taille du fichier :
   - Il devrait faire au moins **5-15 MB**
   - Si moins de 1 MB, il y a un problème
3. Vérifiez la date de modification : doit être aujourd'hui

**Félicitations !** Vous avez votre fichier de production signé.

---

## Création des assets (30 minutes)

Google Play exige des assets graphiques pour publier votre app.

### 1. Icône de l'application

Votre icône existe déjà dans `android/app/src/main/res/`.

Si vous voulez la modifier :

1. Créez une icône 512x512 px (format PNG)
2. Utilisez **Android Studio** :
   - **File** > **New** > **Image Asset**
   - **Foreground Layer** : Sélectionnez votre image
   - Ajustez le padding si nécessaire
   - Cliquez **Next** puis **Finish**

---

### 2. Screenshots (MINIMUM 2 requis)

Vous devez fournir **au minimum 2 screenshots** de votre application en fonctionnement.

#### Préparer l'application avec des données de démo

1. Branchez votre tablette en USB
2. Activez le **Mode développeur** et **Débogage USB** sur la tablette
3. Lancez l'application :

```bash
npm run build
npx cap sync android
npx cap run android
```

4. Dans l'app sur la tablette, créez du contenu réaliste :
   - **Nom d'utilisateur** : Ex: "Coach Jonathan"
   - **Créez 3-4 tactiques** avec des noms professionnels :
     - "4-3-3 Offensive"
     - "4-4-2 Classique"
     - "3-5-2 Centre fort"
     - "4-2-3-1 Moderne"
   - **Ouvrez une tactique** et ajoutez **11 joueurs** bien placés :
     - Donnez-leur des noms réalistes
     - Numéros de maillot cohérents (1-11)
     - Positions correctes
     - Variez les couleurs

#### Capturer les screenshots

Sur votre tablette Android : **Bouton Power + Volume Bas** simultanément.

**Screenshot 1 - Dashboard** :
- Montrez le tableau de bord avec vos 3-4 tactiques
- Assurez-vous que l'interface est propre et professionnelle
- Capturez l'écran

**Screenshot 2 - Terrain avec composition** :
- Ouvrez une tactique avec 11 joueurs bien placés
- Formation visible et esthétique (ex: 4-3-3)
- Noms et numéros visibles
- Capturez l'écran

**Screenshot 3 - Édition de joueur** (optionnel mais recommandé) :
- Double-cliquez sur un joueur
- Montrez la modal d'édition avec les champs remplis
- Capturez l'écran

**Screenshot 4 - Génération de convocation** (optionnel) :
- Ouvrez la fonctionnalité de génération de convocation
- Montrez la liste des joueurs
- Capturez l'écran

#### Transférer les screenshots sur PC

**Méthode A : USB**
1. Connectez la tablette au PC en USB
2. Ouvrez l'**Explorateur de fichiers**
3. Tablette > **DCIM** > **Screenshots**
4. Copiez les screenshots sur votre PC

**Méthode B : Email**
1. Ouvrez l'app **Photos** ou **Galerie** sur la tablette
2. Sélectionnez les screenshots
3. Partagez par email à vous-même

**Méthode C : Google Photos**
1. Les screenshots sont automatiquement synchronisés sur Google Photos
2. Téléchargez-les depuis https://photos.google.com

#### Renommer et optimiser

1. Renommez vos fichiers :
   - `screenshot-1-dashboard.png`
   - `screenshot-2-terrain.png`
   - `screenshot-3-joueur.png`
   - `screenshot-4-convocation.png`

2. Si les screenshots sont trop gros (>3 MB chacun) :
   - Utilisez un outil de compression comme **TinyPNG** (https://tinypng.com/)
   - Ou réduisez la résolution à **1080 x 1920 px** max

---

### 3. Feature Graphic (optionnel mais recommandé)

Le **Feature Graphic** est une bannière de **1024 x 500 px** affichée en haut de votre fiche Play Store.

#### Créer avec Canva (gratuit)

1. Allez sur https://www.canva.com/
2. Créez un design personnalisé : **1024 x 500 px**
3. Ajoutez :
   - Le nom de l'app : **MaCompo**
   - Un slogan : "Créez vos tactiques de football"
   - Une image de terrain de football
   - Des icônes de joueurs ou de ballons
4. Exportez en PNG

**Si vous n'avez pas le temps**, passez cette étape. Vous pourrez l'ajouter plus tard.

---

## Configuration Google Play Console (45 minutes)

### 1. Créer l'application

1. Allez sur https://play.google.com/console
2. Cliquez **Créer une application**
3. **Nom de l'application** : `MaCompo`
4. **Langue par défaut** : Français (France)
5. **Application ou jeu** : Application
6. **Gratuite ou payante** : Gratuite
7. Cochez toutes les déclarations (politique de confidentialité, droits de propriété, etc.)
8. Cliquez **Créer l'application**

---

### 2. Tableau de bord - Tâches obligatoires

Google Play Console affiche un **tableau de bord** avec des tâches à compléter.

---

#### A. Fiche de la boutique

**Menu latéral** : **Développer votre application** > **Fiche de la boutique principale**

##### Détails de l'application

**Nom de l'application** :
```
MaCompo
```

**Description courte** (80 caractères max) :
```
Créez vos tactiques de football facilement - Tableau tactique interactif
```

**Description complète** (4000 caractères max) :
```
Créez vos tactiques de football comme un pro !

MaCompo est l'application parfaite pour tous les entraîneurs, éducateurs sportifs et passionnés de football qui souhaitent créer et partager leurs compositions d'équipe de manière simple et professionnelle.

🎯 Fonctionnalités principales

⚽ Tableau tactique interactif
• Placez vos joueurs sur un terrain de football réaliste
• Déplacez-les facilement par glisser-déposer
• Visualisez instantanément votre formation (4-3-3, 4-4-2, 3-5-2, etc.)
• Interface moderne et intuitive

👥 Gestion complète des joueurs
• Personnalisez chaque joueur : nom, prénom, numéro de maillot
• Assignez des positions précises
• Différenciez vos joueurs avec des couleurs
• Modifiez les informations en un double-clic

📋 Organisation et sauvegarde
• Créez plusieurs tactiques différentes
• Donnez un nom et une description à chaque formation
• Retrouvez toutes vos tactiques dans un tableau de bord clair
• Sauvegarde automatique de toutes vos modifications
• Pas de perte de données, tout est stocké localement

📄 Génération de convocation
• Créez automatiquement votre feuille de match
• Liste claire et professionnelle de vos joueurs convoqués
• Parfait pour l'impression ou le partage avec votre équipe

✨ Pourquoi choisir MaCompo ?

✅ Interface moderne et intuitive - Aucune formation nécessaire
✅ Utilisation 100% gratuite - Pas d'achats intégrés
✅ Fonctionne hors ligne - Pas besoin de connexion internet
✅ Design adapté aux smartphones ET aux tablettes
✅ Sauvegarde locale sécurisée de toutes vos données
✅ Légère et rapide - Ne ralentit pas votre appareil
✅ Mises à jour régulières

🏆 Idéal pour :

• Entraîneurs de football amateur et professionnel
• Éducateurs sportifs et formateurs
• Joueurs souhaitant analyser des tactiques
• Clubs de football de tous niveaux
• Écoles de football et centres de formation
• Passionnés de football et de stratégie

📱 Comment ça marche ?

1. Créez une nouvelle tactique avec un nom
2. Ajoutez vos joueurs sur le terrain en quelques clics
3. Déplacez-les pour créer votre formation idéale
4. Sauvegardez et modifiez quand vous voulez
5. Générez une convocation pour votre match

Téléchargez MaCompo maintenant et créez vos tactiques gagnantes ! ⚽🏆
```

##### Assets graphiques

**Icône de l'application** (512 x 512 px) :
- Elle sera uploadée automatiquement avec l'AAB
- Ou uploadez-la manuellement depuis `android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png`

**Screenshots smartphone** :
- Uploadez vos 2 à 8 screenshots (minimum 2)
- Format recommandé : 1080 x 1920 px ou taille native de votre tablette
- Glissez-déposez dans l'ordre :
  1. Dashboard
  2. Terrain avec composition
  3. Édition de joueur
  4. Convocation

**Feature Graphic** (1024 x 500 px) (optionnel) :
- Si vous l'avez créé, uploadez-le
- Sinon, passez pour l'instant

##### Catégorie et tags

**Catégorie** : **Sports**

**Tags** (optionnel) :
- football
- tactique
- coach
- formation

##### Coordonnées

**Adresse e-mail** : `macompo.app@gmail.com` (votre email de contact)

**Site web** : (optionnel - laissez vide si vous n'en avez pas)

**Numéro de téléphone** : (optionnel - laissez vide)

**Cliquez ENREGISTRER en bas de la page**

---

#### B. Configuration de l'application

##### 1. Confidentialité de l'application

**Menu** : **Configuration de l'application** > **Confidentialité de l'application**

**URL de la politique de confidentialité** :
```
https://VOTRE-USERNAME.github.io/VOTRE-REPO/privacy-policy.html
```

Remplacez par votre vraie URL GitHub Pages.

**Enregistrer**

---

##### 2. Accès à l'application

**Menu** : **Configuration de l'application** > **Accès à l'application**

Sélectionnez :
- **Toutes les fonctionnalités sont disponibles sans restriction spéciale**

**Enregistrer**

---

##### 3. Annonces

**Menu** : **Configuration de l'application** > **Annonces**

**Votre application contient-elle des annonces ?** : **OUI**

**Enregistrer**

---

##### 4. Classification du contenu

**Menu** : **Configuration de l'application** > **Classification du contenu**

1. Cliquez **Commencer le questionnaire**
2. **Adresse e-mail** : `macompo.app@gmail.com`
3. **Catégorie** : **Utilitaires, productivité, communication ou autres**
4. **Contenu** :
   - Violence : **Non**
   - Sexualité : **Non**
   - Langage grossier : **Non**
   - Contenu sensible : **Non**
   - Drogues/alcool : **Non**
   - Jeu d'argent : **Non**
   - Partage de localisation : **Non**
   - Achats numériques : **Non**
5. **Enregistrer le questionnaire**

Classification attendue : **PEGI 3** ou **Tout public**

---

##### 5. Public cible et contenu

**Menu** : **Configuration de l'application** > **Public cible et contenu**

**Tranche d'âge cible** : **13 ans et plus** (ou "Tous les âges")

**Votre application s'adresse-t-elle principalement aux enfants ?** : **Non**

**Enregistrer**

---

##### 6. Sécurité des données

**Menu** : **Configuration de l'application** > **Sécurité des données**

C'est la partie la plus importante pour la conformité RGPD et les politiques de Google.

**Cliquez "Commencer"**

**1. Votre application collecte-t-elle ou partage-t-elle des données utilisateur ?**
- **OUI** (à cause d'AdMob)

**2. Votre application utilise-t-elle des bibliothèques tierces pour la collecte de données ?**
- **OUI** (AdMob)

**3. Toutes les données collectées sont-elles chiffrées en transit ?**
- **OUI** (AdMob utilise HTTPS)

**4. Donnez-vous aux utilisateurs un moyen de demander la suppression de leurs données ?**
- **OUI** (désinstallation de l'app)

**5. Types de données collectées** :

Sélectionnez :
- **Identifiant publicitaire**

Ne sélectionnez PAS :
- Localisation
- Informations personnelles
- Photos/vidéos
- Fichiers
- Autres

**6. Pour chaque type de donnée sélectionné** :

**Identifiant publicitaire** :
- **Collectée** : OUI
- **Partagée** : OUI
- **Objectif de la collecte** : Publicité ou marketing
- **Objectif du partage** : Publicité ou marketing
- **La collecte est-elle optionnelle ?** : OUI (l'utilisateur peut désactiver les annonces personnalisées dans les paramètres Android)

**Enregistrer**

---

##### 7. Pays et régions

**Menu** : **Configuration de l'application** > **Pays et régions**

**Pays et régions disponibles** : **Tous les pays** (recommandé)

Ou sélectionnez uniquement la France et les pays francophones si vous préférez.

**Enregistrer**

---

### 3. Créer une version de test interne (optionnel mais recommandé)

Avant de publier en production, testez d'abord en interne.

**Menu** : **Tests** > **Test interne**

1. Cliquez **Créer une version**
2. **Uploadez** votre fichier `app-release.aab`
3. Attendez le traitement (2-5 minutes)
4. **Nom de la version** : `1.0.0 (1)`
5. **Notes de version** :
```
Première version de test
```
6. **Enregistrer**
7. Créez une liste de testeurs (ajoutez votre email)
8. **Examiner la version** puis **Déployer sur la piste de test interne**

Vous recevrez un lien pour installer l'app en test. Testez-la pendant 24-48h.

**Si tout fonctionne bien, passez à la production.**

---

## Publication (10 minutes)

### 1. Créer une version de production

**Menu** : **Versions** > **Piste de production**

1. Cliquez **Créer une version**
2. **Importez** votre fichier `app-release.aab`
   - Cliquez **Parcourir les fichiers**
   - Sélectionnez `android/app/release/app-release.aab` ou `android/app/build/outputs/bundle/release/app-release.aab`
3. Attendez l'upload et le traitement (2-10 minutes)
4. Google analyse automatiquement l'AAB et détecte :
   - Version code : `1`
   - Version name : `1.0`
   - Taille approximative : X MB
   - Architectures supportées : arm64-v8a, armeabi-v7a, x86_64

---

### 2. Nom de version et notes

**Nom de la version** : `1.0.0 (1)`

**Notes de version (en français)** :
```
Première version de MaCompo ! ⚽

🎉 Fonctionnalités :
• Créez vos tactiques de football sur un terrain interactif
• Ajoutez et personnalisez vos joueurs (nom, numéro, position)
• Sauvegardez plusieurs compositions tactiques
• Générez vos feuilles de convocation
• Interface moderne et intuitive
• Fonctionne 100% hors ligne

Bon coaching ! 🏆
```

**Enregistrer**

---

### 3. Examiner et déployer

1. Cliquez **Enregistrer** (en bas)
2. Cliquez **Examiner la version**
3. Google affiche un résumé :
   - Vérifiez qu'il n'y a **aucune erreur bloquante**
   - Des **avertissements** sont normaux (ex: "Icône manquante pour TV", "Permissions non déclarées", etc.) - ignorez-les
4. Si tout est OK, cliquez **Démarrer le déploiement sur la piste de production**

---

### 4. Confirmation finale

Google affiche un écran de confirmation avec des cases à cocher :

- [ ] Je confirme que cette application respecte les Règles relatives aux développeurs
- [ ] Je confirme que cette application respecte les lois sur les exportations américaines
- [ ] (Autres cases selon votre localisation)

**Cochez toutes les cases**

**Cliquez "Déployer"**

---

### 5. Soumission terminée

**Félicitations !** Votre application est maintenant **en cours d'examen** par Google.

Vous verrez un message :
> "Votre version est en cours d'examen. Cela peut prendre jusqu'à 7 jours."

---

## Après la publication

### 1. Temps d'examen

**Première soumission** : 1 à 7 jours (généralement 2-3 jours)

**Mises à jour ultérieures** : 1 à 2 jours

### 2. Notifications

Vous recevrez un email sur votre compte Google Play Console quand :

**Approuvée** :
> "Votre application MaCompo a été approuvée et est maintenant publiée sur Google Play."

**Rejetée** :
> "Votre application MaCompo a été rejetée pour la raison suivante : [explication]"

Si rejetée, lisez attentivement le motif, corrigez, et resoumettez.

---

### 3. Une fois publiée

#### Trouver votre app sur Google Play

URL de votre application :
```
https://play.google.com/store/apps/details?id=com.jonathanbous.macompo
```

#### Partager votre app

Partagez ce lien avec :
- Vos amis et famille
- Sur les réseaux sociaux
- Dans des groupes de football
- Sur des forums d'entraîneurs

---

### 4. Vérifier AdMob

1. Attendez 24-48h après la publication
2. Téléchargez votre app depuis le Play Store
3. Testez les publicités :
   - La bannière s'affiche-t-elle ?
   - Les interstitielles fonctionnent-elles ?
4. Allez sur https://apps.admob.com/
5. Vérifiez les **impressions** et **revenus**

**Note** : Les premières statistiques peuvent prendre 24-48h à apparaître.

---

### 5. Monitorer les performances

**Google Play Console** : https://play.google.com/console

Consultez régulièrement :

**Tableau de bord** :
- Installations
- Désinstallations
- Notes et avis utilisateurs
- Crashs et ANR (Application Not Responding)

**Statistiques** :
- Nombre de téléchargements par jour/semaine/mois
- Appareils utilisés
- Pays des utilisateurs
- Versions Android utilisées

**Avis et notes** :
- Répondez aux avis utilisateurs (surtout les négatifs)
- Améliorez l'app en fonction des retours

**Rapports de bugs** :
- Consultez les crashs signalés
- Corrigez-les dans les mises à jour

---

### 6. Revenue AdMob

**AdMob Console** : https://apps.admob.com/

**Métriques importantes** :
- **Impressions** : Nombre de fois qu'une pub a été affichée
- **Clics** : Nombre de clics sur les pubs
- **eCPM** (effective Cost Per Mille) : Revenu pour 1000 impressions
- **Revenus estimés** : Argent gagné (mis à jour quotidiennement)

**Seuil de paiement** :
- **France** : 70 € minimum pour recevoir un virement
- Google paie vers le 21 de chaque mois

**Conseils pour augmenter les revenus** :
- Plus d'utilisateurs = plus de revenus
- Bannières : Affichage constant = plus d'impressions
- Interstitielles : À placer stratégiquement (après une action importante)
- Ne surchargez PAS l'app de pubs (mauvaise expérience utilisateur = désinstallations)

---

## Mises à jour futures

### Quand mettre à jour

Mettez à jour votre app pour :
- Corriger des bugs
- Ajouter de nouvelles fonctionnalités
- Améliorer les performances
- Mettre à jour les dépendances de sécurité

**Fréquence recommandée** : 1 mise à jour tous les 2-3 mois (minimum).

---

### Comment faire une mise à jour

#### 1. Modifier le code

Apportez vos modifications dans le code source.

#### 2. Incrémenter la version

Ouvrez `android/app/build.gradle` :

```gradle
defaultConfig {
    applicationId "com.jonathanbous.macompo"
    minSdkVersion rootProject.ext.minSdkVersion
    targetSdkVersion rootProject.ext.targetSdkVersion
    versionCode 2          // Incrémentez de 1 (était 1, devient 2)
    versionName "1.1.0"    // Nouvelle version (ex: 1.0 -> 1.1 ou 2.0)
    ...
}
```

**versionCode** : Nombre entier qui doit TOUJOURS augmenter (1, 2, 3, 4...)
**versionName** : Version lisible par l'utilisateur (ex: "1.1.0", "2.0.0")

#### 3. Rebuild l'AAB

```bash
npm run build
npx cap sync android
cd android
.\gradlew bundleRelease
```

Ou avec Android Studio : **Build** > **Generate Signed Bundle / APK**

#### 4. Upload sur Google Play Console

1. **Menu** : **Versions** > **Piste de production**
2. **Créer une version**
3. **Uploadez** le nouveau `app-release.aab`
4. **Notes de version** : Décrivez les changements
```
Version 1.1.0

🆕 Nouveautés :
• Nouvelle fonctionnalité X
• Amélioration de Y

🐛 Corrections :
• Correction du bug Z
• Performance améliorée
```
5. **Enregistrer** > **Examiner la version** > **Déployer**

**L'examen prend généralement 1-2 jours pour les mises à jour.**

---

## Dépannage

### Erreur : "Upload failed: Version code X has already been used"

**Solution** : Incrémentez `versionCode` dans `android/app/build.gradle`.

---

### Erreur : "The APK/AAB is not signed"

**Cause** : Le fichier `gradle.properties` est absent ou les mots de passe sont incorrects.

**Solution** :
1. Vérifiez que `android/gradle.properties` existe
2. Vérifiez que les mots de passe sont corrects
3. Rebuild avec `.\gradlew clean bundleRelease`

---

### Erreur : "Keystore file not found"

**Cause** : Le fichier `.jks` est introuvable.

**Solution** :
1. Vérifiez que `android/macompo-release-key.jks` existe
2. Vérifiez le chemin dans `gradle.properties` :
```properties
MACOMPO_RELEASE_STORE_FILE=macompo-release-key.jks
```

---

### Les publicités ne s'affichent pas

**Causes possibles** :

1. **Vous utilisez des IDs de test** : Remplacez par vos vrais IDs AdMob.
2. **AdMob pas activé** : Attendez 24-48h après la création du compte.
3. **App pas publiée** : Les pubs réelles ne fonctionnent qu'en production.
4. **Limite de requêtes atteinte** : AdMob limite les requêtes pendant le développement.

**Solution** :
1. Vérifiez les IDs dans votre code
2. Vérifiez que l'App ID est dans `AndroidManifest.xml`
3. Attendez 24-48h après publication
4. Consultez les logs AdMob dans Android Studio (Logcat)

---

### L'application crash au démarrage

**Diagnostic** :

1. Ouvrez Android Studio
2. Lancez l'app en mode debug : **Run** > **Debug 'app'**
3. Consultez **Logcat** pour voir l'erreur

**Causes courantes** :
- Erreur dans le code JavaScript/TypeScript
- Plugin Capacitor non synchronisé : `npx cap sync android`
- Dépendance manquante : `npm install`

---

### Rejet Google Play : "Privacy Policy manquante ou inaccessible"

**Solution** :
1. Vérifiez que votre URL de Privacy Policy fonctionne
2. Ouvrez l'URL dans un navigateur : elle doit s'afficher
3. Si GitHub Pages n'est pas activé, réactivez-le (Settings > Pages)
4. Attendez 5 minutes, puis testez l'URL à nouveau
5. Resoumettez votre app

---

### Rejet Google Play : "Violation de la politique de contenu sensible"

**Cause** : Google a détecté quelque chose de contraire aux règles.

**Solution** :
1. Lisez attentivement l'email de rejet
2. Identifiez le contenu problématique (pub inappropriée, texte, image, etc.)
3. Corrigez le problème
4. Incrémentez la version et resoumettez

---

### J'ai perdu mon keystore ou mon mot de passe

**Malheureusement, c'est IRRÉCUPÉRABLE.**

**Conséquences** :
- Vous ne pourrez JAMAIS mettre à jour votre app existante
- Vous devrez créer une nouvelle app avec un nouveau package ID

**Solution de dernier recours** :
1. Créez une nouvelle app avec un nouveau package : `com.jonathanbous.macompo2`
2. Publiez-la comme nouvelle application
3. L'ancienne app restera sur le Play Store mais ne pourra plus être mise à jour

**Prévention** : SAUVEGARDEZ votre keystore dans 3 endroits différents (USB, Cloud, gestionnaire de mots de passe).

---

## Checklist finale avant publication

Avant de cliquer "Déployer", vérifiez :

- [ ] Privacy Policy accessible en ligne et URL notée
- [ ] Email de contact créé (`macompo.app@gmail.com`)
- [ ] Compte Google Play Developer créé et payé (25 USD)
- [ ] AdMob configuré avec App ID et Unit IDs
- [ ] AdMob intégré dans le code (IDs de PRODUCTION, pas de test)
- [ ] Keystore créé (`macompo-release-key.jks`)
- [ ] Keystore sauvegardé dans 3 endroits différents (USB, Cloud, email)
- [ ] Mots de passe keystore notés dans `keystore-info.txt`
- [ ] `gradle.properties` configuré avec les bons mots de passe
- [ ] Build AAB réussi (`app-release.aab` généré)
- [ ] Fichier AAB fait au moins 5 MB
- [ ] Minimum 2 screenshots capturés et optimisés
- [ ] Fiche de la boutique complétée (nom, descriptions, catégorie)
- [ ] Icône de l'app uploadée (512x512 px)
- [ ] Configuration de l'application complétée :
  - [ ] Confidentialité de l'application (URL Privacy Policy)
  - [ ] Accès à l'application
  - [ ] Annonces : OUI
  - [ ] Classification du contenu (PEGI 3)
  - [ ] Public cible (13 ans et plus)
  - [ ] Sécurité des données (Identifiant publicitaire)
  - [ ] Pays et régions (Tous les pays)
- [ ] Version de production créée et AAB uploadé
- [ ] Notes de version rédigées
- [ ] Toutes les erreurs corrigées (avertissements OK)

**Si toutes les cases sont cochées, vous êtes prêt à publier !**

---

## Ressources utiles

### Documentation officielle

- **Google Play Console** : https://play.google.com/console
- **Guide de publication Google** : https://developer.android.com/studio/publish
- **Politiques Google Play** : https://play.google.com/about/developer-content-policy/
- **AdMob** : https://admob.google.com/
- **Capacitor** : https://capacitorjs.com/docs

### Support

- **Google Play Help** : https://support.google.com/googleplay/android-developer
- **AdMob Help** : https://support.google.com/admob

### Outils

- **Android Studio** : https://developer.android.com/studio
- **Canva** (création graphique) : https://www.canva.com/
- **TinyPNG** (compression images) : https://tinypng.com/

---

## Conclusion

Vous avez maintenant toutes les informations pour publier MaCompo sur Google Play Store avec AdMob intégré.

**Bon courage pour la publication !** ⚽🚀

Si vous rencontrez un problème, consultez la section **Dépannage** ou cherchez sur Google / Stack Overflow.
