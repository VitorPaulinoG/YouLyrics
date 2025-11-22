import { Component, computed, effect, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { NgClass } from '@angular/common';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { IconConfig } from '../svg-icon/svg-icon.component';
import { TextInputComponent } from "../text-input/text-input.component";
import { TextualProduction } from '../../core/models/textual-production.model';
import { MenuComponent, MenuOption } from '../menu/menu.component';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-textual-production-post',
  imports: [IconButtonComponent, TextInputComponent, NgClass, MenuComponent],
  templateUrl: './textual-production-post.component.html',
  styleUrl: './textual-production-post.component.scss'
})
export class TextualProductionPostComponent {
  textualProduction = input.required<TextualProduction>();
  
  container = viewChild<ElementRef<HTMLElement>>('container');
  content = viewChild<ElementRef<HTMLElement>>('content');
  options = viewChild<ElementRef<HTMLElement>>('options');
  header = viewChild<ElementRef<HTMLElement>>('header');

  hasOverflow = computed(() => this._hasOverflow());
  private _hasOverflow = signal(false);
  
  menuOptions: MenuOption[] = [
    {
      iconConfig: {
        svgUrl: 'assets/icons/save-icon.svg',
        iconName: 'save-icon'
      },
      title: 'Save',
      action: (a) => {}
    },
    {
      iconConfig: {
        svgUrl: 'assets/icons/save-icon.svg',
        iconName: 'save-icon'
      },
      title: 'Save',
      action: (a) => {}
    },
    {
      iconConfig: {
        svgUrl: 'assets/icons/save-icon.svg',
        iconName: 'save-icon'
      },
      title: 'Save',
      action: (a) => {}
    }
  ];


  constructor() {
    effect((onCleanup) => {
      const contentEl = this.content()?.nativeElement;
      const containerEl = this.container()?.nativeElement;
      const optionsEl = this.options()?.nativeElement;
      const headerEl = this.header()?.nativeElement;

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
  

  likeButtonIconConfig: IconConfig = {
    fontIcon: 'thumb_up',
    isOutlined: true
  }

  commentIconConfig: IconConfig = {
    fontIcon: 'comment',
    isOutlined: true
  }

  shareButtonIconConfig: IconConfig = {
    fontIcon: 'share',
    isOutlined: true,
  }

  moreOptionsButtonIconConfig: IconConfig = {
    fontIcon: 'more_vert',
    isOutlined: true
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





}
