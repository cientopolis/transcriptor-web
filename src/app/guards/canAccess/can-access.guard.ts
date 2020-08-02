import { CanAccessPipe } from '../../pipes/canAccess/can-access.pipe';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanAccessGuard implements CanActivate {
  constructor(private canAccess:CanAccessPipe){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    console.log('will call the user permissions', user);
    console.log(next.url[0].path);
    let resul = this.canAccess.transform(next.url[0].path);
    console.log(resul);
    return true;
  }
}
