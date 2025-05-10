export type Users = Record<string, User>;
export type Ratings = Record<string, Rating>;
export type Movies = Record<string, Movie>;

export interface User {
  id: string;
  username: string;
  password: string;
}

export interface Rating {
  id: string;
  userId: string;
  movieId: string;
  /**
   * 1 - 5 rating
   */
  score: number;
  comment: string;
  timestamp: number;
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  /**
   * 1 - 5 rating
   */
  averageRating?: number;
  ratingCount?: number;
  totalRating?: number;
  genre: string[];
  releaseDate: number;

  ratings: string[];
}
