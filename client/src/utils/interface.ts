export interface citationState {
  data: Citation[] | [];
  singleCitation: Citation | Kaamelott1 | Favorite | null;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}
export interface Kaamelott1 {
  id?: number;
  citation: string;
  personnage: string;
  episode: string;
}
export interface Kaamelott {
  status: number;
  citation: {
    citation: string;
    infos: {
      auteur: string;
      acteur: string;
      personnage: string;
      saison: string;
      episode: string;
    };
  };
}
export interface Citation {
  id: number;
  personnage?: string;
  episode?: string;
  citation: string;
  created_at: Date;
}

export interface IEditCitation {
  id: number;
  citation: string;
}
export interface IFavorite {
  citation: string;
  episode: string;
  personnage: string;
}

export interface Favorite {
  id: number;
  citation: string;
  episode: string;
  personnage: string;
  created_at: Date;
}

export interface favoriteState {
  data: Favorite[] | [];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}
