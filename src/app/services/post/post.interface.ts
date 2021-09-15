/* eslint-disable @typescript-eslint/naming-convention */

import { FileUploadResult } from '@ionic-native/file-transfer/ngx';
import { IUsuario } from '../user/user.interface';

export interface PostsResponse {
    ok:     boolean;
    pagina: number;
    posts:  PostsData;
}

export interface PostsData {
    data:   IPost[];
    length: number;
}

export interface IPost {
    img?:     string[];
    _id?:     string;
    mensaje?: string;
    coords?:  string;
    usuario?: IUsuario;
    created?: Date;
}

export interface IPostReponse{
  ok:   boolean;
  post: IPost;
}

export interface IFileTransferResult {
  ok:         boolean;
  response?:  FileUploadResult;
  error?:     any;
}
