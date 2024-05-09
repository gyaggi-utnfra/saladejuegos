import { Component } from '@angular/core';
import { AuthService } from '../../../../app/core/services/auth.service';
import { UtilsService } from '../../../../app/core/services/utils.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  verNavLink: boolean = true;
  showInfoBox: boolean = false;

  toggleInfoBox(): void {
    this.showInfoBox = !this.showInfoBox;
  }
  constructor(public authSrv: AuthService, private utilsSrv: UtilsService) {}

  ngOnInit() {}
  mostrarNavLink() {
    this.verNavLink = !this.verNavLink;
  }

  logout() {
    this.authSrv.logout().then(() => {
      this.toggleInfoBox();
      this.utilsSrv.routerLink('/login');
    });
  }
}