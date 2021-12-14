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
  numberOfBuyers: any;
  numberOfDowloaders: any;
  discount: any;
  genres: {
    idGenreNavigation: GenreType;
  }[];
  imageGameDetail: ImageType[];
  newVersion: any;
  urlVideo: string;
}

interface CollectionType {
  game: GameType;
  isInstalled: any;
}

interface gameCollection {
  averageRate: number;
  cost: number;
  developer: string;
  discount: any;
  genres: {
    idGenreNavigation: {
      idGenre: string;
      nameGenre: string;
    };
  }[];
  idGame: string;
  imageGameDetail: {
    idImage: string;
    url: string;
  }[];
  lastestVersion: string;
  nameGame: string;
  newVersion: any;
  numberOfRare: number;
  numberOfBuyer: number;
  numberOfDowloaders: number;
  plaform: string;
  publisher: string;
  releaseDate: string;
}

interface GameVersionType {
  idGameVersion: string;
  idGame: string;
  versionGame: string;
  dateUpdate: Date;
  urlDownload: string;
  shortDescription: string;
  descriptions: string;
  requires: string;
  os: string;
  processor: string;
  storage: string;
  dirextX: string;
  graphics: string;
  privacyPolicy: string;
}
interface DotInfoType {
  image: string;
  // name?: string;
}
interface ImageType {
  idImage: any;
  url: any;
}
interface DiscountType {
  idDiscount: any;
  listGame?: any[];
  percentDiscount: any;
  title: any;
  startDate: any;
  endDate: any;
}

interface GenreType {
  idGenre: any;
  nameGenre: any;
}

interface UserType {
  idUser: any;
  userName: string;
  password: string;
  realName: any;
  email: string;
  numberPhone: string;
  avatar: any;
  background: any;
}

interface Imgs {
  url: string;
}

interface FormRegisterType {
  username: string;
  password: string;
  email: string;
}

interface GameDetailss {
  idGame: string;
  nameGame: string;
  averageRate: number;
  cost: number;
  developer: string;
  publisher: string;
  plaform: string;
  privacyPolicy: string;
  urlVideo: string;
  releaseDate: string;
  lastestVersion: string;
  numberOfBuyer: number;
  numberOfDowloaders: number;
  numOfRate: number;
  discount: {
    idDiscount: string;
    title: string;
    percentDiscount: number;
    startDate: string;
    endDate: string;
  };
  genres: {
    idGenreNavigation: {
      idGenre: string;
      nameGenre: string;
    };
  }[];
  imageGameDetail: ImageGameDetail[];
  newVersion: {
    idGameVersion: string;
    idGame: string;
    versionGame: string;
    dateUpdate: string;
    urlDownload: string;
    shortDescription: string;
    descriptions: string;
    requires: string;
    os: string;
    processor: string;
    storage: string;
    directX: string;
    graphics: string;
    privacyPolicy: string;
    memory: string;
    filePlay: string;
  };

}

interface ImageGameDetail {
  idImage: string;
  url: string;
}

interface CommentType {
  idComment: string;
  idGame: string;
  idUser: string;
  content: string;
  likes: number;
  dislike: number;
  time: Date;
  star: number;
  userName: any;
  avatar: string;
}

interface SuggestionType {
  idSuggestion: string;
  title: string;
  value: string;
  position: number;
}

export enum ActionType {
  ADD = 'add',
  REMOVE = 'remove',
}

export type {
  ImageType,
  GameInfoType,
  DotInfoType,
  DiscountType,
  GenreType,
  GameType,
  UserType,
  GameVersionType,
  Imgs,
  GameDetailss,
  CommentType,
  SuggestionType,
  FormRegisterType,
  CollectionType,
  gameCollection,
};
