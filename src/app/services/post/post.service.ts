import { Injectable } from '@angular/core';
import ApiRestService from '../api-rest/api-rest.service';
import { from, Observable, of, Subject } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import RequestTypes from '../api-rest/api-rest.constants';
import PostRoutes from './post.constants';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { IPostReponse, PostsResponse, IPost, IFileTransferResult } from './post.interface';
import StorageService from '../utils/storage.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export default class PostService {

  private pagina = 0;
  private startEndoint = 'post';
  private post$ = new Subject<IPost>();

  constructor(
    private apiService: ApiRestService,
    private storageService: StorageService,
    private fileTransfer: FileTransfer
  ) { }

  public resetService(){
    this.pagina = 0;
  }

  public getPosts(pagina?: number): Observable<PostsResponse> {
    this.pagina = pagina ?? this.pagina + 1;
    const params = new HttpParams().set('pagina', `${this.pagina}`);
    return this.apiService.request<PostsResponse>(RequestTypes.get, this.endpoint(PostRoutes.getPosts), null, {params});
  }

  public createPost(postData: any){
    return this.storageService.get('token').pipe(
      switchMap((token) => {
        const headers = new HttpHeaders().set('x-token', token);
        return this.apiService.request<IPostReponse>(RequestTypes.post, this.endpoint(PostRoutes.createPost), postData, {headers}).pipe(
          tap(({post}) => this.post$.next(post))
        );
      })
    );
  }

  public getImage(idUser: string, imgName: string){
    const route = PostRoutes.getImage
                                    .replace(':idUser', idUser)
                                    .replace(':imgName', imgName);
    return this.apiService.request<any>(RequestTypes.get, this.endpoint(route));
  }

  public uploadImages(img: string): Observable<IFileTransferResult>{
    return this.storageService.get('token').pipe(
      switchMap((token) => {
        const options: FileUploadOptions = {
          fileKey: 'imagen',
          headers: {
            'x-token' : token
          }
        };
        const fileTransfer: FileTransferObject = this.fileTransfer.create();
        return from(fileTransfer.upload(img, `${environment.host}/${this.startEndoint}/${PostRoutes.uploadImages}`, options)).pipe(
          switchMap((response) =>  of({ok: true, response})),
          catchError((error) => of({ok: false, error}))
        );
      })
    );
  }

  public getPost(){
    return this.post$.asObservable();
  }

  private endpoint(route: string) {
    return `${this.startEndoint}/${route}`;
  }


}
