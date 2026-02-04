export const translations = {
  en: {
    // Header & Navigation
    siteName: 'OCaml Exercises',
    siteDescription: 'Learn OCaml through interactive coding exercises. Write code, run tests, and master functional programming.',
    backToExercises: 'Back to exercises',
    
    // Exercise List
    searchPlaceholder: 'Search exercises...',
    allCategories: 'All Categories',
    allDifficulties: 'All Difficulties',
    totalExercises: 'Total Exercises',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    noExercisesFound: 'No exercises found matching your criteria.',
    
    // Categories
    'Basics': 'Basics',
    'Recursion': 'Recursion',
    'Lists': 'Lists',
    'Higher-Order Functions': 'Higher-Order Functions',
    'Trees': 'Trees',
    'Options': 'Options',
    'Sorting': 'Sorting',
    'Interpreters': 'Interpreters',
    'Binary Search Trees': 'Binary Search Trees',
    'Heaps': 'Heaps',
    'Hash Tables': 'Hash Tables',
    'Graphs': 'Graphs',
    
    // Exercise View
    description: 'Description',
    hints: 'Hints',
    showHints: 'Show hints',
    hideHints: 'Hide hints',
    showNextHint: 'Show next hint',
    hint: 'Hint',
    solution: 'Solution',
    revealSolution: 'Reveal solution',
    hideSolution: 'Hide solution',
    trySolvingFirst: "Try solving the exercise first! Click \"Reveal solution\" when you're stuck.",
    yourSolution: 'Your Solution',
    resetCode: 'Reset code',
    runTests: 'Run Tests',
    running: 'Running...',
    output: 'Output',
    tests: 'Tests',
    clickRunTests: 'Click "Run Tests" to execute your code',
    runningOCaml: 'Running OCaml code...',
    success: 'Success!',
    syntaxOk: 'Syntax OK (tests not verified)',
    error: 'Error',
    exerciseNotFound: 'Exercise not found',
    selectExercise: 'Select an exercise from the sidebar',
    completed: 'completed',
    
    // Footer
    builtWith: 'Built with React, Tailwind CSS, and js_of_ocaml',
    learnMore: 'Learn more about OCaml →',
    
    // Language
    language: 'Language',
    languageName: 'English',
  },
  
  fr: {
    // Header & Navigation
    siteName: 'Exercices OCaml',
    siteDescription: 'Apprenez OCaml avec des exercices de programmation interactifs. Écrivez du code, exécutez des tests et maîtrisez la programmation fonctionnelle.',
    backToExercises: 'Retour aux exercices',
    
    // Exercise List
    searchPlaceholder: 'Rechercher des exercices...',
    allCategories: 'Toutes les catégories',
    allDifficulties: 'Toutes les difficultés',
    totalExercises: 'Total des exercices',
    easy: 'Facile',
    medium: 'Moyen',
    hard: 'Difficile',
    noExercisesFound: 'Aucun exercice trouvé correspondant à vos critères.',
    
    // Categories
    'Basics': 'Bases',
    'Recursion': 'Récursivité',
    'Lists': 'Listes',
    'Higher-Order Functions': 'Fonctions d\'Ordre Supérieur',
    'Trees': 'Arbres',
    'Options': 'Options',
    'Sorting': 'Tri',
    'Interpreters': 'Interpréteurs',
    'Binary Search Trees': 'Arbres Binaires de Recherche',
    'Heaps': 'Tas',
    'Hash Tables': 'Tables de Hachage',
    'Graphs': 'Graphes',
    
    // Exercise View
    description: 'Description',
    hints: 'Indices',
    showHints: 'Afficher les indices',
    hideHints: 'Masquer les indices',
    showNextHint: 'Afficher l\'indice suivant',
    hint: 'Indice',
    solution: 'Solution',
    revealSolution: 'Révéler la solution',
    hideSolution: 'Masquer la solution',
    trySolvingFirst: 'Essayez d\'abord de résoudre l\'exercice ! Cliquez sur "Révéler la solution" si vous êtes bloqué.',
    yourSolution: 'Votre Solution',
    resetCode: 'Réinitialiser',
    runTests: 'Exécuter les Tests',
    running: 'Exécution...',
    output: 'Sortie',
    tests: 'Tests',
    clickRunTests: 'Cliquez sur "Exécuter les Tests" pour exécuter votre code',
    runningOCaml: 'Exécution du code OCaml...',
    success: 'Succès !',
    syntaxOk: 'Syntaxe OK (tests non vérifiés)',
    error: 'Erreur',
    exerciseNotFound: 'Exercice non trouvé',
    selectExercise: 'Sélectionnez un exercice dans la barre latérale',
    completed: 'terminé(s)',
    
    // Footer
    builtWith: 'Construit avec React, Tailwind CSS et js_of_ocaml',
    learnMore: 'En savoir plus sur OCaml →',
    
    // Language
    language: 'Langue',
    languageName: 'Français',
  }
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
