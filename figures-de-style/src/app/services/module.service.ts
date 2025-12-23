import { Injectable } from '@angular/core';
import { Module, ExerciceModule, Question } from '../models/module.model';

interface ModuleScore {
  moduleId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  date: Date;
}

@Injectable({
  providedIn: 'root',
})
export class ModuleService {
  private readonly STORAGE_KEY = 'figures_de_style_scores';

  private modules: Module[] = [
    {
      id: '1',
      titre: 'Module 1',
      description: 'Substitution et représentation',
      isRecap: false,
      figures: [
        {
          nom: 'Métaphore',
          definition:
            'Figure qui établit un parallèle sans terme de comparaison explicite.',
          exemple:
            "Les ailes du temps nous emportent | La vie est un théâtre | Cet homme est un lion | L'or du soir tombe sur la ville",
        },
        {
          nom: 'Comparaison',
          definition:
            'Figure qui établit un parallèle avec un terme de comparaison (comme, tel, semblable à).',
          exemple:
            'Elle est fragile comme un oiseau | Blanc comme neige | Fort comme un bœuf | Doux comme un agneau',
        },
        {
          nom: 'Métonymie',
          definition:
            "Désignation d'une réalité par un terme désignant une autre réalité liée (cause/effet, contenant/contenu).",
          exemple:
            'Boire un verre | Lire du Molière | Toute la ville en parle | Gagner son pain',
        },
        {
          nom: 'Synecdoque',
          definition:
            "Désignation du tout par la partie, de l'espèce par le genre, ou inversement.",
          exemple:
            "Avoir un toit (maison) | Cent voiles (bateaux) | Manquer de bras (main d'œuvre) | Une lame (épée)",
        },
        {
          nom: 'Allégorie',
          definition:
            "Représentation concrète et développée d'une idée abstraite, personnifiée.",
          exemple:
            "La Faucheuse représente la Mort | La Justice est aveugle | Cupidon symbolise l'Amour | Le Temps est un vieillard avec une faux",
        },
        {
          nom: 'Personnification',
          definition:
            'Attribution de caractéristiques humaines à un objet, un animal ou un concept abstrait.',
          exemple:
            'Le vent hurle dans la nuit | Le soleil sourit aux enfants | La mer gronde de colère | Les arbres dansent sous la brise',
        },
        {
          nom: 'Animisme',
          definition:
            "Attribution d'une âme, de sentiments ou de vie à des objets inanimés.",
          exemple:
            'Cette maison a une âme | Les pierres ont une mémoire | Le violon pleure | La cloche soupire',
        },
        {
          nom: 'Périphrase',
          definition:
            "Expression de plusieurs mots pour désigner ce qu'un seul mot pourrait exprimer.",
          exemple:
            "L'astre du jour (soleil) | Le roi des animaux (lion) | La ville lumière (Paris) | Le septième art (cinéma)",
        },
      ],
    },
    {
      id: '2',
      titre: 'Module 2',
      description: 'Amplification et atténuation',
      isRecap: false,
      figures: [
        {
          nom: 'Hyperbole',
          definition:
            'Exagération volontaire pour mettre en relief une idée ou un sentiment.',
          exemple:
            "Je meurs de faim | Attendre une éternité | Je te l'ai dit mille fois | Pleurer toutes les larmes de son corps",
        },
        {
          nom: 'Euphémisme',
          definition:
            "Atténuation d'une idée déplaisante par une expression plus douce.",
          exemple:
            "Il nous a quittés (mort) | Non-voyant (aveugle) | Personne âgée (vieillard) | Demandeur d'emploi (chômeur)",
        },
        {
          nom: 'Litote',
          definition:
            'Dire moins pour suggérer davantage, souvent par la forme négative.',
          exemple:
            "Ce n'est pas mauvais (très bon) | Il n'est pas bête (intelligent) | Je ne te hais point (je t'aime) | Ce n'est pas faux",
        },
        {
          nom: 'Gradation',
          definition:
            "Succession de termes dans un ordre croissant ou décroissant d'intensité.",
          exemple:
            "Je me meurs, je suis mort, je suis enterré | Va, cours, vole et nous venge | C'est un roc, un pic, un cap",
        },
        {
          nom: 'Antiphrase',
          definition:
            "Expression ironique qui consiste à dire le contraire de ce que l'on pense.",
          exemple:
            "C'est du propre ! (sale) | Quel génie ! (imbécile) | Bravo, c'est réussi ! (échec) | Quelle belle journée ! (pluie)",
        },
      ],
    },
    {
      id: '3',
      titre: 'Module Révision 1-2',
      description: 'Révision des modules 1 et 2',
      isRecap: true,
      requiredModules: ['1', '2'],
      minPercentage: 70,
      figures: [], // Sera rempli dynamiquement
    },
    {
      id: '4',
      titre: 'Module 3',
      description: 'Construction et organisation de la phrase',
      isRecap: false,
      figures: [
        {
          nom: 'Anaphore',
          definition:
            "Répétition d'un mot ou groupe de mots en début de phrases ou vers successifs.",
          exemple:
            'Paris outragé ! Paris brisé ! Paris martyrisé ! | Toujours aimer, toujours souffrir, toujours mourir',
        },
        {
          nom: 'Épiphore',
          definition:
            "Répétition d'un mot ou groupe de mots en fin de phrases ou vers successifs.",
          exemple:
            'Il faut que je parte, il est temps que je parte | Où vas-tu ? Que fais-tu ? Qui es-tu ?',
        },
        {
          nom: 'Chiasme',
          definition:
            'Disposition en ordre inverse (AB-BA) de termes dans deux groupes de mots.',
          exemple:
            'Il faut manger pour vivre et non vivre pour manger | Tel est pris qui croyait prendre',
        },
        {
          nom: 'Parallélisme',
          definition:
            "Répétition d'une même structure syntaxique dans des phrases successives.",
          exemple:
            'Qui vole un œuf vole un bœuf | Tel père, tel fils | Œil pour œil, dent pour dent',
        },
        {
          nom: 'Asyndète',
          definition:
            'Absence de liaison entre mots/propositions, créant un effet de rapidité.',
          exemple:
            "Je suis venu, j'ai vu, j'ai vaincu | Métro, boulot, dodo | Va, cours, vole",
        },
        {
          nom: 'Polysyndète',
          definition:
            "Répétition de conjonctions pour créer un effet d'accumulation.",
          exemple:
            "Et la mer et l'amour ont l'amer pour partage | Ni le soleil ni la mort ne peuvent se regarder fixement",
        },
        {
          nom: 'Ellipse',
          definition:
            'Omission de mots grammaticalement nécessaires mais compréhensibles par le contexte.',
          exemple:
            "Rien de nouveau (il n'y a rien) | Défense de fumer | Sortie interdite | Prudence, enfants !",
        },
      ],
    },
    {
      id: '5',
      titre: 'Module 4',
      description: 'Sons et rythme',
      isRecap: false,
      figures: [
        {
          nom: 'Allitération',
          definition:
            'Répétition de consonnes identiques ou voisines dans une phrase ou un vers.',
          exemple:
            "Pour qui sont ces serpents qui sifflent sur vos têtes ? | Ton thé t'a-t-il ôté ta toux ? | Trois tristes tigres",
        },
        {
          nom: 'Assonance',
          definition:
            'Répétition de voyelles identiques ou voisines dans une phrase ou un vers.',
          exemple:
            "Les sanglots longs des violons de l'automne | Tout m'afflige et me nuit et conspire à me nuire",
        },
        {
          nom: 'Onomatopée',
          definition: 'Mot créé pour imiter un son naturel, un bruit, un cri.',
          exemple:
            "Boum ! Le tonnerre | Tic-tac fait l'horloge | Cocorico chante le coq | Plouf ! Il tombe à l'eau",
        },
      ],
    },
    {
      id: '6',
      titre: 'Module Révision 3-4',
      description: 'Révision des modules 3 et 4',
      isRecap: true,
      requiredModules: ['4', '5'],
      minPercentage: 70,
      figures: [],
    },
    {
      id: '7',
      titre: 'Module 5',
      description: 'Pensée et sens',
      isRecap: false,
      figures: [
        {
          nom: 'Oxymore',
          definition:
            'Alliance de deux mots de sens contradictoire dans une même expression.',
          exemple:
            'Un silence assourdissant | Une douce violence | Cette obscure clarté | Un illustre inconnu',
        },
        {
          nom: 'Paradoxe',
          definition:
            'Énoncé contraire à la logique commune, mais contenant une vérité profonde.',
          exemple:
            "Plus ça change, plus c'est pareil | Je ne suis jamais moins seul que seul | Il faut reculer pour mieux sauter",
        },
        {
          nom: 'Antithèse',
          definition:
            "Opposition marquée entre deux termes ou idées au sein d'une même phrase.",
          exemple:
            "Le jour et la nuit | L'ombre et la lumière | Le bien et le mal | Aimer ou haïr",
        },
        {
          nom: 'Ironie',
          definition:
            "Manière de se moquer en disant le contraire de ce que l'on pense.",
          exemple:
            'Quel beau temps ! (pluie) | Tu as fait du beau travail ! (désastre) | Quelle ponctualité ! (retard)',
        },
        {
          nom: 'Synesthésie',
          definition:
            'Association de sensations de registres sensoriels différents.',
          exemple:
            "Une voix douce et chaude | Un parfum vert | Des parfums frais comme des chairs d'enfants | Une couleur criarde",
        },
      ],
    },
    {
      id: '8',
      titre: 'Module 6',
      description: 'Figures rhétoriques avancées',
      isRecap: false,
      figures: [
        {
          nom: 'Hyperbate',
          definition:
            "Inversion de l'ordre habituel des mots pour créer un effet stylistique.",
          exemple:
            "De cet amour je meurs | De Paris je reviens | Dans la forêt profonde marchait l'enfant",
        },
        {
          nom: 'Hypallage',
          definition:
            'Attribution à un mot de ce qui convient logiquement à un autre mot de la phrase.',
          exemple:
            'Ce marchand accoudé sur son comptoir avide | Un vieillard en cheveux blancs | Cette obscure clarté',
        },
        {
          nom: 'Épanadiplose',
          definition:
            "Répétition du même mot au début et à la fin d'une phrase ou vers.",
          exemple:
            "Demain sera demain | La vie c'est la vie | L'amour, rien que l'amour | Partir c'est partir",
        },
        {
          nom: 'Zeugma',
          definition:
            "Utilisation d'un seul mot dans deux constructions ou sens différents.",
          exemple:
            'Il prit son chapeau et la porte | Vêtu de probité candide et de lin blanc | Prendre la mouche et la fuite',
        },
      ],
    },
    {
      id: '9',
      titre: 'Module Révision 5-6',
      description: 'Révision des modules 5 et 6',
      isRecap: true,
      requiredModules: ['7', '8'],
      minPercentage: 70,
      figures: [],
    },
    {
      id: 'final',
      titre: 'Module Révision Finale',
      description: 'Révision complète de toutes les figures de style',
      isRecap: true,
      requiredModules: ['1', '2', '4', '5', '7', '8'],
      minPercentage: 70,
      figures: [],
    },
  ];

  private questionPool: { [moduleId: string]: Question[] } = {
    '1': [
      {
        question: 'Le vent hurle dans la nuit',
        reponses: ['Métaphore', 'Personnification', 'Hyperbole', 'Comparaison'],
        correct: 1,
        explication: 'Le vent reçoit une caractéristique humaine (hurler)',
        indice: 'On attribue une action humaine à un élément naturel',
      },
      {
        question: 'Cette maison a une âme',
        reponses: ['Animisme', 'Personnification', 'Allégorie', 'Métaphore'],
        correct: 0,
        explication: 'On donne une âme à un objet inanimé',
        indice: "On donne vie à quelque chose d'inerte",
      },
      {
        question: "L'astre du jour brille",
        reponses: ['Métaphore', 'Périphrase', 'Synecdoque', 'Hyperbole'],
        correct: 1,
        explication: "L'astre du jour désigne le soleil",
        indice: 'Plusieurs mots pour dire soleil',
      },
      {
        question: 'Boire un verre au bar',
        reponses: ['Synecdoque', 'Métonymie', 'Métaphore', 'Périphrase'],
        correct: 1,
        explication: 'Le contenant désigne le contenu',
        indice: 'On boit ce qui est dans le verre',
      },
      {
        question: 'Cet homme est un lion',
        reponses: ['Métaphore', 'Comparaison', 'Personnification', 'Hyperbole'],
        correct: 0,
        explication: 'Comparaison implicite sans outil de comparaison',
        indice: "Pas de 'comme' dans la phrase",
      },
      {
        question: 'Fort comme un bœuf',
        reponses: ['Comparaison', 'Métaphore', 'Hyperbole', 'Litote'],
        correct: 0,
        explication: "Utilise 'comme' pour comparer",
        indice: 'Outil de comparaison présent',
      },
      {
        question: 'Avoir un toit sur la tête',
        reponses: ['Synecdoque', 'Métonymie', 'Métaphore', 'Périphrase'],
        correct: 0,
        explication: 'La partie (toit) désigne le tout (maison)',
        indice: 'Une partie représente la totalité',
      },
      {
        question: 'La Justice est aveugle',
        reponses: ['Allégorie', 'Personnification', 'Métaphore', 'Synecdoque'],
        correct: 0,
        explication: "Représentation concrète d'une idée abstraite (Justice)",
        indice: 'Concept abstrait représenté concrètement',
      },
      {
        question: 'Lire du Molière ce soir',
        reponses: ['Métonymie', 'Synecdoque', 'Périphrase', 'Métaphore'],
        correct: 0,
        explication: "L'auteur désigne son œuvre",
        indice: 'Le créateur pour sa création',
      },
      {
        question: 'Les arbres dansent sous la brise',
        reponses: ['Personnification', 'Métaphore', 'Animisme', 'Hyperbole'],
        correct: 0,
        explication: 'Action humaine attribuée aux arbres',
        indice: 'Danser est une action humaine',
      },
      {
        question: 'La ville lumière attire les touristes',
        reponses: ['Périphrase', 'Métaphore', 'Allégorie', 'Synecdoque'],
        correct: 0,
        explication: 'Expression de plusieurs mots pour Paris',
        indice: "Description en plusieurs mots d'une ville",
      },
      {
        question: 'Le roi des animaux règne',
        reponses: ['Périphrase', 'Métaphore', 'Allégorie', 'Synecdoque'],
        correct: 0,
        explication: 'Plusieurs mots pour désigner le lion',
        indice: 'Expression développée pour un animal',
      },
    ],
    '2': [
      {
        question: 'Je meurs de faim !',
        reponses: ['Hyperbole', 'Litote', 'Euphémisme', 'Métaphore'],
        correct: 0,
        explication: 'Exagération de la faim',
        indice: 'Exagération volontaire',
      },
      {
        question: 'Il nous a quittés hier',
        reponses: ['Euphémisme', 'Litote', 'Hyperbole', 'Antiphrase'],
        correct: 0,
        explication: "Atténuation pour dire qu'il est mort",
        indice: 'Manière douce de dire quelque chose de triste',
      },
      {
        question: "Ce n'est pas mauvais",
        reponses: ['Litote', 'Euphémisme', 'Hyperbole', 'Antiphrase'],
        correct: 0,
        explication: "Dire moins pour suggérer que c'est très bon",
        indice: 'Forme négative qui suggère le contraire',
      },
      {
        question: 'Va, cours, vole et nous venge',
        reponses: ['Gradation', 'Hyperbole', 'Anaphore', 'Asyndète'],
        correct: 0,
        explication: "Intensité croissante des verbes d'action",
        indice: "Les verbes s'intensifient progressivement",
      },
      {
        question: "C'est du propre ! (devant une saleté)",
        reponses: ['Antiphrase', 'Litote', 'Hyperbole', 'Ironie'],
        correct: 0,
        explication: "Dire le contraire de ce qu'on pense (ironique)",
        indice: 'On dit le contraire de la réalité',
      },
      {
        question: 'Attendre une éternité',
        reponses: ['Hyperbole', 'Litote', 'Métaphore', 'Gradation'],
        correct: 0,
        explication: "Exagération du temps d'attente",
        indice: 'Le temps est exagéré',
      },
      {
        question: 'Personne âgée dans la rue',
        reponses: ['Euphémisme', 'Litote', 'Périphrase', 'Antiphrase'],
        correct: 0,
        explication: 'Expression douce pour vieillard',
        indice: "Manière polie de parler de l'âge",
      },
      {
        question: "Il n'est pas bête du tout",
        reponses: ['Litote', 'Euphémisme', 'Hyperbole', 'Antiphrase'],
        correct: 0,
        explication: "Forme négative suggérant qu'il est intelligent",
        indice: 'La négation suggère le contraire',
      },
      {
        question: "Je te l'ai dit mille fois",
        reponses: ['Hyperbole', 'Gradation', 'Anaphore', 'Litote'],
        correct: 0,
        explication: 'Exagération du nombre de répétitions',
        indice: 'Le nombre est exagéré',
      },
      {
        question: "Quel génie ! (à quelqu'un qui fait une bêtise)",
        reponses: ['Antiphrase', 'Litote', 'Hyperbole', 'Euphémisme'],
        correct: 0,
        explication: 'Ironie : on dit génie pour imbécile',
        indice: 'Moquerie en disant le contraire',
      },
    ],
    '4': [
      {
        question: 'Paris outragé ! Paris brisé ! Paris martyrisé !',
        reponses: ['Anaphore', 'Épiphore', 'Parallélisme', 'Gradation'],
        correct: 0,
        explication: "Répétition de 'Paris' en début de phrases",
        indice: 'Le même mot revient au début',
      },
      {
        question: 'Où vas-tu ? Que fais-tu ? Qui es-tu ?',
        reponses: ['Épiphore', 'Anaphore', 'Parallélisme', 'Asyndète'],
        correct: 0,
        explication: "Répétition de 'tu' en fin de questions",
        indice: 'Le même élément revient à la fin',
      },
      {
        question: 'Il faut manger pour vivre et non vivre pour manger',
        reponses: ['Chiasme', 'Parallélisme', 'Anaphore', 'Antithèse'],
        correct: 0,
        explication: 'Structure inversée AB-BA (manger-vivre / vivre-manger)',
        indice: 'Les mots sont inversés symétriquement',
      },
      {
        question: 'Tel père, tel fils',
        reponses: ['Parallélisme', 'Chiasme', 'Anaphore', 'Ellipse'],
        correct: 0,
        explication: 'Même structure syntaxique répétée',
        indice: 'Structure identique',
      },
      {
        question: "Je suis venu, j'ai vu, j'ai vaincu",
        reponses: ['Asyndète', 'Polysyndète', 'Anaphore', 'Gradation'],
        correct: 0,
        explication: 'Absence de conjonction entre les propositions',
        indice: 'Pas de "et" entre les éléments',
      },
      {
        question: "Et la mer et l'amour ont l'amer pour partage",
        reponses: ['Polysyndète', 'Asyndète', 'Anaphore', 'Parallélisme'],
        correct: 0,
        explication: "Répétition de la conjonction 'et'",
        indice: "Plusieurs 'et' qui s'accumulent",
      },
      {
        question: 'Rien de nouveau',
        reponses: ['Ellipse', 'Asyndète', 'Litote', 'Périphrase'],
        correct: 0,
        explication: "Omission de 'il n'y a'",
        indice: 'Il manque des mots compréhensibles',
      },
      {
        question: 'Défense de fumer',
        reponses: ['Ellipse', 'Périphrase', 'Litote', 'Euphémisme'],
        correct: 0,
        explication: "Omission de 'il est interdit'",
        indice: 'Phrase courte sans verbe',
      },
      {
        question: 'Toujours aimer, toujours souffrir, toujours mourir',
        reponses: ['Anaphore', 'Épiphore', 'Gradation', 'Parallélisme'],
        correct: 0,
        explication: "Répétition de 'toujours' en début",
        indice: 'Mot répété au début de chaque groupe',
      },
      {
        question: 'Métro, boulot, dodo',
        reponses: ['Asyndète', 'Anaphore', 'Gradation', 'Polysyndète'],
        correct: 0,
        explication: 'Pas de liaison entre les mots',
        indice: 'Succession rapide sans conjonction',
      },
    ],
    '5': [
      {
        question: 'Pour qui sont ces serpents qui sifflent sur vos têtes ?',
        reponses: ['Allitération', 'Assonance', 'Anaphore', 'Onomatopée'],
        correct: 0,
        explication: "Répétition du son 's'",
        indice: 'Répétition de consonnes',
      },
      {
        question: "Les sanglots longs des violons de l'automne",
        reponses: ['Assonance', 'Allitération', 'Anaphore', 'Métaphore'],
        correct: 0,
        explication: "Répétition du son 'on'",
        indice: 'Répétition de voyelles',
      },
      {
        question: 'Boum ! Le tonnerre éclate',
        reponses: ['Onomatopée', 'Allitération', 'Hyperbole', 'Métaphore'],
        correct: 0,
        explication: "'Boum' imite le bruit du tonnerre",
        indice: 'Mot qui imite un son',
      },
      {
        question: "Ton thé t'a-t-il ôté ta toux ?",
        reponses: ['Allitération', 'Assonance', 'Anaphore', 'Parallélisme'],
        correct: 0,
        explication: "Répétition du son 't'",
        indice: 'Consonnes répétées',
      },
      {
        question: "Tic-tac fait l'horloge",
        reponses: ['Onomatopée', 'Allitération', 'Assonance', 'Répétition'],
        correct: 0,
        explication: 'Imitation du bruit de horloge',
        indice: 'Bruit reproduit par des mots',
      },
      {
        question: "Tout m'afflige et me nuit et conspire à me nuire",
        reponses: ['Assonance', 'Allitération', 'Polysyndète', 'Anaphore'],
        correct: 0,
        explication: "Répétition du son 'i'",
        indice: 'Voyelles qui se répètent',
      },
      {
        question: 'Trois tristes tigres',
        reponses: ['Allitération', 'Assonance', 'Anaphore', 'Gradation'],
        correct: 0,
        explication: "Répétition du son 'tr'",
        indice: 'Consonnes difficiles à prononcer',
      },
      {
        question: 'Cocorico chante le coq',
        reponses: [
          'Onomatopée',
          'Allitération',
          'Personnification',
          'Métaphore',
        ],
        correct: 0,
        explication: 'Imitation du cri du coq',
        indice: 'Cri animal reproduit',
      },
    ],
    '7': [
      {
        question: 'Un silence assourdissant',
        reponses: ['Oxymore', 'Paradoxe', 'Antithèse', 'Hyperbole'],
        correct: 0,
        explication: 'Alliance de mots contradictoires (silence/assourdissant)',
        indice: 'Deux mots opposés ensemble',
      },
      {
        question: "Plus ça change, plus c'est pareil",
        reponses: ['Paradoxe', 'Oxymore', 'Antithèse', 'Ironie'],
        correct: 0,
        explication: 'Énoncé contraire à la logique commune',
        indice: 'Phrase qui semble illogique mais vraie',
      },
      {
        question: 'Le jour et la nuit',
        reponses: ['Antithèse', 'Oxymore', 'Paradoxe', 'Comparaison'],
        correct: 0,
        explication: 'Opposition entre deux termes',
        indice: 'Deux concepts opposés',
      },
      {
        question: 'Quel beau temps ! (sous la pluie)',
        reponses: ['Ironie', 'Antiphrase', 'Litote', 'Euphémisme'],
        correct: 0,
        explication: 'Moquerie en disant le contraire',
        indice: 'On se moque de la situation',
      },
      {
        question: 'Un parfum vert et frais',
        reponses: ['Synesthésie', 'Métaphore', 'Oxymore', 'Hyperbole'],
        correct: 0,
        explication: 'Mélange de sensations (odorat et vue)',
        indice: 'Plusieurs sens mélangés',
      },
      {
        question: 'Une douce violence',
        reponses: ['Oxymore', 'Antithèse', 'Paradoxe', 'Hyperbole'],
        correct: 0,
        explication: 'Mots contradictoires (doux/violent)',
        indice: 'Opposition dans la même expression',
      },
      {
        question: 'Cette obscure clarté qui tombe des étoiles',
        reponses: ['Oxymore', 'Paradoxe', 'Métaphore', 'Antithèse'],
        correct: 0,
        explication: 'Obscure et clarté sont contradictoires',
        indice: 'Lumière et obscurité ensemble',
      },
      {
        question: 'Une voix chaude et douce',
        reponses: ['Synesthésie', 'Métaphore', 'Personnification', 'Hyperbole'],
        correct: 0,
        explication: 'Mélange de sensations tactile et auditive',
        indice: 'Sens différents combinés',
      },
      {
        question: "L'ombre et la lumière se combattent",
        reponses: ['Antithèse', 'Oxymore', 'Personnification', 'Métaphore'],
        correct: 0,
        explication: 'Opposition marquée entre deux concepts',
        indice: 'Deux éléments contraires opposés',
      },
      {
        question: 'Un illustre inconnu',
        reponses: ['Oxymore', 'Paradoxe', 'Antithèse', 'Ironie'],
        correct: 0,
        explication: 'Illustre et inconnu sont contradictoires',
        indice: 'Célèbre mais inconnu : contradiction',
      },
    ],
    '8': [
      {
        question: 'De cet amour je meurs',
        reponses: ['Hyperbate', 'Ellipse', 'Chiasme', 'Anaphore'],
        correct: 0,
        explication: "Inversion de l'ordre normal (Je meurs de cet amour)",
        indice: 'Ordre des mots inversé',
      },
      {
        question: 'Ce marchand accoudé sur son comptoir avide',
        reponses: ['Hypallage', 'Métaphore', 'Personnification', 'Hyperbate'],
        correct: 0,
        explication: 'Avide qualifie le marchand, pas le comptoir',
        indice: "L'adjectif va au mauvais mot",
      },
      {
        question: 'Demain sera demain',
        reponses: ['Épanadiplose', 'Anaphore', 'Tautologie', 'Répétition'],
        correct: 0,
        explication: 'Même mot au début et à la fin',
        indice: 'Répétition encadrant la phrase',
      },
      {
        question: 'Il prit son chapeau et la porte',
        reponses: ['Zeugma', 'Ellipse', 'Hyperbate', 'Asyndète'],
        correct: 0,
        explication: 'Prendre utilisé dans deux sens (saisir et sortir)',
        indice: 'Un verbe, deux sens différents',
      },
      {
        question: "Dans la forêt profonde marchait l'enfant",
        reponses: ['Hyperbate', 'Ellipse', 'Chiasme', 'Inversion'],
        correct: 0,
        explication: 'Inversion sujet-verbe',
        indice: 'Le sujet après le verbe',
      },
      {
        question: 'Vêtu de probité candide et de lin blanc',
        reponses: ['Zeugma', 'Hypallage', 'Chiasme', 'Parallélisme'],
        correct: 0,
        explication: 'Vêtu appliqué au moral (probité) et physique (lin)',
        indice: 'Un mot dans deux contextes',
      },
      {
        question: "L'amour, rien que l'amour",
        reponses: ['Épanadiplose', 'Anaphore', 'Épiphore', 'Répétition'],
        correct: 0,
        explication: 'Amour au début et à la fin',
        indice: 'Encadrement par le même mot',
      },
      {
        question: 'Un vieillard en cheveux blancs',
        reponses: ['Hypallage', 'Métonymie', 'Synecdoque', 'Périphrase'],
        correct: 0,
        explication: 'Blanc qualifie les cheveux, pas le vieillard',
        indice: "L'adjectif mal placé",
      },
      {
        question: 'Prendre la mouche et la fuite',
        reponses: ['Zeugma', 'Asyndète', 'Polysyndète', 'Chiasme'],
        correct: 0,
        explication: "Prendre dans deux sens (s'énerver et fuir)",
        indice: 'Verbe polysémique',
      },
    ],
  };

  constructor() {
    this.initializeRecapModules();
  }

  private initializeRecapModules(): void {
    // Module révision 1-2
    const recap12 = this.modules.find((m) => m.id === '3');
    if (recap12) {
      recap12.figures = [
        ...this.modules.find((m) => m.id === '1')!.figures,
        ...this.modules.find((m) => m.id === '2')!.figures,
      ];
    }

    // Module révision 3-4
    const recap34 = this.modules.find((m) => m.id === '6');
    if (recap34) {
      recap34.figures = [
        ...this.modules.find((m) => m.id === '4')!.figures,
        ...this.modules.find((m) => m.id === '5')!.figures,
      ];
    }

    // Module révision 5-6
    const recap56 = this.modules.find((m) => m.id === '9');
    if (recap56) {
      recap56.figures = [
        ...this.modules.find((m) => m.id === '7')!.figures,
        ...this.modules.find((m) => m.id === '8')!.figures,
      ];
    }

    // Module révision finale
    const recapFinal = this.modules.find((m) => m.id === 'final');
    if (recapFinal) {
      recapFinal.figures = this.modules
        .filter((m) => !m.isRecap)
        .flatMap((m) => m.figures);
    }
  }

  getModules(): Module[] {
    return this.modules.map((module) => ({
      ...module,
      isLocked: this.isModuleLocked(module),
    }));
  }

  getModuleById(id: string): Module | undefined {
    const module = this.modules.find((m) => m.id === id);
    if (module && !this.isModuleLocked(module)) {
      return module;
    }
    return module; // Retourne quand même le module pour afficher le message de verrouillage
  }

  isModuleLocked(module: Module): boolean {
    if (!module.isRecap || !module.requiredModules) {
      return false;
    }

    const scores = this.getModuleScores();

    for (const reqModuleId of module.requiredModules) {
      const moduleScore = scores.find((s) => s.moduleId === reqModuleId);

      if (
        !moduleScore ||
        moduleScore.percentage < (module.minPercentage || 70)
      ) {
        return true;
      }
    }

    return false;
  }

  getExercicesByModuleId(moduleId: string): Question[] {
    const module = this.modules.find((m) => m.id === moduleId);
    if (!module) return [];

    // Pour les modules de révision, combiner les questions des modules requis
    if (module.isRecap && module.requiredModules) {
      const allQuestions: Question[] = [];
      for (const reqModuleId of module.requiredModules) {
        const questions = this.questionPool[reqModuleId] || [];
        allQuestions.push(...questions);
      }
      return this.shuffleArray(allQuestions).slice(0, 10); // 10 questions random
    }

    // Pour les modules normaux, retourner questions mélangées
    const questions = this.questionPool[moduleId] || [];
    return this.shuffleArray([...questions]).slice(0, 10);
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  saveModuleScore(
    moduleId: string,
    score: number,
    totalQuestions: number
  ): void {
    const scores = this.getModuleScores();
    const percentage = Math.round((score / totalQuestions) * 100);

    const existingIndex = scores.findIndex((s) => s.moduleId === moduleId);
    const newScore: ModuleScore = {
      moduleId,
      score,
      totalQuestions,
      percentage,
      date: new Date(),
    };

    if (existingIndex >= 0) {
      scores[existingIndex] = newScore;
    } else {
      scores.push(newScore);
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(scores));
  }

  getModuleScores(): ModuleScore[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return [];

    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }

  getModuleScore(moduleId: string): ModuleScore | undefined {
    return this.getModuleScores().find((s) => s.moduleId === moduleId);
  }

  resetAllScores(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
