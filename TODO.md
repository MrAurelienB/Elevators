
# UI

- [ ] Bouton START/PAUSE
   - [x] ajouter le bouton
   - [x] rendre le bouton fonctionnel
   - [x] la gestion du bouton doit être dans la classe ENGINE (pas parameterHandler + EventHandler)
- [ ] Bouton RESET
   - [x] ajouter le bouton
   - [ ] rendre le bouton fonctionnel
   - [ ] la gestion du bouton doit être dans la classe ENGINE (pas parameterHandler + EventHandler)

# Modèle

- Idées pour améliorer le modele:
   - [ ] un passager qui appelle un ascenseur doit directement renseigner l'étage qu'il veut atteindre
   - [ ] un passager qui monte dans un ascenseur ne sait pas si l'ascenseur va dans sa direction
   - [ ] un ascenseur n'a pas le droit de s'arrêter en cours de route

# Organique

## Refactoring

- [ ] Classe ENGINE (les fonctions EventHandler::onUpdate* sont générales pour le FONCTIONNEMENT des elevators. Elles devraient être dans une classe de BASE, plutôt que dans le EventHandler)
   - [x] Créer la classe
   - [x] Déplacer le code du EventHandler dans cette nouvelle classe
   - [ ] Refactoring du EventHandler

## API

- La classe EventHandler doit servir d'API pour le modele de gestion des ascenseurs:
   - [ ] passenger called elevator (from floor)
   - [ ] passenger board elevator (floor, passenger)
   - [ ] passenger alight elevator (floor, passenger)
