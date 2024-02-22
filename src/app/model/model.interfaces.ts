

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
    fecha_nacimiento: Date;
    email: string;
    noticias: number;
    respuestas: number;
    documentos: number;
}

export interface IUserPage extends IPage<IUser> {
}

export interface IProducto extends IEntity {
    nombre: string;
    descripcion: string;
    tamanyo: string;
    materiales: string;
    fecha_creacion: Date;
    color: string;
    precio: number;
    foto: string;
    tipo: string;
    visible: boolean;
}

export interface IProductoUpdate extends IEntity {
    nombre: string;
    descripcion: string;
    tamanyo: string;
    materiales: string;
    fecha_creacion: Date;
    color: string;
    precio: number;
    foto: string;
    tipo: string;
    visible: boolean;
    
}


export interface IProductoPage extends IPage<IProducto> {
}

export interface INoticia extends IEntity {
    titulo: string;
    descripcion: string;
    usuario: IUser;
    foto: string;
    visible: boolean;
}

export interface INoticiaUpdate extends IEntity {
    titulo: string;
    descripcion: string;
    usuario: { id: number};
    foto: string;
    visible: boolean;
}

export interface INoticiaPage extends IPage<INoticia> {

}

export interface IRespuesta extends IEntity {
    usuario: IUser;
    respuesta: string;
    noticia: INoticia;
}

export interface IRespuestaPage extends IPage<IRespuesta> {

}

export interface IDetallePedido extends IEntity {
    documento: IDocumento;
    producto: IProducto;
    cantidad: number;
    precio: number;
}

export interface IDetallePedidoPage extends IPage<IDetallePedido> {

}

export interface IDocumento extends IEntity {
    usuario: IUser;
    fecha_pedido: string | null;
}

export interface IDocumentoPage extends IPage<IDocumento> {

}

export interface IVisible {
    value: boolean;
    label: string;
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

export interface PaginatorState {
    page?: number;
    first?: number;
    rows?: number;
    pageCount?: number;
}

export type formOperation = 'EDIT' | 'NEW';