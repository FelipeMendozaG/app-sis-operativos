import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ApiService } from '../services/api';

@Injectable({ providedIn: 'root' })
export class PermissionGuard implements CanActivate {
  constructor(private auth: ApiService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const required: string[] = route.data['permissions'] ?? [];
    const requireAll: boolean = route.data['requireAll'] ?? false;

    if (!this.auth.getToken()) {
      this.router.navigate(['/login']);
      return false;
    }

    if (required.length === 0) return true; // no permisos requeridos

    if (requireAll) {
      const ok = required.every(p => this.auth.hasPermission(p));
      if (!ok) this.router.navigate(['/no-access']);
      return ok;
    } else {
      const ok = required.some(p => this.auth.hasPermission(p));
      if (!ok) this.router.navigate(['/no-access']);
      return ok;
    }
  }
}
