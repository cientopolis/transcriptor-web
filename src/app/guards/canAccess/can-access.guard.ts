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
    return this.canAccess.transform(next.url[0].path);
    
  }
}
