import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
@Injectable({ providedIn: 'root' })
export class PermissionGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(){
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    if(!user) { this.router.navigate(['/login']); return false }
    return true
  }
}
