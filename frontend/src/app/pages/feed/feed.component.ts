import { Component, signal } from '@angular/core';
import { PostComposerComponent } from '../../components/post-composer/post-composer.component';
import { TextualProductionPostComponent } from '../../components/textual-production-post/textual-production-post.component';
import { TextualProduction } from '../../core/models/textual-production.model';
import { MenuComponent, MenuOption } from '../../components/menu/menu.component';

@Component({
  selector: 'app-feed',
  imports: [PostComposerComponent, TextualProductionPostComponent, MenuComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent {


  payload: TextualProduction[] = [
    {
      id: '5a326457-8fd4-49a7-8ed3-24ba105b152e',
      title: 'Comigo É Assim',
      author: {
        id: 'be7c63f6-4cb1-45e0-8d11-8ac2d6ddcecb',
        name: 'Emilio Santiago'
      },
      content: [
        `A nossa vida tem sido um horror
        E a culpada é só você que não me tem amor
        Se eu chego tarde, você quer brigar
        Bota a banca de infeliz, não para de falar`,
        `Já lhe avisei para tomar cuidado
        Pois você está seguindo
        Um caminho errado`,
        `Deixa, deixa de tolice
        E trate com ternura e com meiguice
        Esse seu neguinho`,
        `Pra lhe agradar, tudo já fiz
        Só pra lhe ver muito feliz
        Já estou arrependido
        Até hoje ainda não fui
        Muito compreendido`,
        `Sei que você gosta de mim
        Não sei por que me trata assim
        Deixe o gênio mau de lado
        Do contrário, entre nós, está tudo acabado`,
        `Pra lhe agradar tudo já fiz
        Só pra lhe ver muito feliz
        Já estou arrependido
        Até hoje ainda não fui
        Muito compreendido`,
        `Sei que você gosta de mim
        Não sei por que me trata assim
        Deixe o gênio mau de lado
        Do contrário, entre nós, está tudo acabado`,
        `A nossa vida tem sido um horror
        E a culpada é só você
        Que não me tem, me tem amor
        Se eu chego tarde, você quer brigar
        Bota a banca de infeliz
        Não para, para, para de falar`,
        `Já lhe avisei para tomar cuidado
        Pois você está seguindo
        Um caminho errado`,
        `Deixa, deixa de tolice
        E trate com ternura e com meiguice
        Esse seu neguinho`
      ]
    },
    {
      id: '2a326457-8fd4-49a7-8ed3-24ba105b152e',
      title: 'Comigo É Assim',
      author: {
        id: 'be7c63f6-4cb1-45e0-8d11-8ac2d6ddcecb',
        name: 'Emilio Santiago'
      },
      content: [
        `A nossa vida tem sido um horror
        E a culpada é só você que não me tem amor
        Se eu chego tarde, você quer brigar
        Bota a banca de infeliz, não para de falar`,
        `Já lhe avisei para tomar cuidado
        Pois você está seguindo
        Um caminho errado`,
        `Deixa, deixa de tolice
        E trate com ternura e com meiguice
        Esse seu neguinho`,
        `Pra lhe agradar, tudo já fiz
        Só pra lhe ver muito feliz
        Já estou arrependido
        Até hoje ainda não fui
        Muito compreendido`
      ]
    }
  ]

}
