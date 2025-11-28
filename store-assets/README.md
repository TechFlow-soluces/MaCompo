# Documentation de Publication - MaCompo

Ce dossier contient tous les documents nécessaires pour publier MaCompo sur Google Play Store et Apple App Store.

## 📁 Fichiers disponibles

### 1. `description-fr.md`
Description marketing complète en français pour les stores :
- Titre et sous-titre optimisés
- Description courte (80 caractères)
- Description longue avec fonctionnalités
- Catégories et tags
- Notes de version

### 2. `privacy-policy.md`
Politique de confidentialité complète et conforme RGPD :
- Données collectées (locales uniquement)
- Utilisation d'AdMob
- Droits des utilisateurs
- Contact et mentions légales

**⚠️ ACTION REQUISE** : Héberger ce fichier en ligne et obtenir une URL publique (voir checklist)

### 3. `screenshots-guide.md`
Guide détaillé pour créer les screenshots :
- Spécifications techniques par plateforme
- Liste des screenshots recommandés
- Conseils de capture
- Instructions pour le Feature Graphic

### 4. `store-listing-checklist.md`
Checklist complète de publication :
- ✅ Éléments déjà préparés
- ⬜ Actions à réaliser
- Instructions par plateforme (Android/iOS)
- Prochaines étapes prioritaires

### 5. `aso-keywords.md`
Stratégie complète d'App Store Optimization :
- Mots-clés principaux et longue traîne
- Configuration par plateforme
- Analyse de la concurrence
- Plan d'action ASO
- Recommandations de localisation

### 6. Ce fichier (`README.md`)
Index et vue d'ensemble de la documentation

---

## 🚀 Prochaines étapes

### Actions immédiates (sans matériel)

1. **Héberger la Privacy Policy**
   - Option recommandée : GitHub Pages (gratuit)
   - Alternative : Google Sites, Notion
   - Récupérer l'URL pour les stores

2. **Créer un email de contact**
   - Format : contact@macompo.app ou macompo.app@gmail.com
   - Requis pour Google Play et App Store

3. **Créer le Feature Graphic**
   - Utiliser Canva (gratuit)
   - Dimensions : 1024 x 500 px
   - Voir screenshots-guide.md pour les specs

### Actions avec tablette Android

4. **Capturer les screenshots**
   - Lancer l'app sur la tablette
   - Créer des données de démo
   - Capturer 4-5 écrans (voir screenshots-guide.md)

5. **Tester l'application**
   - Vérifier toutes les fonctionnalités
   - Tester les publicités AdMob
   - Corriger les bugs éventuels

6. **Générer le build de production**
   ```bash
   npm run build
   npx cap sync android
   cd android
   ./gradlew bundleRelease
   ```

### Actions avec Mac (iOS)

7. **Configuration Apple Developer**
   - S'inscrire au programme (99$/an)
   - Créer les certificats
   - Configurer App Store Connect

8. **Capturer screenshots iOS**
   - Simulateur iPhone 14 Pro Max
   - Format 1290 x 2796 px

9. **Build et soumission iOS**
   - Archive dans Xcode
   - TestFlight pour les tests
   - Soumission finale

---

## 📊 État actuel du projet

### ✅ Complété
- [x] Configuration Capacitor iOS
- [x] Génération des icônes iOS
- [x] Configuration AdMob iOS (Info.plist)
- [x] Description marketing FR
- [x] Politique de confidentialité
- [x] Stratégie ASO
- [x] Checklist de publication
- [x] Guide screenshots

### ⏳ En attente
- [ ] URL de Privacy Policy
- [ ] Email de contact
- [ ] Screenshots (Android + iOS)
- [ ] Feature Graphic
- [ ] Validation compte Google Play Console
- [ ] Build de production signé (Android)
- [ ] Configuration Apple Developer (iOS)

---

## 🎯 Documents à lire en priorité

1. **Démarrage rapide** : `store-listing-checklist.md` - Pour savoir quoi faire maintenant
2. **Description à copier** : `description-fr.md` - Pour remplir les stores
3. **Privacy Policy** : `privacy-policy.md` - À héberger en ligne
4. **Optimisation** : `aso-keywords.md` - Pour maximiser les téléchargements

---

## 💡 Conseils

### Pour Google Play Store
- Répondre au questionnaire de sécurité des données
- Déclarer l'utilisation d'AdMob
- Préciser que les données sont stockées localement
- Tester le build sur plusieurs appareils Android

### Pour App Store
- Compte Apple Developer requis (99$/an)
- Temps de review plus long (2-3 jours)
- Critères de qualité plus stricts
- TestFlight recommandé avant publication

### Général
- Ne pas oublier les icônes de notification AdMob
- Tester les pubs en mode production
- Préparer des réponses types pour les avis
- Planifier des mises à jour régulières

---

## 📞 Ressources utiles

### Documentation officielle
- [Google Play Console](https://play.google.com/console)
- [App Store Connect](https://appstoreconnect.apple.com)
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [AdMob Documentation](https://admob.google.com/home/)

### Outils
- [Canva](https://canva.com) - Création de visuels
- [GitHub Pages](https://pages.github.com) - Hébergement gratuit
- [Google Trends](https://trends.google.com) - Recherche de mots-clés

---

## 📝 Notes importantes

### Privacy Policy
L'URL de la Privacy Policy est **OBLIGATOIRE** pour publier sur les deux stores. Sans cette URL, votre soumission sera rejetée.

### Email de contact
Un email de support est requis. Créez un email dédié pour séparer le support app de votre email personnel.

### Screenshots
Les screenshots sont cruciaux pour le taux de conversion. Investissez du temps pour créer des captures attractives avec des annotations claires.

### ASO
L'optimisation continue est clé. Analysez les données des stores après le lancement et ajustez vos mots-clés et descriptions.

---

**Date de création** : 28 novembre 2025
**Dernière mise à jour** : 28 novembre 2025
**Version de l'app** : 1.0.0
