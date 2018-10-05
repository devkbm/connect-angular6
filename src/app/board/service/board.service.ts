import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from '../../common/service/data.service';
import { ResponseObject } from '../../common/model/response-object';
import { ResponseList } from '../../common/model/response-list';

import { Board } from '../model/board';
import { Article } from '../model/article';
import { BoardHierarchy } from '../model/board-hierarchy';

@Injectable()
export class BoardService extends DataService {

    constructor(http: HttpClient) {
        super('http://localhost:8090/grw', http);
    }

    getBoardList(): Observable<ResponseList<Board>> {
        const url = `${this.API_URI}/boards`;
        return this.http.get<ResponseList<Board>>(url, {headers: this.getAuthorizedHttpHeaders()}).pipe(
            map(this.responseMap),
            catchError((err) => Observable.throw(err))
        );
    }

    getBoard(id: number): Observable<ResponseObject<Board>> {
        const url = `${this.API_URI}/boards/${id}`;
        console.log(this.getHttpHeaders());
        return this.http.get<ResponseObject<Board>>(url, {headers: this.getAuthorizedHttpHeaders()}).pipe(
            map(this.responseMap),
            catchError((err) => Observable.throw(err))
        );
    }

    getBoardHierarchy(): Observable<ResponseList<BoardHierarchy>> {
        const url = `${this.API_URI}/boardHierarchy`;
        console.log(this.getHttpHeaders());
        return this.http.get<ResponseList<BoardHierarchy>>(url, {headers: this.getAuthorizedHttpHeaders()}).pipe(
            map(this.responseMap),
            catchError((err) => Observable.throw(err))
        );
    }

    saveBoard(board: Board): Observable<ResponseObject<Board>> {
        const url = `${this.API_URI}/boards/${board.pkBoard}`;

        return this.http
            .post<ResponseObject<Board>>(url, board, {headers: this.getAuthorizedHttpHeaders()}).pipe(
            map(this.responseMap),
            catchError((err) => Observable.throw(err))
        );
    }

    deleteBoard(board: Board): Observable<ResponseObject<Board>> {
        const url = `${this.API_URI}/boards/${board.pkBoard}`;

        return this.http
            .delete<ResponseObject<Board>>(url, {headers: this.getAuthorizedHttpHeaders()}).pipe(
            map(this.responseMap),
            catchError((err) => Observable.throw(err))
        );
    }

    getArticleList(fkBoard: string, title?: string, contents?: string): Observable<ResponseList<Article>> {
        let url = `${this.API_URI}/boards/${fkBoard}/articles`;

        if ( title !== undefined ) {
            url = url + '&title=' + title;
        }

        if ( contents !== undefined ) {
            url = url + '&contents=' + contents;
        }

        return this.http.get<ResponseList<Article>>(url, {headers: this.getAuthorizedHttpHeaders()}).pipe(
            map(this.responseMap),
            catchError((err) => Observable.throw(err))
        );
    }

    getArticle(id: number): Observable<ResponseObject<Article>> {
        const url = `${this.API_URI}/boards/articles/${id}`;
        return this.http.get<ResponseObject<Article>>(url, {headers: this.getAuthorizedHttpHeaders()}).pipe(
            map(this.responseMap),
            catchError((err) => Observable.throw(err))
        );
    }

    saveArticle(article: Article): Observable<ResponseObject<Article>> {
        const url = `${this.API_URI}/boards/articles`;

        const formData = new FormData();

        if (article.pkArticle !== undefined ) {
            formData.append('pkArticle',    article.pkArticle.toString());
        }

        formData.append('fkBoard',      String(article.fkBoard));
        // formData.append('ppkArticle',   article.ppkArticle.toString());
        formData.append('title',        article.title);
        formData.append('contents',     article.contents);
        formData.append('pwd',          article.pwd);
        formData.append('hitCnt',       article.hitCnt);
        formData.append('fromdDt',      article.fromdDt);
        formData.append('toDt',         article.toDt);
        // formData.append('seq',          String(article.seq));
        // formData.append('depth',        String(article.depth));
        if ( article.file !== undefined ) {
            formData.append('file',         article.file, article.file.name);
        }

        console.log(formData);

        return this.http
            .post<ResponseObject<Article>>(url, formData, {headers: this.getAuthorizedMultiPartHeaders()}).pipe(
            map(this.responseMap),
            catchError((err) => Observable.throw(err))
            );
    }

    downloadFile(fileId: string, fileName: string) {
        const url = `http://localhost:8090/file/${fileId}`;

        this.http.get(url, {headers: this.getAuthorizedMultiPartHeaders(), responseType: 'blob'})
        .subscribe(
            (model: Blob) => {

                // const blob = new Blob([model], { type: 'application/octet-stream' });

                // FileSaver.saveAs(blob, fileName);
              },
              (err) => {
                console.log(err);
              },
              () => {
                console.log('완료');
              }
            );
    }


}
