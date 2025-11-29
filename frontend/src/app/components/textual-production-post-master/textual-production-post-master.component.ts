import { Component, computed, effect, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { NgClass } from '@angular/common';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { TextInputComponent } from "../text-input/text-input.component";
import { TextualProduction } from '../../core/models/textual-production.model';
import { MenuComponent, MenuOption } from '../menu/menu.component';
import { MatDialog } from '@angular/material/dialog';
import { TextualProductionMainContentComponent } from '../textual-production-main-content/textual-production-main-content.component';
import { TextualProductionPostDetailComponent } from '../textual-production-post-detail/textual-production-post-detail.component';

@Component({
  selector: 'app-textual-production-post-master',
  imports: [IconButtonComponent, TextInputComponent, NgClass, MenuComponent, TextualProductionMainContentComponent],
  templateUrl: './textual-production-post-master.component.html',
  styleUrl: './textual-production-post-master.component.scss'
})
export class TextualProductionPostMasterComponent {
  textualProduction = input.required<TextualProduction>();
  
  container = viewChild<ElementRef<HTMLElement>>('container');
  mainContent = viewChild(TextualProductionMainContentComponent);
  options = viewChild<ElementRef<HTMLElement>>('options');
  
  hasOverflow = computed(() => this._hasOverflow());

  menuOptions: MenuOption[] = [
    {
      iconConfig: {
        fontIcon: 'bookmark_add',
        isOutlined: true,
        roundedBackground: true
      },
      title: 'Save',
      action: (a) => {}
    },
    {
      iconConfig: {
        fontIcon: 'info',
        isOutlined: true,
        roundedBackground: true
      },
      title: 'Details',
      action: (event: MouseEvent) => {
        this.openDetails();
      }
    },
    {
      iconConfig: {
        fontIcon: 'link',
        isOutlined: true,
        roundedBackground: true
      },
      title: 'Copy Link',
      action: (a) => {}
    }
  ];

  private _hasOverflow = signal(false);
  dialog = inject(MatDialog);
  
  constructor() {
    effect((onCleanup) => {
      const containerEl = this.container()?.nativeElement;
      const optionsEl = this.options()?.nativeElement;
      const contentEl = this.mainContent()?.content()?.nativeElement;
      const headerEl = this.mainContent()?.header()?.nativeElement;

      if (!contentEl || !containerEl || !optionsEl || !headerEl)
        return;

      const observer = new ResizeObserver(() => {
        const isOverflowing = contentEl.scrollHeight > containerEl.clientHeight - (optionsEl.clientHeight + headerEl.clientHeight);
        
        this._hasOverflow.set(isOverflowing);
      });

      observer.observe(contentEl);
      observer.observe(containerEl);

      onCleanup(() => observer.disconnect());
    });
  }

  onLikeClick(event: MouseEvent) {
    console.log("[ info ] - Like added");
  }
  
  onShareClick(event: MouseEvent) {
    console.log("[ info ] - Shared");
  }

  goToAuthorPage(event: MouseEvent) {
    console.log(`[ info ] - Going to ${this.textualProduction().author.name}'s page ('/author/${this.textualProduction().author.id}')`);
  }

  openDetails() {
    this.dialog.open(TextualProductionPostDetailComponent, {
      panelClass: 'modal-sem-bordas',
      width: 'auto',
      height: 'auto',
      maxHeight: '45rem',
      maxWidth: '74rem',
      autoFocus: false,
      data: this.textualProduction()
    });
  }

}
