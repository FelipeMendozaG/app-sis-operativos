import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    if (!this.apiService.getToken()) {
      // El usuario no está autenticado, redirigir a la página de inicio de sesión
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.apiService.clearAuthData();
    this.router.navigate(['/login']);
  }
  marcarAsistencia() {
    alert('Asistencia marcada ✅');
  }

  misAsistencias() {
    alert('Mostrando tus asistencias 📅');
  }
}
