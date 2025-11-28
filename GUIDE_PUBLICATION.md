# Guide de Publication - MaCompo sur Google Play Store

## 📋 Statut actuel
- ✅ Application développée et fonctionnelle
- ✅ Mode localStorage (pas besoin de backend)
- ✅ AdMob intégré (en mode test)
- ⏳ Compte Google Play Console en attente de validation
- ❌ APK de production non généré
- ❌ Assets de publication non préparés

---

## 🎯 Étapes avant publication

### 1. Attendre la validation du compte Google Play Console
- **Coût** : 25$ (déjà payé)
- **Délai** : 1 à 3 jours ouvrables généralement
- **Email de confirmation** : Tu recevras un email de Google quand c'est validé

---

## 🔧 Préparation technique (à faire maintenant)

### 2. Configurer AdMob avec tes vrais IDs

Une fois ton compte AdMob validé et ton app créée dans AdMob :

#### a) Créer l'application dans AdMob
1. Va sur https://admob.google.com
2. Clique sur "Applications" → "Ajouter une application"
3. Choisis "Android"
4. Entre le nom : **MaCompo**
5. Note l'**ID d'application AdMob** (format : `ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY`)

#### b) Créer une unité publicitaire (bannière)
1. Dans ton app AdMob, va dans "Unités publicitaires"
2. Clique "Ajouter une unité publicitaire"
3. Choisis "Bannière"
4. Nom : "Bannière Dashboard"
5. Note l'**ID de l'unité publicitaire** (format : `ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY`)

#### c) Remplacer les IDs de test dans le code

**Fichier 1** : `android/app/src/main/AndroidManifest.xml`
```xml
<!-- Ligne 33 : Remplacer -->
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="TON_VRAI_ID_APPLICATION_ADMOB"/>
```

**Fichier 2** : `src/components/AdBanner.tsx`
```typescript
// Ligne 24 : Remplacer
const options: BannerAdOptions = {
    adId: 'TON_VRAI_ID_UNITE_PUBLICITAIRE', // Remplacer ici
    adSize: BannerAdSize.BANNER,
    position: BannerAdPosition.BOTTOM_CENTER,
    margin: 0,
    isTesting: false, // Mettre à false pour la production
};
```

---

### 3. Mettre à jour les informations de l'app

#### a) Fichier `capacitor.config.ts`
Vérifier que les infos sont correctes :
```typescript
{
  appId: 'com.macompo.app', // Modifier si besoin
  appName: 'MaCompo',
  // ...
}
```

#### b) Fichier `android/app/build.gradle`
Vérifier/modifier :
```gradle
android {
    namespace "com.macompo.app" // Doit correspondre à appId
    defaultConfig {
        applicationId "com.macompo.app"
        versionCode 1 // Incrémenter à chaque nouvelle version
        versionName "1.0.0" // Version visible par les utilisateurs
    }
}
```

---

### 4. Générer la clé de signature (Keystore)

**Dans Android Studio** :

1. Ouvre le projet : `npx cap open android`
2. Va dans **Build → Generate Signed Bundle / APK**
3. Choisis **APK**
4. Clique sur **Create new...** (pour créer un nouveau keystore)
5. Remplis les informations :

```
Key store path: android/macompo-release-key.keystore
Password: [CHOISIS UN MOT DE PASSE FORT - NOTE-LE BIEN !]
Confirm: [MÊME MOT DE PASSE]

Key:
Alias: macompo
Password: [MÊME MOT DE PASSE OU UN AUTRE]
Validity (years): 25

Certificate:
First and Last Name: [Ton nom ou nom de l'app]
Organizational Unit: [Optionnel]
Organization: [Ton entreprise ou nom]
City or Locality: [Ta ville]
State or Province: [Ton état/région]
Country Code (XX): FR
```

6. Clique sur **OK**

⚠️ **IMPORTANT** :
- Sauvegarde le fichier `.keystore` en lieu sûr (Dropbox, USB, etc.)
- Note les mots de passe dans un gestionnaire de mots de passe
- **Si tu perds ce fichier, tu ne pourras JAMAIS mettre à jour ton app !**

---

### 5. Générer l'APK de production

#### Option A : Via Android Studio (recommandé)

1. **Build → Generate Signed Bundle / APK**
2. Choisis **APK**
3. Sélectionne ton keystore créé précédemment
4. Entre les mots de passe
5. Choisis **release** (pas debug)
6. Clique sur **Finish**

L'APK sera généré dans : `android/app/release/app-release.apk`

#### Option B : Via ligne de commande

```bash
cd android
./gradlew assembleRelease
```

L'APK sera dans : `android/app/build/outputs/apk/release/app-release.apk`

---

## 📱 Assets à préparer pour Google Play

### 6. Captures d'écran

**Requis** : Au moins 2 captures d'écran pour smartphone

**Tailles recommandées** :
- 1080 x 1920 px (ou ratio 16:9)
- Format : PNG ou JPEG

**Écrans à capturer** :
1. ✅ Landing Page (avec logo "MaCompo")
2. ✅ WelcomeModal (formulaire de nom)
3. ✅ Dashboard (page "Mes tactiques")
4. ✅ Board (création de compo avec joueurs)
5. ✅ Modal de création de tactique

**Comment faire** :
- Dans l'émulateur Android Studio : icône caméra sur le côté
- Ou utilise un vrai téléphone Android

### 7. Icône de l'application

**Déjà présente** : `public/logo.png` (512x512)

Vérifier que c'est bien configuré dans :
- `android/app/src/main/res/mipmap-*/ic_launcher.png`

### 8. Bannière de fonctionnalité (Feature Graphic)

**Requis par Google Play**

**Taille** : 1024 x 500 px

**Contenu suggéré** :
- Logo MaCompo
- Texte : "Créez vos compositions tactiques"
- Couleur de fond : Vert (#2ecc71) avec dégradé sombre

Tu peux créer ça sur **Canva** ou **Figma** gratuitement.

---

## 📝 Informations textuelles à préparer

### 9. Description de l'app

#### Titre (max 50 caractères)
```
MaCompo - Tableau Tactique Football
```

#### Description courte (max 80 caractères)
```
Créez et organisez vos compositions tactiques de football facilement
```

#### Description complète (max 4000 caractères)
```
🏆 MaCompo - L'outil ultime pour vos compositions de football

Créez, organisez et sauvegardez vos tactiques de football en quelques secondes !

⚽ FONCTIONNALITÉS :

📋 Gestion de tactiques
• Créez plusieurs tactiques différentes
• Nommez et décrivez chaque tactique
• Visualisez toutes vos compositions en un coup d'œil

🎨 Tableau tactique interactif
• Ajoutez des joueurs sur le terrain
• Déplacez-les facilement par glisser-déposer
• Personnalisez leur couleur
• Modifiez nom et numéro

💾 Sauvegarde locale
• Toutes vos données restent sur votre appareil
• Pas besoin de connexion Internet
• Vos tactiques sont privées et sécurisées

🎯 Interface intuitive
• Design moderne et épuré
• Navigation simple et rapide
• Optimisé pour mobile

Parfait pour :
✓ Entraîneurs de football
✓ Joueurs
✓ Amateurs de tactique
✓ Préparation de matchs
✓ Analyse tactique

Téléchargez MaCompo et transformez vos idées tactiques en réalité ! ⚽
```

### 10. Catégorie et tags

**Catégorie** : Sports

**Tags suggérés** :
- Football
- Tactique
- Entraînement
- Composition
- Sport
- Terrain
- Coach

---

## 🚀 Publication sur Google Play Console

### 11. Créer l'application dans Google Play Console

Une fois ton compte validé :

1. Va sur https://play.google.com/console
2. Clique sur **Créer une application**
3. Remplis :
   - Nom : **MaCompo**
   - Langue par défaut : Français
   - Type : Application
   - Gratuite ou payante : **Gratuite**
4. Accepte les conditions
5. Clique sur **Créer l'application**

### 12. Remplir les sections obligatoires

Dans le tableau de bord, remplis toutes les sections marquées comme obligatoires :

#### a) Fiche du Play Store
- Titre, description courte/longue (préparé ci-dessus)
- Icône de l'application (512x512)
- Bannière de fonctionnalité (1024x500)
- Captures d'écran (minimum 2)

#### b) Contenu de l'application
- Catégorie : Sports
- Adresse e-mail de contact
- Politique de confidentialité (optionnelle pour app sans données personnelles)

#### c) Classification du contenu
- Répondre au questionnaire (app tout public, pas de contenu sensible)

#### d) Public cible et contenu
- Public cible : Tout le monde / 3 ans et plus
- Pas de publicités destinées aux enfants

#### e) Actualités
- Gérer les actualités de l'app (optionnel)

### 13. Upload de l'APK

1. Va dans **Production** (ou **Test interne** pour tester d'abord)
2. Clique sur **Créer une version**
3. **Upload** ton APK (`app-release.apk`)
4. Remplis les notes de version :
   ```
   Version 1.0.0
   • Première version de MaCompo
   • Création et gestion de tactiques
   • Tableau tactique interactif
   • Sauvegarde locale
   ```
5. Clique sur **Enregistrer** puis **Examiner la version**
6. Vérifie que tout est bon
7. Clique sur **Lancer le déploiement en production**

---

## ⏱️ Délais de publication

- **Examen de l'app par Google** : 1 à 7 jours (généralement 2-3 jours)
- **Statut visible dans la console** : "En cours d'examen"
- **Email de confirmation** quand l'app est publiée

---

## 🔄 Mises à jour futures

Pour publier une mise à jour :

1. Modifie le code de l'app
2. Incrémente le `versionCode` et `versionName` dans `build.gradle`
3. Rebuild : `npm run build && npx cap sync android`
4. Génère un nouvel APK signé avec **le même keystore**
5. Upload dans Google Play Console → Nouvelle version

---

## 📞 Support et ressources

- **Documentation Capacitor** : https://capacitorjs.com/docs
- **Google Play Console** : https://play.google.com/console
- **AdMob** : https://admob.google.com
- **Support Google Play** : https://support.google.com/googleplay/android-developer

---

## ✅ Checklist finale avant publication

Avant de cliquer sur "Lancer le déploiement" :

- [ ] Compte Google Play Console validé
- [ ] AdMob configuré avec les vrais IDs
- [ ] Keystore créé et sauvegardé en sécurité
- [ ] APK de production généré et testé
- [ ] Captures d'écran prises (minimum 2)
- [ ] Icône de l'app préparée (512x512)
- [ ] Bannière de fonctionnalité créée (1024x500)
- [ ] Description et textes écrits
- [ ] Application créée dans Google Play Console
- [ ] Toutes les sections obligatoires remplies
- [ ] APK uploadé
- [ ] App testée sur émulateur ou vrai appareil
- [ ] Vérification finale : pas de bugs, tout fonctionne

---

## 🎉 Après publication

Une fois l'app publiée :

1. **Récupère tes vrais IDs AdMob** et mets à jour l'app (update)
2. **Surveille les avis** des utilisateurs
3. **Analyse les stats** dans Google Play Console
4. **Prépare des mises à jour** avec nouvelles fonctionnalités

---

**Bon courage pour la publication ! 🚀⚽**

N'hésite pas à reprendre contact quand ton compte est validé pour finaliser la publication ensemble.
