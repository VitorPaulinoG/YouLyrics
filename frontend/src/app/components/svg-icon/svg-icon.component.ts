import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

type SvgIconConfig = {
  svgUrl: string;  
  iconName: string;
  fontIcon?: never;
  isOutlined?: boolean;
}

type FontIconConfig = {
  fontIcon: string;
  isOutlined: boolean;
  svgUrl?: never;
  iconName?: never;
}

export type IconConfig = SvgIconConfig | FontIconConfig;

@Component({
  selector: 'app-svg-icon',
  imports: [MatIconModule, NgClass],
  templateUrl: './svg-icon.component.html',
  styleUrl: './svg-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class':'flex flex-row items-center' 
  }
})
export class SvgIconComponent implements OnChanges{
  
  @Input('class') class: string = "";

  iconConfig = input.required<IconConfig>();

  private iconRegistry = inject(MatIconRegistry);
  private sanitizer = inject(DomSanitizer);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['iconConfig'] && this.iconConfig().svgUrl) {
      this.iconRegistry.addSvgIcon(
        this.iconConfig().iconName!,
        this.sanitizer.bypassSecurityTrustResourceUrl(this.iconConfig().svgUrl!)
      );
    }
  }
}
