import { AfterViewChecked, Component, input } from '@angular/core';
import { IconConfig, SvgIconComponent } from "../svg-icon/svg-icon.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-text-input',
  imports: [SvgIconComponent, NgClass],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent {
  iconConfig = input.required<IconConfig>();
  isRounded = input<boolean>(true);
  placeholder = input<string>("Placeholder example");

}
