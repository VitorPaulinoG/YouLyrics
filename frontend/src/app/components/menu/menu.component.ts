import { Component, input, signal } from '@angular/core';
import { IconConfig, SvgIconComponent } from '../svg-icon/svg-icon.component';
import { trigger, style, animate, transition } from '@angular/animations';
import { NgClass } from '@angular/common'; 

export interface MenuOption {
  iconConfig: IconConfig,
  title: string,
  action:(event: MouseEvent) => void;
}

type SharpCornerStyle = 'None' | 'Top-Right' | 'Top-Left' | 'Bottom-Right' | 'Bottom-Left';
type MenuPosition = 'Top-Left' | 'Top-Center' | 'Top-Right' | 'Bottom-Left' | 'Bottom-Center' | 'Bottom-Right';


@Component({
  selector: 'app-menu',
  imports: [SvgIconComponent, NgClass],
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
  sharpCornerStyle = input<SharpCornerStyle>('None');
  menuPosition = input<MenuPosition>('Bottom-Center');

  show = signal<boolean>(false);

  showMenu(event: MouseEvent) {
    this.show.set(true);
  }

  hideMenu(event: MouseEvent) {
    this.show.set(false);
  }

  getSharpCornerStyle(): string {
    switch (this.sharpCornerStyle()) {
      case 'None' :
        return 'rounded-lg';
      case  'Top-Left':
        return 'rounded-b-lg rounded-tr-lg';
      case 'Top-Right':
        return 'rounded-b-lg rounded-tl-lg';
      case 'Bottom-Left':
        return 'rounded-t-lg rounded-br-lg';
      case 'Bottom-Right':
        return 'rounded-t-lg rounded-bl-lg';
    }
  }

  getMenuPosition(): string {
    switch(this.menuPosition()) {
      case 'Top-Left': 
        return 'bottom-full right-0';
      case 'Top-Center': 
        return 'bottom-full left-1/2 -translate-x-1/2';
      case 'Top-Right': 
        return 'bottom-full left-0';
      case 'Bottom-Left': 
        return 'top-full right-0';
      case 'Bottom-Center': 
        return 'top-full left-1/2 -translate-x-1/2';
      case 'Bottom-Right': 
        return 'top-full left-0';
    }
  }
}
