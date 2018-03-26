import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { UserService } from '../../users/user.service';

@Injectable()
export class SupervisorGuard implements CanActivate {

  constructor(private userService: UserService,
              private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userService.getCurrent()
      .then(
        (user: any) => {
          let indexSupervisor = user.roles.indexOf('Supervisor');
          let indexAdmin = user.roles.indexOf('Administrator');
          if (indexAdmin !== -1 || indexSupervisor !== -1) {
            return true;
          } else {
            this.router.navigate(['/dashboard']);
            return false;
          }
        }
      ).catch(
        (error: any) => {
          console.error(error);
          this.router.navigate(['/dashboard']);
          return false;
        }
      );
  }
  isSupervisor() {
    return this.userService.getCurrent()
      .then(
        (user: any) => {
          let indexSupervisor = user.roles.indexOf('Supervisor');
          if (indexSupervisor !== -1) {
            return true;
          } else {
            return false;
          }
        }
      ).catch(
        (error: any) => {
          console.error(error);
          return false;
        }
      );
  }
}
