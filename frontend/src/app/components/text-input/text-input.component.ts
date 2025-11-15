import { Component, input } from '@angular/core';
import { IconConfig, SvgIconComponent } from "../svg-icon/svg-icon.component";

@Component({
  selector: 'app-text-input',
  imports: [SvgIconComponent],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent {
  iconConfig = input.required<IconConfig>();
  placeholder = input<string>("Placeholder example");
}
