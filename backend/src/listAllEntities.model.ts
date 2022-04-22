export interface ISorted {
  sorting: string | null;
}

export interface IPaged {
  maxResultCount: number;
  skipCount: number;
}

export interface IFiltered {
  filter: string | null;
}


export class ListAllEntities implements ISorted, IPaged, IFiltered {
  filter: string;
  maxResultCount: number = 10;
  skipCount: number = 0;
  sorting: string | null;
}

