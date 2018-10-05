import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from '../service/data.service';

import { ResponseObject } from '../model/response-object';
import { ResponseList } from '../model/response-list';
import { MenuGroup } from '../model/menu-group';
import { Menu } from '../model/menu';
import { MenuHierarchy } from '../model/menu-hierarchy';

@Injectable()
export class MenuService extends DataService {

  constructor(http: HttpClient) {
    super('http://localhost:8090/menugroup', http);
  }

  getMenuGroupList(): Observable<ResponseList<MenuGroup>> {
    const url = `${this.API_URI}`;
    return this.http
              .get<ResponseList<MenuGroup>>(url, {headers: this.getAuthorizedHttpHeaders()})
              .pipe(
                catchError((err) => Observable.throw(err))
              );
  }

  getMenuGroup(id: string): Observable<ResponseObject<MenuGroup>> {
    const url = `${this.API_URI}/${id}`;
    return this.http
              .get<ResponseObject<MenuGroup>>(url, {headers: this.getAuthorizedHttpHeaders()})
              .pipe(
                catchError((err) => Observable.throw(err))
              );
  }

  registerMenuGroup(menuGroup: MenuGroup): Observable<ResponseObject<MenuGroup>> {
    const url = this.API_URI + '/' + menuGroup.menuGroupCode;
    return this.http
              .post<ResponseObject<MenuGroup>>(url, menuGroup, {headers: this.getAuthorizedHttpHeaders()})
              .pipe(
                catchError((err) => Observable.throw(err))
              );
  }

  getMenu(menu: Menu): Observable<ResponseObject<Menu>> {
    const url = `${this.API_URI}/${menu.menuGroupCode}/menu/${menu.menuCode}`;
    return this.http
              .get<ResponseObject<Menu>>(url, {headers: this.getAuthorizedHttpHeaders()})
              .pipe(
                catchError((err) => Observable.throw(err))
              );
  }

  getMenuList(menuGroupCode: String): Observable<ResponseList<Menu>> {
    const url = `${this.API_URI}/${menuGroupCode}/menu`;
    return this.http
              .get<ResponseList<Menu>>(url, {headers: this.getAuthorizedHttpHeaders()})
              .pipe(
                catchError((err) => Observable.throw(err))
              );
  }

  registerMenu(menu: Menu): Observable<ResponseObject<Menu>> {
    const url = `${this.API_URI}/${menu.menuGroupCode}/menu/${menu.menuCode}`;
    return this.http
              .post<ResponseObject<Menu>>(url, menu, {headers: this.getAuthorizedHttpHeaders()})
              .pipe(
                catchError((err) => Observable.throw(err))
              );
  }

  getMenuHierarchy(menuGroupCode: String): Observable<ResponseList<MenuHierarchy>> {
    const url = `http://localhost:8090/menuhierarchy/${menuGroupCode}`;
    return this.http
              .get<ResponseList<MenuHierarchy>>(url, {headers: this.getAuthorizedHttpHeaders()})
              .pipe(
                catchError((err) => Observable.throw(err))
              );
  }

}
