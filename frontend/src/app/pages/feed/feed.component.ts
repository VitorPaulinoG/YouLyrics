import { Component, inject, OnInit, signal } from '@angular/core';
import { PostComposerComponent } from '../../components/post-composer/post-composer.component';
import { TextualProductionPostMasterComponent } from '../../components/textual-production-post-master/textual-production-post-master.component';
import { TextualProduction } from '../../core/models/textual-production.model';
import { MenuComponent, MenuOption } from '../../components/menu/menu.component';
import { TextualProductionService } from '../../services/textual-production.service';

@Component({
  selector: 'app-feed',
  imports: [PostComposerComponent, TextualProductionPostMasterComponent, MenuComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent implements OnInit{

  textualProductionService = inject(TextualProductionService);

  textualProductions: TextualProduction[] = [];

  ngOnInit(): void {
    this.textualProductionService.findAll().subscribe({
      next: (data) => this.textualProductions = data.content,
      error: (err) => console.log(err),
      complete: () => console.log("Finish")
    });
  }

}
