import { Component, ElementRef, input, viewChild } from '@angular/core';
import { TextualProduction } from '../../core/models/textual-production.model';

@Component({
  selector: 'app-textual-production-main-content',
  imports: [],
  templateUrl: './textual-production-main-content.component.html',
  styleUrl: './textual-production-main-content.component.scss'
})
export class TextualProductionMainContentComponent {
  textualProduction = input.required<TextualProduction>();

  content = viewChild<ElementRef<HTMLElement>>('content');
  header = viewChild<ElementRef<HTMLElement>>('header');

  goToAuthorPage(event: MouseEvent) {
    console.log(`[ info ] - Going to ${this.textualProduction().author.name}'s page ('/author/${this.textualProduction().author.id}')`);
  }
}
