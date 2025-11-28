# Guide de Publication - MaCompo sur Google Play

## Étape 1 : Activer GitHub Pages (Privacy Policy)

1. Allez sur https://github.com/TechFlow-soluces/MaCompo/settings/pages
2. Dans "Source", sélectionnez **master**
3. Dans le dossier, sélectionnez **/docs**
4. Cliquez sur "Save"
5. Attendez 2-3 minutes
6. Votre Privacy Policy sera à : **https://techflow-soluces.github.io/MaCompo/privacy-policy.html**

---

## Étape 2 : Créer le Keystore de signature

Le keystore est la clé qui signe votre application. **Si vous le perdez, vous ne pourrez JAMAIS mettre à jour l'app sur Google Play !**

### Option A : Avec Android Studio (Recommandé)

1. Ouvrez Android Studio
2. Menu **Build** > **Generate Signed Bundle / APK**
3. Sélectionnez **Android App Bundle**
4. Cliquez sur "Create new..."
5. Remplissez :
   - **Key store path** : `C:\Users\j.bous\.gemini\antigravity\scratch\tactical-football-board\android\macompo-release-key.jks`
   - **Password** : Choisissez un mot de passe fort (notez-le dans android/keystore-info.txt)
   - **Alias** : macompo-key-alias
   - **Password** (key) : Même mot de passe que ci-dessus (plus simple)
   - **Validity** : 25 ans
   - **Certificate** :
     - First and Last Name : Jonathan Bous
     - Organizational Unit : MaCompo
     - Organization : MaCompo
     - City : [Votre ville]
     - State : [Votre région]
     - Country Code : FR
6. Cliquez "OK"
7. **IMPORTANT** : Notez le mot de passe dans `android/keystore-info.txt`
8. **IMPORTANT** : Sauvegardez le fichier .jks sur une clé USB et un cloud

### Option B : En ligne de commande

Si keytool est disponible (avec Java JDK) :

```bash
cd android
keytool -genkeypair -v -storetype PKCS12 -keystore macompo-release-key.jks -alias macompo-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

Vous devrez répondre aux questions :
- **Keystore password** : Choisissez et NOTEZ-LE
- **Key password** : Même chose (peut être identique au keystore password)
- **First and Last Name** : Jonathan Bous
- **Organizational Unit** : MaCompo
- **Organization** : MaCompo
- **City** : Votre ville
- **State** : Votre région
- **Country Code** : FR

---

## Étape 3 : Configurer la signature dans Android

### Créer le fichier key.properties

Créez le fichier `android/key.properties` avec ce contenu :

```properties
storePassword=VOTRE_MOT_DE_PASSE
keyPassword=VOTRE_MOT_DE_PASSE
keyAlias=macompo-key-alias
storeFile=macompo-release-key.jks
```

**⚠️ Remplacez VOTRE_MOT_DE_PASSE par le vrai mot de passe**

---

## Étape 4 : Build de production

### Avec Android Studio

1. Menu **Build** > **Generate Signed Bundle / APK**
2. Sélectionnez **Android App Bundle**
3. Sélectionnez votre keystore (macompo-release-key.jks)
4. Entrez les mots de passe
5. Sélectionnez **release** build variant
6. Cliquez "Finish"
7. Le fichier .aab sera dans `android/app/release/app-release.aab`

### En ligne de commande

```bash
cd android
./gradlew bundleRelease
```

Le fichier sera dans : `android/app/build/outputs/bundle/release/app-release.aab`

---

## Étape 5 : Créer la fiche Google Play Console

### 5.1 Accéder à la console

1. Allez sur https://play.google.com/console
2. Cliquez sur "Créer une application"
3. Remplissez :
   - **Nom** : MaCompo
   - **Langue par défaut** : Français (France)
   - **Application ou jeu** : Application
   - **Gratuite ou payante** : Gratuite
4. Acceptez les conditions
5. Cliquez "Créer l'application"

### 5.2 Remplir les informations de base

#### Tableau de bord > Configuration de l'application

**Confidentialité de l'application :**
1. Cliquez sur "Commencer"
2. **URL de la politique de confidentialité** : `https://techflow-soluces.github.io/MaCompo/privacy-policy.html`
3. Enregistrer

**Accès à l'application :**
1. Sélectionnez "Toutes les fonctionnalités sont disponibles sans restriction"
2. Enregistrer

**Annonces :**
1. **Votre application contient-elle des annonces ?** : Oui
2. Enregistrer

**Classification du contenu :**
1. Cliquez sur "Commencer le questionnaire"
2. **Adresse e-mail** : macompo.app@gmail.com (créez cet email si pas fait)
3. **Catégorie** : Utilitaires, productivité, communication ou autres
4. Répondez aux questions (tout "Non" car c'est une app de tactiques sportives)
5. Vérifiez la classification (devrait être PEGI 3)
6. Enregistrer

**Public cible et contenu :**
1. **Tranche d'âge cible** : 13 ans et plus (ou Tous les âges)
2. **Votre application s'adresse-t-elle aux enfants ?** : Non (sauf si vous ciblez les enfants)
3. Enregistrer

**Sécurité des données :**
1. Cliquez sur "Commencer"
2. **Votre application collecte ou partage des données utilisateur ?** : Oui (à cause d'AdMob)
3. **Votre application utilise des bibliothèques tierces qui collectent des données ?** : Oui
4. Suivez le questionnaire :
   - **Types de données collectées** : Identifiant publicitaire (par AdMob uniquement)
   - **Localisation** : Non
   - **Informations personnelles** : Non
   - **Photos/vidéos** : Non
   - **Fichiers** : Non
   - **Données de l'appareil** : Oui (ID publicitaire seulement)
   - **Objectif** : Publicité
   - **Partage** : Oui, avec Google (AdMob)
   - **Chiffrement en transit** : Non applicable (stockage local)
   - **Possibilité de supprimer** : Oui (désinstallation)
5. Vérifier et enregistrer

### 5.3 Fiche de la boutique

**Tableau de bord > Fiche de la boutique principale**

**Détails de l'application :**
- **Nom de l'application** : MaCompo
- **Description courte** :
```
Créez vos tactiques de football facilement - Tableau tactique interactif
```

- **Description complète** : (Copiez depuis `store-assets/description-fr.md`)
```
Créez vos tactiques de football comme un pro !

MaCompo est l'application parfaite pour tous les entraîneurs, éducateurs sportifs et passionnés de football qui souhaitent créer et partager leurs compositions d'équipe de manière simple et professionnelle.

Fonctionnalités principales :

⚽ Tableau tactique interactif
- Placez vos joueurs sur un terrain de football réaliste
- Déplacez-les facilement par glisser-déposer
- Visualisez instantanément votre formation

👥 Gestion complète des joueurs
- Personnalisez chaque joueur : nom, prénom, numéro
- Assignez des positions et des couleurs
- Modifiez les informations en un double-clic

📋 Organisation et sauvegarde
- Créez plusieurs tactiques différentes
- Donnez un nom et une description à chaque formation
- Retrouvez toutes vos tactiques dans votre tableau de bord
- Sauvegarde automatique de vos modifications

📄 Génération de convocation
- Créez automatiquement votre feuille de match
- Liste claire et professionnelle de vos joueurs
- Parfait pour l'impression ou le partage

Pourquoi choisir MaCompo ?

✅ Interface moderne et intuitive
✅ Utilisation 100% gratuite
✅ Pas besoin de connexion internet
✅ Design adapté aux smartphones et tablettes
✅ Sauvegarde locale de toutes vos données

Idéal pour :
- Entraîneurs de football amateur et professionnel
- Éducateurs sportifs
- Joueurs souhaitant analyser des tactiques
- Clubs de football
- Écoles de football

Téléchargez MaCompo maintenant et créez vos tactiques gagnantes !
```

**Coordonnées :**
- **Adresse e-mail** : macompo.app@gmail.com
- **Site web** : https://github.com/TechFlow-soluces/MaCompo (ou laissez vide)
- **Numéro de téléphone** : (Optionnel)

**Catégorie :**
- **Application** : Sports
- **Tags** : football, tactique, coach, formation

**Assets graphiques :**
- **Icône de l'application** : Déjà générée (sera uploadée automatiquement avec le AAB)
- **Feature Graphic** : 1024 x 500 px (optionnel pour test interne)
- **Captures d'écran smartphone** : PAS OBLIGATOIRE pour test interne
  - Minimum 2 si vous voulez les ajouter
  - Vous pourrez les ajouter plus tard avant la publication publique

---

## Étape 6 : Créer une version de test interne

### 6.1 Créer la piste de test

1. Menu latéral : **Versions** > **Piste de test interne**
2. Cliquez sur "Créer une version"
3. **Sélectionner le fichier AAB** :
   - Cliquez "Importer" ou glissez-déposez votre `app-release.aab`
   - Attendez que l'upload se termine
4. **Nom de la version** : 1.0.0 (1)
5. **Notes de version** (optionnel pour test interne) :
```
Version initiale de MaCompo
- Création de tactiques de football
- Gestion des joueurs
- Génération de convocations
```
6. Cliquez "Enregistrer"
7. Cliquez "Examiner la version"
8. Vérifiez qu'il n'y a pas d'erreurs
9. Cliquez "Démarrer le déploiement sur la piste de test interne"

### 6.2 Ajouter des testeurs

1. Toujours dans **Piste de test interne**
2. Onglet "Testeurs"
3. Cliquez "Créer une liste de testeurs"
4. **Nom** : Amis
5. Ajoutez les adresses Gmail de vos 1-2 amis
6. Enregistrer
7. Copiez le **lien de participation** qui apparaît

### 6.3 Inviter vos testeurs

Envoyez à vos amis :
1. Le **lien de participation**
2. Instructions :
   - Cliquer sur le lien
   - Accepter l'invitation
   - Télécharger l'app depuis Google Play
   - Tester et vous faire des retours

**⚠️ Temps de disponibilité** : La version de test peut prendre quelques heures (max 24h) avant d'être disponible au téléchargement.

---

## Étape 7 : Après les tests

Une fois les tests OK avec vos amis :

1. **Créer des screenshots** (voir `store-assets/screenshots-guide.md`)
2. **Passer en production** :
   - Menu **Versions** > **Piste de production**
   - Promouvoir la version depuis test interne
   - Ajouter les screenshots
   - Soumettre pour examen

**Temps d'examen Google** : 1 à 7 jours généralement

---

## Checklist finale avant soumission

### Configuration de l'application
- [ ] Privacy Policy activée sur GitHub Pages
- [ ] Email de contact créé (macompo.app@gmail.com)
- [ ] Keystore créé et sauvegardé
- [ ] Build AAB signé et généré

### Google Play Console
- [ ] Application créée
- [ ] Politique de confidentialité renseignée
- [ ] Classification du contenu complétée
- [ ] Sécurité des données remplie
- [ ] Fiche de la boutique complétée (description, etc.)
- [ ] AAB uploadé sur piste de test interne
- [ ] Testeurs ajoutés
- [ ] Lien de participation copié

### Test interne
- [ ] Version déployée sur test interne
- [ ] Amis invités avec le lien
- [ ] Tests réalisés et OK
- [ ] Bugs corrigés si nécessaire

---

## Aide et résolution de problèmes

### Erreur "App not signed"
Vous avez oublié de signer l'AAB. Refaites l'étape 4.

### Erreur "Invalid keystore"
Le keystore n'est pas au bon format ou le mot de passe est incorrect.

### L'app n'apparaît pas pour les testeurs
Vérifiez :
1. Que vous avez bien déployé la version
2. Que les testeurs ont cliqué sur le lien d'invitation
3. Qu'ils utilisent le bon compte Google (celui invité)
4. Attendez quelques heures

### Modification de la version de test
Vous pouvez créer une nouvelle version de test à tout moment :
1. Corrigez votre code
2. Rebuild le AAB
3. Uploadez la nouvelle version (avec un versionCode supérieur)

---

## Support

Pour toute question :
- Documentation officielle : https://support.google.com/googleplay/android-developer
- Forum : https://support.google.com/googleplay/android-developer/community

Bon courage pour la publication ! 🚀
