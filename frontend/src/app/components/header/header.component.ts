import { Component } from '@angular/core';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { SvgIconComponent } from '../svg-icon/svg-icon.component'; 

@Component({
  selector: 'app-header',
  imports: [SearchBarComponent, SvgIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
