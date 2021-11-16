interface GameInfoType {
  name: string;
  image: string;
  description: string;
  cost: number;
  onSale: number;
  type: string;
}
interface GameType {
  idGame: string;
  nameGame: string;
  averageRate: string;
  numOfRate: number;
  developer: number;
  publisher: string;
  releaseDate: any;
  plaform: any;
  cost: any;
  lastestVersion: any;
  numberOfBuyer: any;
  numberOfDowloaders: any;
  discount: any;
  genres: {
    idGenreNavigation: GenreType;
  }[];
  imageGameDetail: ImageType[];
  newVersion: any;
}
interface DotInfoType {
  image: string;
  name?: string;
}
interface ImageType{
  idImage:any;
  url: any;
}
interface DiscountType {
  idDiscount: any;
  listGame: any[];
  percentDiscount: any;
  title: any;
  startDate: any;
  endDate: any;
}

interface GenreType{
  idGenre: any;
  nameGenre: any;
}

export enum ActionType {
  ADD = "add",
  REMOVE = "remove",
}

export type {ImageType, GameInfoType, DotInfoType, DiscountType, GenreType, GameType };
