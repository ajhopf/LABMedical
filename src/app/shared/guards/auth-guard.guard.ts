import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from "../services/authentication.service";
import { LocalStorageService } from "../services/local-storage.service";
import { ConfirmationService } from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown> {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authenticationService.isAuthenticated()) {
      return true
    } else {
      this.router.navigate(['/'])
      return false
    }
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (confirm('Você está prestes a sair da área logada, deseja continuar?')) {
      localStorage.removeItem('userId')
      return true;
    } else {
      return false
    }
  }
}
