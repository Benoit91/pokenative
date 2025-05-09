import { Colors } from "@/constants/Colors";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

// Point d'entrée pour l'API PokéAPI
const endpoint = "https://pokeapi.co/api/v2"

// Typage des endpoints disponibles dans l'application
type API = {
  // Liste des pokémons paginée
  '/pokemon?limit=21': {
    count: number,
    next: string | null,
    results: { name: string, url: string }[];
  };

  // Détail d’un Pokémon spécifique par ID ou nom
  '/pokemon/[id]': {
    id: number;
    name: string;
    url: string;
    weight: number;
    height: number;
    moves: { move: { name: string } }[];
    stats: {
      name: string;
    };
  }[];

  // Données audio (cries) — non utilisé ici, défini pour complétude
  cries: {
    latest: string;
  };

  // Liste des types associés à un Pokémon
  types: {
    type: {
      name: keyof (typeof Colors)["type"];
    };
  }[];

  // Données additionnelles (flavor text, langue, etc.)
  '/pokemon-species/[id]': {
    flavor_text_entries: {
      flavor_text: string;
      language: {
        name: string;
      }
    }[]
  }
};

/**
 * Hook générique pour interroger un endpoint de l'API avec React Query
 * @param path Chemin de l’API avec placeholders (ex: /pokemon/[id])
 * @param params Paramètres à insérer dans le path (ex: { id: 1 })
 */
export function useFetchQuery<T extends keyof API>(path: T, params?: Record<string, string | number>) {
  // Construit l'URL en remplaçant les placeholders [clé] par leurs valeurs
  const localUrl = endpoint + Object.entries(params ?? {}).reduce(
    (acc, [key, value]) => acc.replaceAll(`[${key}]`, value), path
  );

  return useQuery({
    queryKey: [localUrl], // Clé unique pour le cache React Query
    queryFn: async () => {
      await wait(0.5); // Délai artificiel de 500ms pour simuler un chargement
      return fetch(localUrl, {
        headers: { Accept: 'application/json' }
      }).then(r => r.json() as Promise<API[T]>)
    }
  });
}

/**
 * Hook pour gérer une liste paginée (infinite scroll) de résultats
 * @param path Endpoint paginé (par ex. "/pokemon?limit=21")
 */
export function useInfiniteFetchQuery<T extends keyof API>(path: T) {
  return useInfiniteQuery({
    queryKey: [path],
    initialPageParam: `${endpoint}${path}`, // Première URL de la pagination
    queryFn: async ({ pageParam }) => {
      await wait(0.5); // Délai artificiel
      return fetch(pageParam, {
        headers: { Accept: "application/json" },
      }).then(r => r.json() as Promise<API[T]>);
    },
    // Détermine l’URL de la page suivante
    getNextPageParam: (lastPage) => {
      if ("next" in lastPage && lastPage.next) {
        return lastPage.next;
      }
      return null;
    },
  });
}

/**
 * Hook de recherche directe d’un Pokémon par ID ou nom
 * @param query Nom ou ID du Pokémon (ex: "pikachu" ou "25")
 */
export function useSearchPokemon(query: string) {
  return useQuery({
    enabled: !!query, // Ne s’active que si une recherche est saisie
    queryKey: ["search", query.toLowerCase()],
    queryFn: async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
      if (!res.ok) throw new Error("Not found");
      const data = await res.json();
      return {
        id: data.id,
        name: data.name
      };
    }
  });
}

/**
 * Petite fonction utilitaire pour simuler un délai
 * @param duration Durée en secondes
 */
function wait(duration: number) {
  return new Promise(resolve => setTimeout(resolve, duration * 1000));
}
