import { Component, inject, input, viewChild } from '@angular/core';
import { TextualProductionMainContentComponent } from "../textual-production-main-content/textual-production-main-content.component";
import { TextualProduction } from '../../core/models/textual-production.model';
import { MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { TextInputComponent } from '../text-input/text-input.component';
import { IconButtonComponent } from "../icon-button/icon-button.component";
import { MenuComponent } from "../menu/menu.component";
import { SvgIconComponent } from '../svg-icon/svg-icon.component'; 

@Component({
  selector: 'app-textual-production-post-detail',
  imports: [TextualProductionMainContentComponent, TextInputComponent, IconButtonComponent, MenuComponent, SvgIconComponent],
  templateUrl: './textual-production-post-detail.component.html',
  styleUrl: './textual-production-post-detail.component.scss'
})
export class TextualProductionPostDetailComponent {
  textualProduction = inject<TextualProduction>(MAT_DIALOG_DATA, { optional: true });
  
  onLikeClick(event: MouseEvent) {
    console.log("[ info ] - Like added");
  }
  
  onShareClick(event: MouseEvent) {
    console.log("[ info ] - Shared");
  }

  onSaveClick(event: MouseEvent) {
    
  }

}
