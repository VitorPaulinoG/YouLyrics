import { Component, input, InputSignal, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { IconConfig, SvgIconComponent } from '../svg-icon/svg-icon.component';
@Component({
  selector: 'app-icon-button',
  imports: [MatButtonModule, MatIconModule, NgClass, SvgIconComponent],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss'
})
export class IconButtonComponent {
  text = input<string>('click');
  iconConfig = input.required<IconConfig>();
  click = output<MouseEvent>();
}
