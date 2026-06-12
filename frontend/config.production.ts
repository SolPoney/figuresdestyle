/**
 * Configuration pour déploiement production avec revenus passifs
 *
 * Ce fichier configure les services externes nécessaires pour automatiser
 * la génération de revenus sans intervention manuelle
 */

export const config = {
  // 1. Stripe - Paiements récurrents automatiques
  stripe: {
    publicKey: process.env['STRIPE_PUBLIC_KEY'] || 'pk_live_VOTRE_CLE',
    secretKey: process.env['STRIPE_SECRET_KEY'] || 'sk_live_VOTRE_CLE',
    webhookSecret: process.env['STRIPE_WEBHOOK_SECRET'],

    // Prix récurrents (à créer dans Stripe Dashboard)
    prices: {
      premiumMonthly: 'price_premium_monthly', // 6,99€/mois
      premiumYearly: 'price_premium_yearly', // 59,99€/an
      schoolMonthly: 'price_school_monthly', // 24,99€/mois
      schoolYearly: 'price_school_yearly', // 199€/an
    },

    // URL de succès après paiement
    successUrl: 'https://figures-de-style.fr/payment-success',
    cancelUrl: 'https://figures-de-style.fr/pricing',
  },

  // 2. Email marketing automatisé - Brevo (ex-Sendinblue)
  email: {
    apiKey: process.env['BREVO_API_KEY'],
    from: 'contact@figures-de-style.fr',

    // IDs des templates d'emails (à créer dans Brevo)
    templates: {
      welcome: 1, // Email de bienvenue
      trialReminder: 2, // Rappel modules gratuits (J+3)
      promoOffer: 3, // Offre Premium -20% (J+7)
      testimonials: 4, // Témoignages (J+14)
      lastChance: 5, // Dernière chance -10% (J+21)
      reactivation: 6, // Réactivation inactifs (30 jours)
      subscriptionConfirm: 7, // Confirmation abonnement
      paymentFailed: 8, // Échec paiement
      subscriptionExpiring: 9, // Abonnement expire bientôt
    },

    // Listes de contacts automatiques
    lists: {
      freeUsers: 'list_free_users',
      premiumUsers: 'list_premium_users',
      schoolUsers: 'list_school_users',
      inactiveUsers: 'list_inactive_users',
    },
  },

  // 3. Analytics et tracking
  analytics: {
    googleAnalyticsId: 'G-XXXXXXXXXX',
    facebookPixelId: 'XXXXXXXXXX',

    // Événements à tracker automatiquement
    events: {
      signup: 'user_signup',
      upgrade: 'upgrade_to_premium',
      moduleComplete: 'module_completed',
      abandonCart: 'cart_abandoned',
    },
  },

  // 4. Monitoring automatique
  monitoring: {
    // UptimeRobot - Vérification que le site est up
    uptimeUrl: 'https://api.uptimerobot.com/v2/',
    uptimeApiKey: process.env['UPTIME_ROBOT_KEY'],

    // Sentry - Tracking des erreurs
    sentryDsn: process.env['SENTRY_DSN'],

    // Alertes Slack/Discord
    webhookUrl: process.env['DISCORD_WEBHOOK_URL'],

    // Seuils d'alerte automatique
    alerts: {
      errorRate: 0.05, // Alerte si > 5% d'erreurs
      revenueDropPercent: 0.1, // Alerte si revenus baissent > 10%
      churnRatePercent: 0.05, // Alerte si désabonnements > 5%
    },
  },

  // 5. Base de données production
  database: {
    url:
      process.env['DATABASE_URL'] ||
      'postgresql://user:password@host:5432/figures_db',

    // Backups automatiques quotidiens
    backupEnabled: true,
    backupTime: '03:00', // 3h du matin
    backupRetentionDays: 30,
  },

  // 6. Codes promo saisonniers automatiques
  promotions: {
    // Dates et codes créés automatiquement
    seasonal: [
      {
        code: 'RENTREE2025',
        discount: 30,
        startDate: '2025-08-15',
        endDate: '2025-09-30',
        autoApply: true,
      },
      {
        code: 'BLACKFRIDAY2025',
        discount: 40,
        startDate: '2025-11-25',
        endDate: '2025-11-30',
        autoApply: false,
      },
      {
        code: 'NOEL2025',
        discount: 25,
        startDate: '2025-12-15',
        endDate: '2025-12-31',
        autoApply: true,
      },
      {
        code: 'BAC2025',
        discount: 20,
        startDate: '2025-05-01',
        endDate: '2025-06-30',
        autoApply: true,
      },
    ],
  },

  // 7. Programme d'affiliation
  affiliation: {
    enabled: true,
    commissionPercent: 20, // 20% de commission
    minimumPayout: 50, // Paiement à partir de 50€
    payoutSchedule: 'monthly', // Paiement mensuel automatique
    cookieDuration: 30, // Cookie de tracking 30 jours
  },

  // 8. Chatbot support automatique
  chatbot: {
    provider: 'crisp', // ou 'tawk.to' (gratuit)
    websiteId: process.env['CRISP_WEBSITE_ID'],

    // Réponses automatiques aux questions fréquentes
    autoResponses: true,
    businessHours: {
      enabled: true,
      timezone: 'Europe/Paris',
      hours: {
        monday: { start: '09:00', end: '18:00' },
        tuesday: { start: '09:00', end: '18:00' },
        wednesday: { start: '09:00', end: '18:00' },
        thursday: { start: '09:00', end: '18:00' },
        friday: { start: '09:00', end: '18:00' },
        saturday: { closed: true },
        sunday: { closed: true },
      },
    },
  },

  // 9. Rate limiting anti-abus
  rateLimit: {
    freeAccountCreations: {
      max: 3,
      windowMs: 3600000, // 1 heure
    },
    freeExerciseAttempts: {
      max: 20,
      windowMs: 86400000, // 24 heures
    },
    contactForm: {
      max: 5,
      windowMs: 3600000, // 1 heure
    },
  },

  // 10. SEO automatique
  seo: {
    siteName: 'Figures de Style',
    siteUrl: 'https://figures-de-style.fr',
    defaultTitle: 'Apprendre les figures de style - Exercices interactifs',
    defaultDescription:
      'Maîtrisez les 33 figures de style françaises avec +500 exemples. Idéal lycée, bac français, concours.',

    // Sitemap automatique
    sitemapEnabled: true,
    sitemapPath: '/sitemap.xml',

    // Schema.org automatique
    structuredData: {
      type: 'EducationalOrganization',
      name: 'Figures de Style',
      url: 'https://figures-de-style.fr',
      logo: 'https://figures-de-style.fr/logo.png',
    },
  },

  // 11. Hébergement et CDN
  hosting: {
    provider: 'vercel', // ou 'netlify' (gratuit pour petits sites)
    cdnEnabled: true,

    // Régions de déploiement
    regions: ['fra1', 'cdg1'], // Paris

    // Cache automatique
    cacheControl: {
      static: 'public, max-age=31536000, immutable',
      api: 'private, no-cache',
    },
  },

  // 12. Notifications automatiques admin
  adminNotifications: {
    email: 'admin@figures-de-style.fr',

    // Rapport hebdomadaire automatique
    weeklyReport: {
      enabled: true,
      day: 'monday',
      time: '09:00',
      metrics: [
        'newSignups',
        'newSubscriptions',
        'revenue',
        'churnRate',
        'activeUsers',
        'topModules',
      ],
    },

    // Alertes instantanées
    instantAlerts: {
      newSchoolSubscription: true, // Nouveau plan école
      paymentFailed: true, // Paiement échoué
      highErrorRate: true, // Taux d'erreur élevé
      serverDown: true, // Serveur inaccessible
    },
  },
};

// Export pour utilisation dans l'app
export default config;
