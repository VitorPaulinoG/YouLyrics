import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { IconConfig, SvgIconComponent } from '../svg-icon/svg-icon.component';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-icon-button',
  imports: [MatButtonModule, MatIconModule, NgClass, SvgIconComponent, RouterLink],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss'
})
export class IconButtonComponent {
  text = input<string>('click');
  iconConfig = input.required<IconConfig>();
  click = output<MouseEvent>();
}
