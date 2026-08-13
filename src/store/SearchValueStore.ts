import { create } from 'zustand';

interface SearchState {
  searchTerm: string;
  hasSearched: boolean;
  setSearchTerm: (term: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchTerm: '',
  hasSearched: false,
  setSearchTerm: (term) => set({ searchTerm: term, hasSearched: true }),
}));