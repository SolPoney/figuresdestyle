# Sécurité du projet Figures de style

## ⚠️ AVERTISSEMENT SÉCURITÉ

- **Ne partagez jamais vos fichiers `.env` ou toute clé/API sensible.**
- **Ne commitez jamais de secrets, mots de passe, ou tokens dans le dépôt.**
- Les exemples de configuration sont dans `.env.example`.
- Toute fuite de clé ou de mot de passe doit être immédiatement signalée et la clé révoquée.

## Bonnes pratiques

- Changez systématiquement les valeurs par défaut des secrets.
- Utilisez un gestionnaire de secrets (Vault, Doppler, 1Password, etc.) en production.
- Limitez la durée de vie des tokens JWT (`JWT_EXPIRES_IN`) et augmentez le nombre de rounds bcrypt (`BCRYPT_SALT_ROUNDS`) si possible.
- Ne jamais exposer la structure exacte de la sécurité (ex : rounds bcrypt, durée JWT) dans la documentation publique.

## Contacts

Pour toute question ou incident de sécurité, contactez l’administrateur du dépôt.
