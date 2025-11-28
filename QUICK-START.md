# Quick Start - Publication MaCompo

## 🚀 Étapes rapides pour publier en test interne

### 1️⃣ Activer GitHub Pages (2 minutes)

1. Allez sur https://github.com/TechFlow-soluces/MaCompo/settings/pages
2. Source : **master** + Dossier : **/docs**
3. Save

✅ Privacy Policy sera à : https://techflow-soluces.github.io/MaCompo/privacy-policy.html

---

### 2️⃣ Créer le Keystore (5 minutes)

**Ouvrez Android Studio**, puis :

1. Ouvrez le projet Android : `File` > `Open` > Sélectionnez le dossier `android/`
2. Menu `Build` > `Generate Signed Bundle / APK`
3. Sélectionnez **Android App Bundle**
4. Cliquez `Create new...`
5. Remplissez :
   ```
   Key store path: C:\Users\j.bous\.gemini\antigravity\scratch\tactical-football-board\android\macompo-release-key.jks
   Password: [CHOISISSEZ UN MOT DE PASSE FORT]
   Alias: macompo-key-alias
   Key password: [MÊME MOT DE PASSE]
   Validity: 25 years

   First and Last Name: Jonathan Bous
   Organizational Unit: MaCompo
   Organization: MaCompo
   City: Paris
   Country: FR
   ```
6. ⚠️ **NOTEZ LE MOT DE PASSE dans `android/keystore-info.txt`**
7. ⚠️ **SAUVEGARDEZ le fichier .jks sur une clé USB**

---

### 3️⃣ Configurer gradle.properties (2 minutes)

**Créez** le fichier `android/gradle.properties` avec ce contenu :

```properties
MACOMPO_RELEASE_STORE_FILE=macompo-release-key.jks
MACOMPO_RELEASE_KEY_ALIAS=macompo-key-alias
MACOMPO_RELEASE_STORE_PASSWORD=VOTRE_MOT_DE_PASSE
MACOMPO_RELEASE_KEY_PASSWORD=VOTRE_MOT_DE_PASSE

org.gradle.jvmargs=-Xmx2048m -Dfile.encoding=UTF-8
android.useAndroidX=true
android.enableJetifier=true
FLIPPER_VERSION=0.125.0
```

⚠️ **Remplacez VOTRE_MOT_DE_PASSE par votre vrai mot de passe du keystore**

---

### 4️⃣ Générer le AAB signé (3 minutes)

**Dans Android Studio** :

1. `Build` > `Generate Signed Bundle / APK`
2. Sélectionnez **Android App Bundle**
3. Choisissez votre keystore (macompo-release-key.jks)
4. Entrez les mots de passe
5. Build variant : **release**
6. Cliquez `Finish`

Le fichier sera dans : `android/app/release/app-release.aab`

**OU en ligne de commande** :
```bash
cd android
./gradlew bundleRelease
```
Fichier dans : `android/app/build/outputs/bundle/release/app-release.aab`

---

### 5️⃣ Créer l'app sur Google Play Console (15 minutes)

#### A. Créer l'application

1. https://play.google.com/console
2. `Créer une application`
3. Nom : **MaCompo**
4. Langue : Français (France)
5. Type : Application
6. Gratuite

#### B. Configuration minimale

**Confidentialité** :
- URL Privacy Policy : `https://techflow-soluces.github.io/MaCompo/privacy-policy.html`

**Annonces** :
- Contient des annonces : **Oui**

**Classification** :
- Email : `macompo.app@gmail.com` (créez-le si pas fait)
- Catégorie : Utilitaires
- Toutes les questions : **Non**
- Devrait être PEGI 3

**Public cible** :
- Âge : 13 ans et plus
- Pour enfants : Non

**Sécurité des données** :
- Collecte de données : Oui (AdMob)
- Données collectées : Identifiant publicitaire uniquement
- Objectif : Publicité
- Partage : Oui, avec Google AdMob

#### C. Fiche de la boutique

**Description courte** :
```
Créez vos tactiques de football facilement - Tableau tactique interactif
```

**Description complète** : (Copiez depuis `store-assets/description-fr.md`)

**Catégorie** : Sports

**Email** : macompo.app@gmail.com

---

### 6️⃣ Test interne (5 minutes)

1. Menu : `Versions` > `Piste de test interne`
2. `Créer une version`
3. **Importer** votre fichier `app-release.aab`
4. Notes de version : "Version initiale"
5. `Enregistrer` > `Examiner` > `Démarrer le déploiement`

**Ajouter des testeurs** :
1. Onglet `Testeurs`
2. `Créer une liste` : "Amis"
3. Ajoutez les emails Gmail de vos amis
4. Copiez le **lien de participation**

**Envoyez à vos amis** :
- Le lien de participation
- Ils cliquent, acceptent, et téléchargent l'app depuis Google Play

---

## ✅ Checklist

- [ ] GitHub Pages activé
- [ ] Privacy Policy accessible
- [ ] Keystore créé et sauvegardé
- [ ] gradle.properties configuré
- [ ] AAB signé généré
- [ ] App créée sur Play Console
- [ ] Configuration complétée
- [ ] Fiche de la boutique remplie
- [ ] Version de test uploadée
- [ ] Testeurs ajoutés
- [ ] Lien de test envoyé

---

## 📞 Besoin d'aide ?

Consultez `PUBLICATION-GUIDE.md` pour le guide complet détaillé.

---

## 🎯 Après les tests

Quand vos amis valident l'app :

1. Créer les screenshots (voir `store-assets/screenshots-guide.md`)
2. Passer en production depuis Play Console
3. Attendre la validation Google (1-7 jours)

Bon courage ! 🚀
