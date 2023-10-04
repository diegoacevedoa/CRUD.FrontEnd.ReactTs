export interface IBasePersona {
  noDocumento: string;
  nombres: string;
  apellidos: string;
}

export interface ICreatePersona extends IBasePersona {}

export interface IUpdatePersona extends IBasePersona {
  idPersona: number;
}

export interface IDataPersona extends IBasePersona {
  idPersona: number;
}
