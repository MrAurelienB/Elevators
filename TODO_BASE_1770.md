
# UI

- [x] ajouter un bouton stop/start
- [x] ajouter un bouton reset
- [ ] rendre les boutons pause/start et reset fonctionnels
   - la gestion du start/stop reset doit être dans la même classe de BASE qui gère les update

# Modèle

- Idées pour améliorer le modele:
   - [ ] un passager qui appelle un ascenseur doit directement renseigner l'étage qu'il veut atteindre
   - [ ] un passager qui monte dans un ascenseur ne sait pas si l'ascenseur va dans sa direction
   - [ ] un ascenseur n'a pas le droit de s'arrêter en cours de route

# Organique

## Refactoring

- [ ] Les fonctions EventHandler::onUpdate* sont générales pour le FONCTIONNEMENT des elevators. Elles devraient être dans une classe de BASE, plutôt que dans le EventHandler.

## API

- La classe EventHandler doit servir d'API pour le modele de gestion des ascenseurs:
   - [ ] passenger called elevator (from floor)
   - [ ] passenger board elevator (floor, passenger)
   - [ ] passenger alight elevator (floor, passenger)
