import { Component, inject } from '@angular/core';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { MenuComponent, MenuOption } from "../menu/menu.component"; 
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [SearchBarComponent, SvgIconComponent, MenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);
  
  menuOptions: MenuOption[] = [
    {
      iconConfig: {
        fontIcon: 'account_circle',
        isOutlined: true,
        roundedBackground: true
      },
      title: 'Profile',
      action: (a) => {}
    },
    {
      iconConfig: {
        fontIcon: 'logout',
        isOutlined: true,
        roundedBackground: true
      },
      title: 'Logout',
      action: (a) => { 
        this.onLogoutClick(); 
      }
    }
  ];

  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  get userDisplayName() {
    return this.authService.userDisplayName() ?? 'Minha conta';
  }

  onLoginClick() {
    void this.authService.login();
  }
  
  onLogoutClick() {
    void this.authService.logout();
  }
}
