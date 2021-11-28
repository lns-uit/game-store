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
}
interface GameVersionType{
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

interface UserType{
  idUser:string;
  userName:string;
  password:string;
  realName:string;
  email:string;
  numberPhone:string;
  avatar: any;
  background: any;
}

interface Imgs{
  url: string;
}

interface GameDetailss{
  idGame: string,
  nameGame: string,
  averageRate: number,
  cost: number;
  developer: string,
  publisher: string,
  plaform: string,
  releaseDate: string,
  lastestVersion: string,
  numberOfBuyer: number,
  numberOfDowloaders: number,
  numOfRate: number,
  discount: {
    idDiscount: string,
    title: string,
    percentDiscount: number,
    startDate: string,
    endDate: string
  },
  genres: {
    idGenreNavigation:{
      idGenre: string,
      nameGenre: string
    }
  }[],
  imageGameDetail: {
    idImage: string,
    url: string
  }[],
  newVersion:{
    idGameVersion: string,
    idGame: string,
    versionGame: string,
    dateUpdate: string,
    urlDownload: string,
    shortDescription: string,
    descriptions: string,
    requires: string,
    os: string,
    processor: string,
    storage: string,
    directX: string,
    graphics: string,
    privacyPolicy: string,
    memory: string
  }
}

interface CommentType{
  idComment: string;
  idGame: string;
  idUser: string;
  content: string;
  likes: number;
  dislike: number;
  time: Date;
  rate: number;
  userName: string;
  avatar: string;
}
 
export enum ActionType {
  ADD = "add",
  REMOVE = "remove",
}

export type {CommentType, ImageType, GameInfoType, DotInfoType, DiscountType, GenreType, GameType ,UserType, GameVersionType, Imgs, GameDetailss};
