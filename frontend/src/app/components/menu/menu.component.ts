import { Component, input, signal } from '@angular/core';
import { IconConfig, SvgIconComponent } from '../svg-icon/svg-icon.component';
import { trigger, style, animate, transition } from '@angular/animations';

export interface MenuOption {
  iconConfig: IconConfig,
  title: string,
  action:(event: MouseEvent) => void;
}

@Component({
  selector: 'app-menu',
  imports: [SvgIconComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  host: {
    'class': 'w-min h-min'
  },
  animations: [
    trigger('menuAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px) scale(0.95)' }), 
        animate('150ms ease-out', 
          style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ]),
      transition(':leave', [
        animate('100ms ease-in', 
          style({ opacity: 0, transform: 'translateY(10px) scale(0.95)' }))
      ])
    ])
  ]
})
export class MenuComponent {
  menuOptions = input.required<MenuOption[]>();

  show = signal<boolean>(false);

  showMenu(event: MouseEvent) {
    this.show.set(true);
  }

  hideMenu(event: MouseEvent) {
    this.show.set(false);
  }
}
