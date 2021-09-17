interface GameInfoType {
  name: string;
  image: string;
  description: string;
  cost: number;
  onSale: number;
  type: string;
}

interface DotInfoType {
  image: string;
  name?: string;
}

export enum ActionType {
  ADD = 'add',
  REMOVE = 'remove',
}

export type { GameInfoType, DotInfoType };
