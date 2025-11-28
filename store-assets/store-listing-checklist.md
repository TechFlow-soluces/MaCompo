# Checklist de publication sur les Stores

## Google Play Store

### Informations de base
- [x] **Nom de l'application** : MaCompo
- [x] **Description courte** : Créez vos tactiques de football facilement - Tableau tactique interactif (80 caractères max)
- [x] **Description complète** : Voir description-fr.md
- [ ] **Icône de l'application** : 512 x 512 px, PNG (déjà générée dans android/app/src/main/res/)
- [ ] **Feature Graphic** : 1024 x 500 px, PNG (à créer selon screenshots-guide.md)

### Assets graphiques
- [ ] **Screenshots smartphone** : Minimum 2 (1080 x 1920 px)
  - [ ] Dashboard
  - [ ] Terrain tactique
  - [ ] Édition de joueur
  - [ ] Convocation
- [ ] **Screenshots tablette 7"** : Optionnel mais recommandé (1200 x 1920 px)
- [ ] **Screenshots tablette 10"** : Optionnel (1600 x 2560 px)
- [ ] **Vidéo de démo** : Optionnel (durée 30 sec - 2 min, format YouTube)

### Catégorisation
- [x] **Catégorie principale** : Sports
- [x] **Catégorie secondaire** : Productivité
- [x] **Tags** : Football, Tactique, Coach, Formation

### Informations légales
- [x] **Politique de confidentialité** : URL requise (héberger privacy-policy.md sur GitHub Pages ou site web)
- [ ] **Email de contact** : Obligatoire
- [ ] **Site web de l'application** : Optionnel mais recommandé
- [x] **Type de contenu** : PEGI 3 / Tout public
- [ ] **Questionnaire de sécurité des données** : À remplir dans la console

### Configuration technique
- [x] **Package name** : com.jonathanbous.macompo
- [x] **Version code** : 1
- [x] **Version name** : 1.0.0
- [x] **SDK minimum** : 22 (Android 5.1)
- [x] **SDK target** : 33+

### Fichier APK/AAB
- [ ] **Format** : Android App Bundle (.aab) recommandé ou APK
- [ ] **Signature** : Signé avec votre clé de publication
- [ ] **Tester** : Tester le build sur plusieurs appareils avant soumission

### Tarification et distribution
- [x] **Prix** : Gratuit
- [x] **Pays de distribution** : Tous les pays
- [x] **Publicités** : Oui (AdMob)
- [ ] **Achats intégrés** : Non

---

## App Store (iOS)

### Informations de base
- [x] **Nom** : MaCompo
- [x] **Sous-titre** : Tableau tactique football (30 caractères max)
- [x] **Mots-clés** : football,tactique,compo,formation,coach,terrain,équipe,sport (100 caractères max, séparés par virgules)
- [x] **Description** : Voir description-fr.md
- [ ] **Icône** : 1024 x 1024 px, PNG (déjà générée dans ios/App/App/Assets.xcassets/)

### Assets graphiques
- [ ] **Screenshots iPhone 6.7"** : Minimum 1 (1290 x 2796 px)
  - [ ] Dashboard
  - [ ] Terrain tactique
  - [ ] Édition de joueur
  - [ ] Convocation
- [ ] **Screenshots iPad Pro 12.9"** : Optionnel mais recommandé (2048 x 2732 px)
- [ ] **Aperçu de l'app** : Vidéo optionnelle (30 sec max)

### Catégorisation
- [x] **Catégorie principale** : Sports
- [x] **Catégorie secondaire** : Productivité
- [x] **Classification d'âge** : 4+

### Informations légales
- [x] **URL de la politique de confidentialité** : Obligatoire
- [ ] **URL d'assistance** : Recommandé
- [ ] **URL marketing** : Optionnel
- [ ] **Coordonnées** : Nom, Email, Téléphone

### Configuration technique
- [x] **Bundle ID** : com.jonathanbous.macompo
- [x] **Version** : 1.0.0
- [x] **Build number** : 1
- [x] **Compatibilité** : iOS 13.0+
- [ ] **Certificats et provisioning profiles** : Configurés dans Xcode

### Build et soumission
- [ ] **Archive Xcode** : Créer une archive depuis Xcode
- [ ] **Téléverser via Xcode** : Ou Transporter app
- [ ] **TestFlight** : Tester avant la publication officielle
- [ ] **Informations d'export** : Remplir le questionnaire de cryptographie (Oui pour HTTPS)

### Tarification et distribution
- [x] **Prix** : Gratuit
- [x] **Disponibilité** : Tous les pays
- [x] **Publicités** : Oui (AdMob)
- [ ] **Achats intégrés** : Non

---

## Actions prioritaires

### À faire maintenant (sans Mac/Android device)
1. **Héberger la Privacy Policy**
   - Créer un GitHub Pages ou utiliser un site gratuit
   - Obtenir une URL publique pour privacy-policy.md

2. **Préparer l'email de contact**
   - Créer ou utiliser un email professionnel dédié
   - Format recommandé : contact@macompo.app ou support@...

3. **Créer le Feature Graphic Google Play**
   - Utiliser Canva ou Figma
   - Dimensions : 1024 x 500 px
   - Voir screenshots-guide.md pour les recommandations

4. **Rédiger le contenu du questionnaire Google Play**
   - Politique de confidentialité ✓
   - Types de données collectées : Aucune (uniquement AdMob)
   - Partage avec des tiers : Oui (Google AdMob)

### À faire avec Android device/tablette
5. **Capturer les screenshots Android**
   - Lancer l'app sur la tablette
   - Créer des données de démo réalistes
   - Capturer 4-5 screenshots selon screenshots-guide.md

6. **Générer le build de production Android**
   ```bash
   npm run build
   npx cap sync android
   cd android
   ./gradlew bundleRelease  # ou assembleRelease pour APK
   ```

7. **Signer l'APK/AAB**
   - Créer un keystore si pas encore fait
   - Signer le build avec jarsigner

### À faire avec Mac (pour iOS)
8. **Capturer les screenshots iOS**
   - Utiliser le simulateur Xcode
   - Capturer pour iPhone 14 Pro Max minimum

9. **Configurer les certificats iOS**
   - Compte Apple Developer requis (99$/an)
   - Créer les certificats et provisioning profiles

10. **Build iOS**
    - Archive depuis Xcode
    - Téléverser vers App Store Connect
    - Tester via TestFlight

---

## Notes importantes

### URL de la Privacy Policy
La politique de confidentialité DOIT être accessible via une URL publique. Options :
1. **GitHub Pages** (gratuit) :
   - Créer un repo public
   - Activer GitHub Pages
   - URL : https://VOTRE-USERNAME.github.io/macompo/privacy-policy.html

2. **Notion** (gratuit) :
   - Créer une page publique
   - Partager le lien

3. **Google Sites** (gratuit)

### Email de contact
Requis pour les deux stores. Créer un email dédié comme :
- contact@macompo.app (si vous avez un domaine)
- macompo.app@gmail.com
- support.macompo@gmail.com

### Questionnaire de sécurité Google Play
Depuis 2022, Google exige un questionnaire détaillé sur :
- Les données collectées
- Comment elles sont utilisées
- Si elles sont partagées
- Les pratiques de sécurité

Pour MaCompo :
- Données collectées : Aucune par l'app (uniquement AdMob)
- Partage : Oui avec Google AdMob
- Stockage : Local uniquement
