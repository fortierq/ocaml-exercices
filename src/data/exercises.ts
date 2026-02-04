export interface Exercise {
  id: string;
  title: string;
  titleFr?: string;
  description: string;
  descriptionFr?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  categoryFr?: string;
  starterCode: string;
  solution: string;
  tests: string;
  hints: string[];
  hintsFr?: string[];
}

export const exercises: Exercise[] = [
  {
    id: 'factorial',
    title: 'Factorial',
    titleFr: 'Factorielle',
    description: 'Write a recursive function `factorial` that computes n! (n factorial). ',
    descriptionFr: 'Écrivez une fonction récursive `factorial` qui calcule n! (factorielle de n). ',
    difficulty: 'easy',
    category: 'Recursion',
    categoryFr: 'Récursivité',
    starterCode: `(* Write a recursive factorial function *)
let rec factorial n =
  failwith "TODO"`,
    solution: `let rec factorial n =
  if n <= 0 then 1
  else n * factorial (n - 1)`,
    tests: `(* Tests *)
let () =
  assert (factorial 0 = 1);
  assert (factorial 1 = 1);
  assert (factorial 5 = 120);
  assert (factorial 10 = 3628800);
  print_endline "All tests passed!"`,
    hints: [
      'Base case: factorial of 0 is 1',
      'Recursive case: n! = n * (n-1)!',
      'Use pattern matching or if-then-else'
    ],
    hintsFr: [
      'Cas de base : la factorielle de 0 est 1',
      'Cas récursif : n! = n * (n-1)!',
      'Utilisez le filtrage par motif ou if-then-else'
    ]
  },
  {
    id: 'fibonacci',
    title: 'Fibonacci Sequence',
    titleFr: 'Suite de Fibonacci',
    description: 'Write a function `fib` that returns the nth Fibonacci number. F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2).',
    descriptionFr: 'Écrivez une fonction `fib` qui retourne le n-ième nombre de Fibonacci. F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2).',
    difficulty: 'easy',
    category: 'Recursion',
    categoryFr: 'Récursivité',
    starterCode: `(* Write a Fibonacci function *)
let rec fib n =
  failwith "TODO"`,
    solution: `let rec fib n =
  match n with
  | 0 -> 0
  | 1 -> 1
  | n -> fib (n - 1) + fib (n - 2)`,
    tests: `(* Tests *)
let () =
  assert (fib 0 = 0);
  assert (fib 1 = 1);
  assert (fib 10 = 55);
  assert (fib 15 = 610);
  print_endline "All tests passed!"`,
    hints: [
      'Use pattern matching for the base cases (0 and 1)',
      'The recursive case adds the two previous values',
      'This naive implementation is slow for large n'
    ],
    hintsFr: [
      'Utilisez le filtrage par motif pour les cas de base (0 et 1)',
      'Le cas récursif additionne les deux valeurs précédentes',
      'Cette implémentation naïve est lente pour les grands n'
    ]
  },
  {
    id: 'list-sum',
    title: 'Sum of a List',
    titleFr: 'Somme d\'une Liste',
    description: 'Write a function `sum` that computes the sum of all integers in a list.',
    descriptionFr: 'Écrivez une fonction `sum` qui calcule la somme de tous les entiers d\'une liste.',
    difficulty: 'easy',
    category: 'Lists',
    categoryFr: 'Listes',
    starterCode: `(* Sum all elements of a list *)
let rec sum lst =
  failwith "TODO"`,
    solution: `let rec sum lst =
  match lst with
  | [] -> 0
  | x :: xs -> x + sum xs`,
    tests: `(* Tests *)
let () =
  assert (sum [] = 0);
  assert (sum [1] = 1);
  assert (sum [1; 2; 3; 4; 5] = 15);
  assert (sum [-1; 1; -2; 2] = 0);
  print_endline "All tests passed!"`,
    hints: [
      'Use pattern matching on the list',
      'Base case: empty list has sum 0',
      'Recursive case: add the head to the sum of the tail'
    ],
    hintsFr: [
      'Utilisez le filtrage par motif sur la liste',
      'Cas de base : la liste vide a une somme de 0',
      'Cas récursif : ajoutez la tête à la somme de la queue'
    ]
  },
  {
    id: 'list-length',
    title: 'List Length',
    titleFr: 'Longueur d\'une Liste',
    description: 'Write a function `length` that returns the number of elements in a list. Do not use the built-in `List.length`.',
    descriptionFr: 'Écrivez une fonction `length` qui retourne le nombre d\'éléments dans une liste. N\'utilisez pas `List.length`.',
    difficulty: 'easy',
    category: 'Lists',
    categoryFr: 'Listes',
    starterCode: `(* Compute the length of a list *)
let rec length lst =
  failwith "TODO"`,
    solution: `let rec length lst =
  match lst with
  | [] -> 0
  | _ :: xs -> 1 + length xs`,
    tests: `(* Tests *)
let () =
  assert (length [] = 0);
  assert (length [1] = 1);
  assert (length [1; 2; 3; 4; 5] = 5);
  assert (length ["a"; "b"; "c"] = 3);
  print_endline "All tests passed!"`,
    hints: [
      'Pattern match on the list structure',
      'Empty list has length 0',
      'Each cons cell adds 1 to the length'
    ],
    hintsFr: [
      'Filtrez par motif sur la structure de la liste',
      'La liste vide a une longueur de 0',
      'Chaque cellule cons ajoute 1 à la longueur'
    ]
  },
  {
    id: 'list-reverse',
    title: 'Reverse a List',
    titleFr: 'Inverser une Liste',
    description: 'Write a function `reverse` that reverses a list. Try to make it tail-recursive for efficiency.',
    descriptionFr: 'Écrivez une fonction `reverse` qui inverse une liste. Essayez de la rendre récursive terminale pour l\'efficacité.',
    difficulty: 'medium',
    category: 'Lists',
    categoryFr: 'Listes',
    starterCode: `(* Reverse a list *)
let reverse lst =
  failwith "TODO"`,
    solution: `let reverse lst =
  let rec aux acc = function
    | [] -> acc
    | x :: xs -> aux (x :: acc) xs
  in
  aux [] lst`,
    tests: `(* Tests *)
let () =
  assert (reverse [] = []);
  assert (reverse [1] = [1]);
  assert (reverse [1; 2; 3] = [3; 2; 1]);
  assert (reverse ["a"; "b"; "c"; "d"] = ["d"; "c"; "b"; "a"]);
  print_endline "All tests passed!"`,
    hints: [
      'A naive approach prepends each element, but is O(n²)',
      'Use an accumulator to build the reversed list',
      'The accumulator starts empty and builds up the result'
    ],
    hintsFr: [
      'Une approche naïve préfixe chaque élément, mais est en O(n²)',
      'Utilisez un accumulateur pour construire la liste inversée',
      'L\'accumulateur commence vide et construit le résultat'
    ]
  },
  {
    id: 'list-map',
    title: 'Map Function',
    titleFr: 'Fonction Map',
    description: 'Write a function `map` that applies a function to each element of a list and returns a new list with the results.',
    descriptionFr: 'Écrivez une fonction `map` qui applique une fonction à chaque élément d\'une liste et retourne une nouvelle liste avec les résultats.',
    difficulty: 'medium',
    category: 'Higher-Order Functions',
    categoryFr: 'Fonctions d\'Ordre Supérieur',
    starterCode: `(* Apply a function to each element of a list *)
let rec map f lst =
  failwith "TODO"`,
    solution: `let rec map f lst =
  match lst with
  | [] -> []
  | x :: xs -> f x :: map f xs`,
    tests: `(* Tests *)
let () =
  assert (map (fun x -> x * 2) [1; 2; 3] = [2; 4; 6]);
  assert (map String.length ["a"; "bb"; "ccc"] = [1; 2; 3]);
  assert (map (fun x -> x + 1) [] = []);
  print_endline "All tests passed!"`,
    hints: [
      'Pattern match on the list',
      'Apply f to the head and recurse on the tail',
      'Build a new list with the results'
    ],
    hintsFr: [
      'Filtrez par motif sur la liste',
      'Appliquez f à la tête et récursez sur la queue',
      'Construisez une nouvelle liste avec les résultats'
    ]
  },
  {
    id: 'list-filter',
    title: 'Filter Function',
    titleFr: 'Fonction Filter',
    description: 'Write a function `filter` that keeps only the elements of a list that satisfy a predicate.',
    descriptionFr: 'Écrivez une fonction `filter` qui garde seulement les éléments d\'une liste qui satisfont un prédicat.',
    difficulty: 'medium',
    category: 'Higher-Order Functions',
    categoryFr: 'Fonctions d\'Ordre Supérieur',
    starterCode: `(* Keep only elements that satisfy the predicate *)
let rec filter pred lst =
  failwith "TODO"`,
    solution: `let rec filter pred lst =
  match lst with
  | [] -> []
  | x :: xs ->
    if pred x then x :: filter pred xs
    else filter pred xs`,
    tests: `(* Tests *)
let () =
  assert (filter (fun x -> x > 0) [-1; 2; -3; 4] = [2; 4]);
  assert (filter (fun x -> x mod 2 = 0) [1; 2; 3; 4; 5; 6] = [2; 4; 6]);
  assert (filter (fun _ -> true) [1; 2; 3] = [1; 2; 3]);
  assert (filter (fun _ -> false) [1; 2; 3] = []);
  print_endline "All tests passed!"`,
    hints: [
      'Pattern match on the list',
      'If the predicate is true, include the element',
      'If false, skip it and recurse'
    ],
    hintsFr: [
      'Filtrez par motif sur la liste',
      'Si le prédicat est vrai, incluez l\'élément',
      'Si faux, sautez-le et récursez'
    ]
  },
  {
    id: 'list-fold',
    title: 'Fold Left',
    titleFr: 'Pliage à Gauche',
    description: 'Write a function `fold_left f acc [x1; x2; ...; xn]` that reduces a list from left to right using a combining function `f` and an initial accumulator `acc`. It computes `f (... (f (f acc x1) x2) ...) xn`. For example, `fold_left (+) 0 [1; 2; 3]` computes `((0 + 1) + 2) + 3 = 6`. The function `f` takes the accumulator as its first argument and the current element as its second argument.',
    descriptionFr: 'Écrivez une fonction `fold_left f acc [x1; x2; ...; xn]` qui réduit une liste de gauche à droite en utilisant une fonction de combinaison `f` et un accumulateur initial `acc`. Elle calcule `f (... (f (f acc x1) x2) ...) xn`. Par exemple, `fold_left (+) 0 [1; 2; 3]` calcule `((0 + 1) + 2) + 3 = 6`. La fonction `f` prend l\'accumulateur comme premier argument et l\'élément courant comme second argument.',
    difficulty: 'medium',
    category: 'Higher-Order Functions',
    categoryFr: 'Fonctions d\'Ordre Supérieur',
    starterCode: `(* Fold a list from left to right *)
let rec fold_left f acc lst =
  failwith "TODO"`,
    solution: `let rec fold_left f acc lst =
  match lst with
  | [] -> acc
  | x :: xs -> fold_left f (f acc x) xs`,
    tests: `(* Tests *)
let () =
  assert (fold_left (+) 0 [1; 2; 3; 4] = 10);
  assert (fold_left ( * ) 1 [1; 2; 3; 4] = 24);
  assert (fold_left (fun acc x -> x :: acc) [] [1; 2; 3] = [3; 2; 1]);
  print_endline "All tests passed!"`,
    hints: [
      'Base case: return the accumulator when list is empty',
      'Recursive case: apply f to acc and head, use result as new acc',
      'fold_left is tail-recursive'
    ],
    hintsFr: [
      'Cas de base : retournez l\'accumulateur quand la liste est vide',
      'Cas récursif : appliquez f à acc et la tête, utilisez le résultat comme nouvel acc',
      'fold_left est récursif terminal'
    ]
  },
  {
    id: 'binary-tree',
    title: 'Binary Tree Size',
    titleFr: 'Taille d\'un Arbre Binaire',
    description: 'Define a binary tree type and write a function `size` that counts the number of nodes in the tree.',
    descriptionFr: 'Définissez un type d\'arbre binaire et écrivez une fonction `size` qui compte le nombre de nœuds dans l\'arbre.',
    difficulty: 'medium',
    category: 'Trees',
    categoryFr: 'Arbres',
    starterCode: `(* Define a binary tree type *)
type 'a tree =
  | Empty
  | Node of 'a * 'a tree * 'a tree

(* Count the number of nodes *)
let rec size tree =
  failwith "TODO"`,
    solution: `type 'a tree =
  | Empty
  | Node of 'a * 'a tree * 'a tree

let rec size tree =
  match tree with
  | Empty -> 0
  | Node (_, left, right) -> 1 + size left + size right`,
    tests: `(* Tests *)
let () =
  assert (size Empty = 0);
  assert (size (Node (1, Empty, Empty)) = 1);
  assert (size (Node (1, Node (2, Empty, Empty), Node (3, Empty, Empty))) = 3);
  let big_tree = Node (1, 
    Node (2, Node (4, Empty, Empty), Empty),
    Node (3, Empty, Node (5, Empty, Empty))) in
  assert (size big_tree = 5);
  print_endline "All tests passed!"`,
    hints: [
      'Pattern match on Empty and Node',
      'Empty tree has size 0',
      'Node contributes 1 plus sizes of subtrees'
    ],
    hintsFr: [
      'Filtrez par motif sur Empty et Node',
      'L\'arbre vide a une taille de 0',
      'Un nœud contribue 1 plus les tailles des sous-arbres'
    ]
  },
  {
    id: 'tree-height',
    title: 'Binary Tree Height',
    titleFr: 'Hauteur d\'un Arbre Binaire',
    description: 'Write a function `height` that computes the height of a binary tree. An empty tree has height 0.',
    descriptionFr: 'Écrivez une fonction `height` qui calcule la hauteur d\'un arbre binaire. Un arbre vide a une hauteur de 0.',
    difficulty: 'medium',
    category: 'Trees',
    categoryFr: 'Arbres',
    starterCode: `type 'a tree =
  | Empty
  | Node of 'a * 'a tree * 'a tree

(* Compute the height of a tree *)
let rec height tree =
  failwith "TODO"`,
    solution: `type 'a tree =
  | Empty
  | Node of 'a * 'a tree * 'a tree

let rec height tree =
  match tree with
  | Empty -> 0
  | Node (_, left, right) -> 1 + max (height left) (height right)`,
    tests: `(* Tests *)
let () =
  assert (height Empty = 0);
  assert (height (Node (1, Empty, Empty)) = 1);
  assert (height (Node (1, Node (2, Empty, Empty), Empty)) = 2);
  let deep_tree = Node (1, Node (2, Node (3, Node (4, Empty, Empty), Empty), Empty), Empty) in
  assert (height deep_tree = 4);
  print_endline "All tests passed!"`,
    hints: [
      'Empty tree has height 0',
      'Height is 1 plus the maximum height of subtrees',
      'Use the max function to find the larger subtree height'
    ],
    hintsFr: [
      'L\'arbre vide a une hauteur de 0',
      'La hauteur est 1 plus la hauteur maximale des sous-arbres',
      'Utilisez la fonction max pour trouver la plus grande hauteur'
    ]
  },
  {
    id: 'option-bind',
    title: 'Option Bind',
    titleFr: 'Liaison Option',
    description: 'Write a function `bind opt f` (also known as flatMap or `>>=`) for the `option` type that chains optional computations. If `opt` is `None`, return `None`. If `opt` is `Some x`, apply `f` to `x` and return the result. Note that `f` itself returns an `option`, so `bind` "flattens" the result (avoids `Some (Some x)`). This is useful for chaining operations that may fail. For example: `bind (Some 5) (fun x -> if x > 0 then Some (x * 2) else None)` returns `Some 10`.',
    descriptionFr: 'Écrivez une fonction `bind opt f` (aussi connue sous le nom de flatMap ou `>>=`) pour le type `option` qui chaîne des calculs optionnels. Si `opt` est `None`, retournez `None`. Si `opt` est `Some x`, appliquez `f` à `x` et retournez le résultat. Notez que `f` retourne elle-même une `option`, donc `bind` "aplatit" le résultat (évite `Some (Some x)`). Cela permet de chaîner des opérations qui peuvent échouer. Par exemple : `bind (Some 5) (fun x -> if x > 0 then Some (x * 2) else None)` retourne `Some 10`.',
    difficulty: 'medium',
    category: 'Options',
    categoryFr: 'Options',
    starterCode: `(* Bind for option type *)
let bind opt f =
  failwith "TODO"`,
    solution: `let bind opt f =
  match opt with
  | None -> None
  | Some x -> f x`,
    tests: `(* Tests *)
let safe_div x y = if y = 0 then None else Some (x / y)

let () =
  assert (bind (Some 10) (fun x -> Some (x * 2)) = Some 20);
  assert (bind None (fun x -> Some (x * 2)) = None);
  assert (bind (Some 10) (safe_div 100) = Some 10);
  assert (bind (Some 0) (safe_div 100) = None);
  print_endline "All tests passed!"`,
    hints: [
      'If opt is `None`, return `None`',
      'If opt is `Some x`, apply `f` to `x`',
      '`f` returns an `option`, so no need to wrap the result'
    ],
    hintsFr: [
      'Si opt est `None`, retournez `None`',
      'Si opt est `Some x`, appliquez `f` à `x`',
      '`f` retourne une `option`, donc pas besoin d\'encapsuler le résultat'
    ]
  },
  {
    id: 'option-map',
    title: 'Option Map',
    titleFr: 'Map sur Option',
    description: 'Write a function `map` that applies a function to the value inside an `option` if it exists.',
    descriptionFr: 'Écrivez une fonction `map` qui applique une fonction à la valeur contenue dans une `option` si elle existe.',
    difficulty: 'easy',
    category: 'Options',
    categoryFr: 'Options',
    starterCode: `(* Map for option type *)
let map f opt =
  failwith "TODO"`,
    solution: `let map f opt =
  match opt with
  | None -> None
  | Some x -> Some (f x)`,
    tests: `(* Tests *)
let () =
  assert (map (fun x -> x * 2) (Some 5) = Some 10);
  assert (map (fun x -> x * 2) None = None);
  assert (map String.length (Some "hello") = Some 5);
  assert (map String.length None = None);
  print_endline "All tests passed!"`,
    hints: [
      'If opt is `None`, return `None`',
      'If opt is `Some x`, apply `f` to `x` and wrap the result',
      'Unlike `bind`, `map` wraps the result in `Some`'
    ],
    hintsFr: [
      'Si opt est `None`, retournez `None`',
      'Si opt est `Some x`, appliquez `f` à `x` et encapsulez le résultat',
      'Contrairement à `bind`, `map` encapsule le résultat dans `Some`'
    ]
  },
  {
    id: 'option-sequence',
    title: 'Option Sequence',
    titleFr: 'Séquence d\'Options',
    description: 'Write a function `sequence` that converts a list of options into an option of list. Returns `None` if any element is `None`.',
    descriptionFr: 'Écrivez une fonction `sequence` qui convertit une liste d\'options en une option de liste. Retourne `None` si un élément est `None`.',
    difficulty: 'medium',
    category: 'Options',
    categoryFr: 'Options',
    starterCode: `(* Convert list of options to option of list *)
let rec sequence opts =
  failwith "TODO"`,
    solution: `let rec sequence opts =
  match opts with
  | [] -> Some []
  | None :: _ -> None
  | Some x :: rest ->
    match sequence rest with
    | None -> None
    | Some xs -> Some (x :: xs)`,
    tests: `(* Tests *)
let () =
  assert (sequence [] = Some []);
  assert (sequence [Some 1; Some 2; Some 3] = Some [1; 2; 3]);
  assert (sequence [Some 1; None; Some 3] = None);
  assert (sequence [None] = None);
  print_endline "All tests passed!"`,
    hints: [
      'Empty list gives `Some []`',
      'If any element is `None`, return `None`',
      'Recursively process and combine results'
    ],
    hintsFr: [
      'Une liste vide donne `Some []`',
      'Si un élément est `None`, retournez `None`',
      'Traitez récursivement et combinez les résultats'
    ]
  },
  {
    id: 'quicksort',
    title: 'Quicksort',
    titleFr: 'Tri Rapide',
    description: 'Implement the quicksort algorithm for lists. Use `List.filter` or write your own partition function.',
    descriptionFr: 'Implémentez l\'algorithme de tri rapide pour les listes. Utilisez `List.filter` ou écrivez votre propre fonction de partition.',
    difficulty: 'hard',
    category: 'Sorting',
    categoryFr: 'Tri',
    starterCode: `(* Implement quicksort *)
let rec quicksort lst =
  failwith "TODO"`,
    solution: `let rec quicksort lst =
  match lst with
  | [] -> []
  | pivot :: rest ->
    let smaller = List.filter (fun x -> x < pivot) rest in
    let greater = List.filter (fun x -> x >= pivot) rest in
    quicksort smaller @ [pivot] @ quicksort greater`,
    tests: `(* Tests *)
let () =
  assert (quicksort [] = []);
  assert (quicksort [1] = [1]);
  assert (quicksort [3; 1; 2] = [1; 2; 3]);
  assert (quicksort [5; 2; 8; 1; 9; 3] = [1; 2; 3; 5; 8; 9]);
  assert (quicksort [1; 1; 1] = [1; 1; 1]);
  print_endline "All tests passed!"`,
    hints: [
      'Choose the first element as pivot',
      'Partition the rest into smaller and greater elements',
      'Recursively sort and concatenate'
    ],
    hintsFr: [
      'Choisissez le premier élément comme pivot',
      'Partitionnez le reste en éléments plus petits et plus grands',
      'Triez récursivement et concaténez'
    ]
  },
  {
    id: 'mergesort',
    title: 'Merge Sort',
    titleFr: 'Tri Fusion',
    description: 'Implement the merge sort algorithm. You will need to write a function to split a list and a function to merge two sorted lists.',
    descriptionFr: 'Implémentez l\'algorithme de tri fusion. Vous devrez écrire une fonction pour diviser une liste et une fonction pour fusionner deux listes triées.',
    difficulty: 'hard',
    category: 'Sorting',
    categoryFr: 'Tri',
    starterCode: `(* Split a list into two halves *)
let rec split lst =
  failwith "TODO"

(* Merge two sorted lists *)
let rec merge lst1 lst2 =
  failwith "TODO"

(* Merge sort *)
let rec mergesort lst =
  failwith "TODO"`,
    solution: `let rec split lst =
  match lst with
  | [] -> ([], [])
  | [x] -> ([x], [])
  | x :: y :: rest ->
    let (l1, l2) = split rest in
    (x :: l1, y :: l2)

let rec merge lst1 lst2 =
  match lst1, lst2 with
  | [], l | l, [] -> l
  | x :: xs, y :: ys ->
    if x <= y then x :: merge xs lst2
    else y :: merge lst1 ys

let rec mergesort lst =
  match lst with
  | [] | [_] -> lst
  | _ ->
    let (l1, l2) = split lst in
    merge (mergesort l1) (mergesort l2)`,
    tests: `(* Tests *)
let () =
  assert (mergesort [] = []);
  assert (mergesort [1] = [1]);
  assert (mergesort [2; 1] = [1; 2]);
  assert (mergesort [3; 1; 4; 1; 5; 9; 2; 6] = [1; 1; 2; 3; 4; 5; 6; 9]);
  print_endline "All tests passed!"`,
    hints: [
      'Split: alternate elements between two lists',
      'Merge: compare heads and take smaller',
      'Base case: lists of 0 or 1 element are sorted'
    ],
    hintsFr: [
      'Split : alternez les éléments entre deux listes',
      'Merge : comparez les têtes et prenez la plus petite',
      'Cas de base : les listes de 0 ou 1 élément sont triées'
    ]
  },
  // Binary Search Trees
  {
    id: 'bst-insert',
    title: 'BST Insert',
    titleFr: 'Insertion ABR',
    description: 'Write a function `insert` that inserts a value into a binary search tree while maintaining the BST property.',
    descriptionFr: 'Écrivez une fonction `insert` qui insère une valeur dans un arbre binaire de recherche en maintenant la propriété ABR.',
    difficulty: 'medium',
    category: 'Binary Search Trees',
    categoryFr: 'Arbres Binaires de Recherche',
    starterCode: `type 'a bst =
  | Empty
  | Node of 'a * 'a bst * 'a bst

(* Insert a value into a BST *)
let rec insert x tree =
  failwith "TODO"`,
    solution: `type 'a bst =
  | Empty
  | Node of 'a * 'a bst * 'a bst

let rec insert x tree =
  match tree with
  | Empty -> Node (x, Empty, Empty)
  | Node (v, left, right) ->
    if x < v then Node (v, insert x left, right)
    else if x > v then Node (v, left, insert x right)
    else tree (* x already exists *)`,
    tests: `(* Tests *)
let rec inorder = function
  | Empty -> []
  | Node (v, l, r) -> inorder l @ [v] @ inorder r

let () =
  let t = insert 5 Empty in
  let t = insert 3 t in
  let t = insert 7 t in
  let t = insert 1 t in
  assert (inorder t = [1; 3; 5; 7]);
  print_endline "All tests passed!"`,
    hints: [
      'Compare x with the current node value',
      'If x < v, recurse on the left subtree',
      'If x > v, recurse on the right subtree',
      'Handle the case where x equals v (duplicate)'
    ],
    hintsFr: [
      'Comparez x avec la valeur du nœud courant',
      'Si x < v, récursez sur le sous-arbre gauche',
      'Si x > v, récursez sur le sous-arbre droit',
      'Gérez le cas où x est égal à v (doublon)'
    ]
  },
  {
    id: 'bst-search',
    title: 'BST Search',
    titleFr: 'Recherche ABR',
    description: 'Write a function `mem` that checks if a value exists in a binary search tree.',
    descriptionFr: 'Écrivez une fonction `mem` qui vérifie si une valeur existe dans un arbre binaire de recherche.',
    difficulty: 'easy',
    category: 'Binary Search Trees',
    categoryFr: 'Arbres Binaires de Recherche',
    starterCode: `type 'a bst =
  | Empty
  | Node of 'a * 'a bst * 'a bst

(* Check if x exists in the BST *)
let rec mem x tree =
  failwith "TODO"`,
    solution: `type 'a bst =
  | Empty
  | Node of 'a * 'a bst * 'a bst

let rec mem x tree =
  match tree with
  | Empty -> false
  | Node (v, left, right) ->
    if x = v then true
    else if x < v then mem x left
    else mem x right`,
    tests: `(* Tests *)
let t = Node (5, Node (3, Node (1, Empty, Empty), Empty), Node (7, Empty, Empty))

let () =
  assert (mem 5 t = true);
  assert (mem 3 t = true);
  assert (mem 1 t = true);
  assert (mem 7 t = true);
  assert (mem 4 t = false);
  assert (mem 0 t = false);
  print_endline "All tests passed!"`,
    hints: [
      'Use the BST property to guide your search',
      'If x equals current value, found it!',
      'If x < v, search left; if x > v, search right'
    ],
    hintsFr: [
      'Utilisez la propriété ABR pour guider votre recherche',
      'Si x égale la valeur courante, trouvé !',
      'Si x < v, cherchez à gauche ; si x > v, cherchez à droite'
    ]
  },
  {
    id: 'bst-min',
    title: 'BST Minimum',
    titleFr: 'Minimum ABR',
    description: 'Write a function `find_min` that returns the minimum value in a non-empty BST.',
    descriptionFr: 'Écrivez une fonction `find_min` qui retourne la valeur minimale dans un ABR non vide.',
    difficulty: 'easy',
    category: 'Binary Search Trees',
    categoryFr: 'Arbres Binaires de Recherche',
    starterCode: `type 'a bst =
  | Empty
  | Node of 'a * 'a bst * 'a bst

(* Find the minimum value in a BST *)
let rec find_min tree =
  failwith "TODO"`,
    solution: `type 'a bst =
  | Empty
  | Node of 'a * 'a bst * 'a bst

let rec find_min tree =
  match tree with
  | Empty -> failwith "Empty tree"
  | Node (v, Empty, _) -> v
  | Node (_, left, _) -> find_min left`,
    tests: `(* Tests *)
let t = Node (5, Node (3, Node (1, Empty, Empty), Empty), Node (7, Empty, Node (9, Empty, Empty)))

let () =
  assert (find_min t = 1);
  assert (find_min (Node (42, Empty, Empty)) = 42);
  print_endline "All tests passed!"`,
    hints: [
      'In a BST, the minimum is always in the leftmost node',
      'Keep going left until you cannot anymore',
      'Handle the empty tree case'
    ],
    hintsFr: [
      'Dans un ABR, le minimum est toujours dans le nœud le plus à gauche',
      'Continuez à gauche jusqu\'à ce que vous ne puissiez plus',
      'Gérez le cas de l\'arbre vide'
    ]
  },
  {
    id: 'bst-delete',
    title: 'BST Delete',
    titleFr: 'Suppression ABR',
    description: 'Write a function `delete` that removes a value from a BST while maintaining the BST property.',
    descriptionFr: 'Écrivez une fonction `delete` qui supprime une valeur d\'un ABR en maintenant la propriété ABR.',
    difficulty: 'hard',
    category: 'Binary Search Trees',
    categoryFr: 'Arbres Binaires de Recherche',
    starterCode: `type 'a bst =
  | Empty
  | Node of 'a * 'a bst * 'a bst

(* Delete a value from a BST *)
let rec delete x tree =
  failwith "TODO"`,
    solution: `type 'a bst =
  | Empty
  | Node of 'a * 'a bst * 'a bst

let rec find_min = function
  | Empty -> failwith "Empty"
  | Node (v, Empty, _) -> v
  | Node (_, l, _) -> find_min l

let rec delete x tree =
  match tree with
  | Empty -> Empty
  | Node (v, left, right) ->
    if x < v then Node (v, delete x left, right)
    else if x > v then Node (v, left, delete x right)
    else (* x = v, delete this node *)
      match left, right with
      | Empty, Empty -> Empty
      | Empty, r -> r
      | l, Empty -> l
      | l, r ->
        let min_right = find_min r in
        Node (min_right, l, delete min_right r)`,
    tests: `(* Tests *)
let rec inorder = function
  | Empty -> []
  | Node (v, l, r) -> inorder l @ [v] @ inorder r

let t = Node (5, Node (3, Node (1, Empty, Empty), Node (4, Empty, Empty)), 
              Node (7, Node (6, Empty, Empty), Node (8, Empty, Empty)))

let () =
  assert (inorder (delete 1 t) = [3; 4; 5; 6; 7; 8]);
  assert (inorder (delete 5 t) = [1; 3; 4; 6; 7; 8]);
  assert (inorder (delete 3 t) = [1; 4; 5; 6; 7; 8]);
  print_endline "All tests passed!"`,
    hints: [
      'Three cases: leaf, one child, two children',
      'For two children, replace with in-order successor (min of right subtree)',
      'Delete the successor from the right subtree'
    ],
    hintsFr: [
      'Trois cas : feuille, un enfant, deux enfants',
      'Pour deux enfants, remplacez par le successeur in-order (min du sous-arbre droit)',
      'Supprimez le successeur du sous-arbre droit'
    ]
  },
  // Heaps
  {
    id: 'heap-insert',
    title: 'Min-Heap Insert',
    titleFr: 'Insertion Tas-Min',
    description: 'Implement a min-heap using an array. Write the `insert` function that adds an element and maintains the heap property.',
    descriptionFr: 'Implémentez un tas-min en utilisant un tableau. Écrivez la fonction `insert` qui ajoute un élément et maintient la propriété de tas.',
    difficulty: 'hard',
    category: 'Heaps',
    categoryFr: 'Tas',
    starterCode: `(* Array-based min-heap *)
type 'a heap = { mutable data: 'a array; mutable size: int }

let create () = { data = [||]; size = 0 }

let parent i = (i - 1) / 2
let left i = 2 * i + 1
let right i = 2 * i + 2

let swap arr i j =
  let tmp = arr.(i) in
  arr.(i) <- arr.(j);
  arr.(j) <- tmp

(* Bubble up element at index i *)
let rec sift_up heap i =
  failwith "TODO"

(* Insert element into heap *)
let insert heap x =
  failwith "TODO"`,
    solution: `(* Array-based min-heap *)
type 'a heap = { mutable data: 'a array; mutable size: int }

let create () = { data = [||]; size = 0 }

let parent i = (i - 1) / 2
let left i = 2 * i + 1
let right i = 2 * i + 2

let swap arr i j =
  let tmp = arr.(i) in
  arr.(i) <- arr.(j);
  arr.(j) <- tmp

let rec sift_up heap i =
  if i > 0 && heap.data.(parent i) > heap.data.(i) then begin
    swap heap.data (parent i) i;
    sift_up heap (parent i)
  end

let insert heap x =
  let new_size = heap.size + 1 in
  if new_size > Array.length heap.data then begin
    let new_cap = max 1 (2 * Array.length heap.data) in
    let new_arr = Array.make new_cap x in
    Array.blit heap.data 0 new_arr 0 heap.size;
    heap.data <- new_arr
  end;
  heap.data.(heap.size) <- x;
  heap.size <- new_size;
  sift_up heap (heap.size - 1)`,
    tests: `(* Tests *)
let get_min heap =
  if heap.size = 0 then failwith "Empty heap"
  else heap.data.(0)

let () =
  let h = create () in
  insert h 5;
  assert (get_min h = 5);
  insert h 3;
  assert (get_min h = 3);
  insert h 7;
  assert (get_min h = 3);
  insert h 1;
  assert (get_min h = 1);
  print_endline "All tests passed!"`,
    hints: [
      'Use `sift_up` to restore heap property after insertion',
      'Compare with parent and swap if smaller',
      'Remember to resize the array when full'
    ],
    hintsFr: [
      'Utilisez `sift_up` pour restaurer la propriété de tas après insertion',
      'Comparez avec le parent et échangez si plus petit',
      'N\'oubliez pas de redimensionner le tableau quand il est plein'
    ]
  },
  {
    id: 'heap-extract-min',
    title: 'Min-Heap Extract',
    titleFr: 'Extraction Tas-Min',
    description: 'Write a function `extract_min` that removes and returns the minimum element from an array-based min-heap.',
    descriptionFr: 'Écrivez une fonction `extract_min` qui supprime et retourne l\'élément minimum d\'un tas-min basé sur tableau.',
    difficulty: 'medium',
    category: 'Heaps',
    categoryFr: 'Tas',
    starterCode: `(* Array-based min-heap *)
type 'a heap = { mutable data: 'a array; mutable size: int }

let parent i = (i - 1) / 2
let left i = 2 * i + 1
let right i = 2 * i + 2

let swap arr i j =
  let tmp = arr.(i) in
  arr.(i) <- arr.(j);
  arr.(j) <- tmp

(* Bubble down element at index i *)
let rec sift_down heap i =
  failwith "TODO"

(* Extract minimum: returns min_value *)
let extract_min heap =
  failwith "TODO"`,
    solution: `(* Array-based min-heap *)
type 'a heap = { mutable data: 'a array; mutable size: int }

let parent i = (i - 1) / 2
let left i = 2 * i + 1
let right i = 2 * i + 2

let swap arr i j =
  let tmp = arr.(i) in
  arr.(i) <- arr.(j);
  arr.(j) <- tmp

let rec sift_down heap i =
  let smallest = ref i in
  let l = left i and r = right i in
  if l < heap.size && heap.data.(l) < heap.data.(!smallest) then
    smallest := l;
  if r < heap.size && heap.data.(r) < heap.data.(!smallest) then
    smallest := r;
  if !smallest <> i then begin
    swap heap.data i !smallest;
    sift_down heap !smallest
  end

let extract_min heap =
  if heap.size = 0 then failwith "Empty heap";
  let min_val = heap.data.(0) in
  heap.data.(0) <- heap.data.(heap.size - 1);
  heap.size <- heap.size - 1;
  sift_down heap 0;
  min_val`,
    tests: `(* Tests *)
let create () = { data = [||]; size = 0 }

let rec sift_up heap i =
  if i > 0 && heap.data.(parent i) > heap.data.(i) then begin
    swap heap.data (parent i) i;
    sift_up heap (parent i)
  end

let insert heap x =
  let new_size = heap.size + 1 in
  if new_size > Array.length heap.data then begin
    let new_cap = max 1 (2 * Array.length heap.data) in
    let new_arr = Array.make new_cap x in
    Array.blit heap.data 0 new_arr 0 heap.size;
    heap.data <- new_arr
  end;
  heap.data.(heap.size) <- x;
  heap.size <- new_size;
  sift_up heap (heap.size - 1)

let () =
  let h = create () in
  List.iter (insert h) [3; 1; 4; 1; 5];
  assert (extract_min h = 1);
  assert (extract_min h = 1);
  assert (extract_min h = 3);
  assert (extract_min h = 4);
  print_endline "All tests passed!"`,
    hints: [
      'The minimum is always at index 0',
      'Replace root with last element, then `sift_down`',
      'Compare with both children and swap with the smaller one'
    ],
    hintsFr: [
      'Le minimum est toujours à l\'index 0',
      'Remplacez la racine par le dernier élément, puis `sift_down`',
      'Comparez avec les deux enfants et échangez avec le plus petit'
    ]
  },
  {
    id: 'heapsort',
    title: 'Heapsort',
    titleFr: 'Tri par Tas',
    description: 'Implement heapsort using an array-based min-heap: build a heap from the list, then extract elements in order.',
    descriptionFr: 'Implémentez le tri par tas avec un tas-min basé sur tableau : construisez un tas à partir de la liste, puis extrayez les éléments dans l\'ordre.',
    difficulty: 'medium',
    category: 'Heaps',
    categoryFr: 'Tas',
    starterCode: `(* Array-based min-heap *)
type 'a heap = { mutable data: 'a array; mutable size: int }

let create () = { data = [||]; size = 0 }
let parent i = (i - 1) / 2
let left i = 2 * i + 1
let right i = 2 * i + 2

let swap arr i j =
  let tmp = arr.(i) in arr.(i) <- arr.(j); arr.(j) <- tmp

let rec sift_up heap i =
  if i > 0 && heap.data.(parent i) > heap.data.(i) then begin
    swap heap.data (parent i) i; sift_up heap (parent i)
  end

let insert heap x =
  let new_size = heap.size + 1 in
  if new_size > Array.length heap.data then begin
    let new_cap = max 1 (2 * Array.length heap.data) in
    let new_arr = Array.make new_cap x in
    Array.blit heap.data 0 new_arr 0 heap.size;
    heap.data <- new_arr
  end;
  heap.data.(heap.size) <- x;
  heap.size <- new_size;
  sift_up heap (heap.size - 1)

let rec sift_down heap i =
  let smallest = ref i in
  let l = left i and r = right i in
  if l < heap.size && heap.data.(l) < heap.data.(!smallest) then smallest := l;
  if r < heap.size && heap.data.(r) < heap.data.(!smallest) then smallest := r;
  if !smallest <> i then begin
    swap heap.data i !smallest; sift_down heap !smallest
  end

let extract_min heap =
  if heap.size = 0 then failwith "Empty heap";
  let min_val = heap.data.(0) in
  heap.data.(0) <- heap.data.(heap.size - 1);
  heap.size <- heap.size - 1;
  sift_down heap 0;
  min_val

(* Sort a list using the heap *)
let heapsort lst =
  failwith "TODO"`,
    solution: `(* Array-based min-heap *)
type 'a heap = { mutable data: 'a array; mutable size: int }

let create () = { data = [||]; size = 0 }
let parent i = (i - 1) / 2
let left i = 2 * i + 1
let right i = 2 * i + 2

let swap arr i j =
  let tmp = arr.(i) in arr.(i) <- arr.(j); arr.(j) <- tmp

let rec sift_up heap i =
  if i > 0 && heap.data.(parent i) > heap.data.(i) then begin
    swap heap.data (parent i) i; sift_up heap (parent i)
  end

let insert heap x =
  let new_size = heap.size + 1 in
  if new_size > Array.length heap.data then begin
    let new_cap = max 1 (2 * Array.length heap.data) in
    let new_arr = Array.make new_cap x in
    Array.blit heap.data 0 new_arr 0 heap.size;
    heap.data <- new_arr
  end;
  heap.data.(heap.size) <- x;
  heap.size <- new_size;
  sift_up heap (heap.size - 1)

let rec sift_down heap i =
  let smallest = ref i in
  let l = left i and r = right i in
  if l < heap.size && heap.data.(l) < heap.data.(!smallest) then smallest := l;
  if r < heap.size && heap.data.(r) < heap.data.(!smallest) then smallest := r;
  if !smallest <> i then begin
    swap heap.data i !smallest; sift_down heap !smallest
  end

let extract_min heap =
  if heap.size = 0 then failwith "Empty heap";
  let min_val = heap.data.(0) in
  heap.data.(0) <- heap.data.(heap.size - 1);
  heap.size <- heap.size - 1;
  sift_down heap 0;
  min_val

let heapsort lst =
  let heap = create () in
  List.iter (insert heap) lst;
  let rec extract_all acc =
    if heap.size = 0 then List.rev acc
    else extract_all (extract_min heap :: acc)
  in
  extract_all []`,
    tests: `(* Tests *)
let () =
  assert (heapsort [] = []);
  assert (heapsort [1] = [1]);
  assert (heapsort [3; 1; 4; 1; 5; 9; 2; 6] = [1; 1; 2; 3; 4; 5; 6; 9]);
  assert (heapsort [5; 4; 3; 2; 1] = [1; 2; 3; 4; 5]);
  print_endline "All tests passed!"`,
    hints: [
      'First, insert all elements into an empty heap',
      'Then, repeatedly extract the minimum',
      'Use `List.iter` to insert all elements'
    ],
    hintsFr: [
      'D\'abord, insérez tous les éléments dans un tas vide',
      'Ensuite, extrayez le minimum de manière répétée',
      'Utilisez `List.iter` pour insérer tous les éléments'
    ]
  },
  // Hash Tables
  {
    id: 'hashtable-create',
    title: 'Hash Table Create & Add',
    titleFr: 'Création & Ajout Table de Hachage',
    description: 'Implement a simple hash table using an array of association lists. Write `create`, `hash`, and `add` functions.',
    descriptionFr: 'Implémentez une table de hachage simple utilisant un tableau de listes d\'associations. Écrivez les fonctions `create`, `hash` et `add`.',
    difficulty: 'medium',
    category: 'Hash Tables',
    categoryFr: 'Tables de Hachage',
    starterCode: `type ('k, 'v) hashtbl = {
  buckets: ('k * 'v) list array;
  size: int;
}

(* Create a hash table with n buckets *)
let create n =
  failwith "TODO"

(* Simple hash function for integers *)
let hash tbl key =
  failwith "TODO"

(* Add a key-value pair *)
let add tbl key value =
  failwith "TODO"`,
    solution: `type ('k, 'v) hashtbl = {
  buckets: ('k * 'v) list array;
  size: int;
}

let create n = {
  buckets = Array.make n [];
  size = n;
}

let hash tbl key =
  (Hashtbl.hash key) mod tbl.size

let add tbl key value =
  let i = hash tbl key in
  (* Remove old binding if exists, then add new *)
  let bucket = List.filter (fun (k, _) -> k <> key) tbl.buckets.(i) in
  tbl.buckets.(i) <- (key, value) :: bucket`,
    tests: `(* Tests *)
let find tbl key =
  let i = (Hashtbl.hash key) mod tbl.size in
  List.assoc key tbl.buckets.(i)

let () =
  let tbl = create 10 in
  add tbl "a" 1;
  add tbl "b" 2;
  add tbl "c" 3;
  assert (find tbl "a" = 1);
  assert (find tbl "b" = 2);
  assert (find tbl "c" = 3);
  add tbl "a" 10; (* update *)
  assert (find tbl "a" = 10);
  print_endline "All tests passed!"`,
    hints: [
      'Use Array.make to create the bucket array',
      'Use modulo to map hash values to bucket indices',
      'Remove existing binding before adding to handle updates'
    ],
    hintsFr: [
      'Utilisez Array.make pour créer le tableau de buckets',
      'Utilisez modulo pour mapper les valeurs de hachage aux indices',
      'Supprimez la liaison existante avant d\'ajouter pour gérer les mises à jour'
    ]
  },
  {
    id: 'hashtable-find',
    title: 'Hash Table Find & Remove',
    titleFr: 'Recherche & Suppression Table de Hachage',
    description: 'Implement `find` and `remove` functions for the hash table.',
    descriptionFr: 'Implémentez les fonctions `find` et `remove` pour la table de hachage.',
    difficulty: 'medium',
    category: 'Hash Tables',
    categoryFr: 'Tables de Hachage',
    starterCode: `type ('k, 'v) hashtbl = {
  buckets: ('k * 'v) list array;
  size: int;
}

let create n = { buckets = Array.make n []; size = n }
let hash tbl key = (Hashtbl.hash key) mod tbl.size
let add tbl key value =
  let i = hash tbl key in
  let bucket = List.filter (fun (k, _) -> k <> key) tbl.buckets.(i) in
  tbl.buckets.(i) <- (key, value) :: bucket

(* Find a value by key, returns option *)
let find tbl key =
  failwith "TODO"

(* Remove a key-value pair *)
let remove tbl key =
  failwith "TODO"`,
    solution: `type ('k, 'v) hashtbl = {
  buckets: ('k * 'v) list array;
  size: int;
}

let create n = { buckets = Array.make n []; size = n }
let hash tbl key = (Hashtbl.hash key) mod tbl.size
let add tbl key value =
  let i = hash tbl key in
  let bucket = List.filter (fun (k, _) -> k <> key) tbl.buckets.(i) in
  tbl.buckets.(i) <- (key, value) :: bucket

let find tbl key =
  let i = hash tbl key in
  List.assoc_opt key tbl.buckets.(i)

let remove tbl key =
  let i = hash tbl key in
  tbl.buckets.(i) <- List.filter (fun (k, _) -> k <> key) tbl.buckets.(i)`,
    tests: `(* Tests *)
let () =
  let tbl = create 10 in
  add tbl 1 "one";
  add tbl 2 "two";
  add tbl 3 "three";
  assert (find tbl 1 = Some "one");
  assert (find tbl 2 = Some "two");
  assert (find tbl 99 = None);
  remove tbl 2;
  assert (find tbl 2 = None);
  assert (find tbl 1 = Some "one");
  print_endline "All tests passed!"`,
    hints: [
      'Use `List.assoc_opt` to find in the bucket',
      'Use `List.filter` to remove from the bucket',
      'Remember to compute the correct bucket index first'
    ],
    hintsFr: [
      'Utilisez `List.assoc_opt` pour chercher dans le bucket',
      'Utilisez `List.filter` pour supprimer du bucket',
      'N\'oubliez pas de calculer d\'abord le bon indice de bucket'
    ]
  },
  // Graphs
  {
    id: 'graph-dfs',
    title: 'Graph DFS',
    titleFr: 'Parcours en Profondeur',
    description: 'Implement depth-first search (DFS) on a graph represented as an adjacency list.',
    descriptionFr: 'Implémentez le parcours en profondeur (DFS) sur un graphe représenté par une liste d\'adjacence.',
    difficulty: 'medium',
    category: 'Graphs',
    categoryFr: 'Graphes',
    starterCode: `(* Graph as adjacency list: node -> list of neighbors *)
type graph = (int * int list) list

(* Get neighbors of a node *)
let neighbors g node =
  try List.assoc node g with Not_found -> []

(* DFS from start node, returns list of visited nodes in order *)
let dfs g start =
  failwith "TODO"`,
    solution: `type graph = (int * int list) list

let neighbors g node =
  try List.assoc node g with Not_found -> []

let dfs g start =
  let rec explore visited stack acc =
    match stack with
    | [] -> List.rev acc
    | node :: rest ->
      if List.mem node visited then
        explore visited rest acc
      else
        let neighs = neighbors g node in
        explore (node :: visited) (neighs @ rest) (node :: acc)
  in
  explore [] [start] []`,
    tests: `(* Tests *)
let g = [(1, [2; 3]); (2, [4]); (3, [4]); (4, [5]); (5, [])]

let () =
  let result = dfs g 1 in
  assert (List.hd result = 1);
  assert (List.mem 2 result);
  assert (List.mem 3 result);
  assert (List.mem 4 result);
  assert (List.mem 5 result);
  assert (List.length result = 5);
  print_endline "All tests passed!"`,
    hints: [
      'Use a stack (list) for nodes to visit',
      'Keep track of visited nodes to avoid cycles',
      'Add neighbors to the front of the stack for DFS behavior'
    ],
    hintsFr: [
      'Utilisez une pile (liste) pour les nœuds à visiter',
      'Gardez trace des nœuds visités pour éviter les cycles',
      'Ajoutez les voisins au début de la pile pour le comportement DFS'
    ]
  },
  {
    id: 'graph-bfs',
    title: 'Graph BFS',
    titleFr: 'Parcours en Largeur',
    description: 'Implement breadth-first search (BFS) on a graph. Return nodes in the order they are visited.',
    descriptionFr: 'Implémentez le parcours en largeur (BFS) sur un graphe. Retournez les nœuds dans l\'ordre de visite.',
    difficulty: 'medium',
    category: 'Graphs',
    categoryFr: 'Graphes',
    starterCode: `type graph = (int * int list) list

let neighbors g node =
  try List.assoc node g with Not_found -> []

(* BFS from start node, returns list of visited nodes in order *)
let bfs g start =
  failwith "TODO"`,
    solution: `type graph = (int * int list) list

let neighbors g node =
  try List.assoc node g with Not_found -> []

let bfs g start =
  let rec explore visited queue acc =
    match queue with
    | [] -> List.rev acc
    | node :: rest ->
      if List.mem node visited then
        explore visited rest acc
      else
        let neighs = neighbors g node in
        explore (node :: visited) (rest @ neighs) (node :: acc)
  in
  explore [] [start] []`,
    tests: `(* Tests *)
let g = [(1, [2; 3]); (2, [4; 5]); (3, [6]); (4, []); (5, []); (6, [])]

let () =
  let result = bfs g 1 in
  assert (List.hd result = 1);
  (* BFS visits level by level *)
  assert (List.length result = 6);
  (* Check that 2 and 3 come before 4, 5, 6 *)
  let idx x = let rec f i = function [] -> -1 | h::t -> if h=x then i else f (i+1) t in f 0 result in
  assert (idx 2 < idx 4 && idx 2 < idx 5);
  assert (idx 3 < idx 6);
  print_endline "All tests passed!"`,
    hints: [
      'Use a queue (add to end, take from front)',
      'The difference from DFS is where you add neighbors',
      'In OCaml, use @ to append to the end of the queue'
    ],
    hintsFr: [
      'Utilisez une file (ajoutez à la fin, prenez au début)',
      'La différence avec DFS est où vous ajoutez les voisins',
      'En OCaml, utilisez @ pour ajouter à la fin de la file'
    ]
  },
  {
    id: 'graph-has-path',
    title: 'Graph Has Path',
    titleFr: 'Existence d\'un Chemin',
    description: 'Write a function that checks if there is a path between two nodes in a directed graph.',
    descriptionFr: 'Écrivez une fonction qui vérifie s\'il existe un chemin entre deux nœuds dans un graphe orienté.',
    difficulty: 'easy',
    category: 'Graphs',
    categoryFr: 'Graphes',
    starterCode: `type graph = (int * int list) list

let neighbors g node =
  try List.assoc node g with Not_found -> []

(* Check if there's a path from src to dst *)
let has_path g src dst =
  failwith "TODO"`,
    solution: `type graph = (int * int list) list

let neighbors g node =
  try List.assoc node g with Not_found -> []

let has_path g src dst =
  let rec dfs visited node =
    if node = dst then true
    else if List.mem node visited then false
    else
      let visited = node :: visited in
      List.exists (dfs visited) (neighbors g node)
  in
  dfs [] src`,
    tests: `(* Tests *)
let g = [(1, [2; 3]); (2, [4]); (3, [5]); (4, [6]); (5, []); (6, [])]

let () =
  assert (has_path g 1 6 = true);
  assert (has_path g 1 5 = true);
  assert (has_path g 2 5 = false);
  assert (has_path g 3 6 = false);
  assert (has_path g 1 1 = true);
  print_endline "All tests passed!"`,
    hints: [
      'Use DFS or BFS to explore from the source',
      'Return true as soon as you reach the destination',
      'Track visited nodes to handle cycles'
    ],
    hintsFr: [
      'Utilisez DFS ou BFS pour explorer depuis la source',
      'Retournez true dès que vous atteignez la destination',
      'Suivez les nœuds visités pour gérer les cycles'
    ]
  },
  {
    id: 'graph-cycle',
    title: 'Detect Cycle',
    titleFr: 'Détection de Cycle',
    description: 'Write a function that detects if a directed graph contains a cycle.',
    descriptionFr: 'Écrivez une fonction qui détecte si un graphe orienté contient un cycle.',
    difficulty: 'hard',
    category: 'Graphs',
    categoryFr: 'Graphes',
    starterCode: `type graph = (int * int list) list

let neighbors g node =
  try List.assoc node g with Not_found -> []

let nodes g = List.map fst g

(* Check if the graph has a cycle *)
let has_cycle g =
  failwith "TODO"`,
    solution: `type graph = (int * int list) list

let neighbors g node =
  try List.assoc node g with Not_found -> []

let nodes g = List.map fst g

let has_cycle g =
  let rec dfs visiting visited node =
    if List.mem node visiting then true (* back edge = cycle *)
    else if List.mem node visited then false
    else
      let visiting = node :: visiting in
      if List.exists (dfs visiting visited) (neighbors g node) then true
      else false
  in
  let rec check_all visited = function
    | [] -> false
    | node :: rest ->
      if List.mem node visited then check_all visited rest
      else if dfs [] visited node then true
      else check_all (node :: visited) rest
  in
  check_all [] (nodes g)`,
    tests: `(* Tests *)
let acyclic = [(1, [2]); (2, [3]); (3, [])]
let cyclic = [(1, [2]); (2, [3]); (3, [1])]
let self_loop = [(1, [1])]
let complex = [(1, [2; 3]); (2, [4]); (3, [4]); (4, [5]); (5, [2])]

let () =
  assert (has_cycle acyclic = false);
  assert (has_cycle cyclic = true);
  assert (has_cycle self_loop = true);
  assert (has_cycle complex = true);
  print_endline "All tests passed!"`,
    hints: [
      'A cycle exists if we visit a node currently in the DFS stack',
      'Track two sets: visiting (current path) and visited (finished)',
      'Check all nodes as the graph might be disconnected'
    ],
    hintsFr: [
      'Un cycle existe si on visite un nœud actuellement dans la pile DFS',
      'Suivez deux ensembles : visiting (chemin actuel) et visited (terminé)',
      'Vérifiez tous les nœuds car le graphe peut être non connexe'
    ]
  },
  {
    id: 'graph-topological',
    title: 'Topological Sort',
    titleFr: 'Tri Topologique',
    description: 'Implement topological sort for a directed acyclic graph (DAG).',
    descriptionFr: 'Implémentez le tri topologique pour un graphe orienté acyclique (DAG).',
    difficulty: 'hard',
    category: 'Graphs',
    categoryFr: 'Graphes',
    starterCode: `type graph = (int * int list) list

let neighbors g node =
  try List.assoc node g with Not_found -> []

let nodes g = List.map fst g

(* Topological sort - returns nodes in topological order *)
let topo_sort g =
  failwith "TODO"`,
    solution: `type graph = (int * int list) list

let neighbors g node =
  try List.assoc node g with Not_found -> []

let nodes g = List.map fst g

let topo_sort g =
  let rec dfs visited order node =
    if List.mem node visited then (visited, order)
    else
      let visited = node :: visited in
      let (visited, order) =
        List.fold_left
          (fun (v, o) n -> dfs v o n)
          (visited, order)
          (neighbors g node)
      in
      (visited, node :: order)
  in
  let (_, order) =
    List.fold_left
      (fun (v, o) n -> dfs v o n)
      ([], [])
      (nodes g)
  in
  order`,
    tests: `(* Tests *)
(* DAG: 1 -> 2 -> 4
        1 -> 3 -> 4 -> 5 *)
let g = [(1, [2; 3]); (2, [4]); (3, [4]); (4, [5]); (5, [])]

let () =
  let result = topo_sort g in
  let idx x = 
    let rec f i = function [] -> -1 | h::t -> if h=x then i else f (i+1) t 
    in f 0 result 
  in
  (* In topological order, dependencies come before dependents *)
  assert (idx 1 < idx 2);
  assert (idx 1 < idx 3);
  assert (idx 2 < idx 4);
  assert (idx 3 < idx 4);
  assert (idx 4 < idx 5);
  print_endline "All tests passed!"`,
    hints: [
      'Use DFS and add nodes to result after exploring all neighbors',
      'The reverse post-order gives topological order',
      'Process all nodes in case of disconnected components'
    ],
    hintsFr: [
      'Utilisez DFS et ajoutez les nœuds au résultat après avoir exploré tous les voisins',
      'L\'ordre post inverse donne l\'ordre topologique',
      'Traitez tous les nœuds en cas de composantes non connexes'
    ]
  }
];

export const categories = [...new Set(exercises.map(e => e.category))];

export const getExerciseById = (id: string): Exercise | undefined =>
  exercises.find(e => e.id === id);

export const getExercisesByCategory = (category: string): Exercise[] =>
  exercises.filter(e => e.category === category);

export const getExercisesByDifficulty = (difficulty: Exercise['difficulty']): Exercise[] =>
  exercises.filter(e => e.difficulty === difficulty);
