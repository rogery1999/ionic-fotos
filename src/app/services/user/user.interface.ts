/* eslint-disable @typescript-eslint/naming-convention */
export interface IUsuario {
    avatar?: string;
    _id?:    string;
    nombre?: string;
    email?:  string;
}

export interface AuthResponse {
    ok:    boolean;
    token: string;
}

export interface IUserInfoResponse {
    ok:      boolean;
    usuario: IUsuario;
}
