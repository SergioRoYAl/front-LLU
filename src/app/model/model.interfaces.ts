export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface Pageable {
    sort: Sort;
    offset: number;
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
}

export interface IPage<T> {
    content: T[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: Sort;
    numberOfElements: number;
    first: boolean;
    empty: boolean;

    strSortField: string;
    strSortDirection: string;
    strFilter: string;
    strFilterTitle: string;
    strFilterDescription: string;
    nRecords: number;
}

export interface IEntity {
    id: number;
}

export interface IUser extends IEntity {
    nombre: string;
    apellidos: string;
    direccion: string;
    username: string;
    role: boolean;
    fechaNacimiento: Date;
    email: string;
}

export interface IUserPage extends IPage<IUser> {
}

export interface IProducto extends IEntity {
    nombre: string;
    descripcion: string;
    tamanyo: string;
    materiales: string;
    fechaCreacion: Date;
    color: string;
    precio: number;
}

export interface IProductoPage extends IPage<IProducto> {
}


export interface IRespuesta extends IEntity {
    id_usuario: number;
    respuesta: string;
    id_noticia: number;
}

export interface IRespuestaPage extends IPage<IRespuesta> {

}

export interface SessionEvent {
    type: string;
}

export interface IToken {
    jti: string;
    iss: string;
    iat: number;
    exp: number;
    name: string;
}

