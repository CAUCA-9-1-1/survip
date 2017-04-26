import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prevention-survey-question-slider',
  templateUrl: './question-slider.component.html',
  styleUrls: ['./question-slider.component.styl']
})
export class QuestionSliderComponent implements OnInit {
  private selectedTab = 0;
  private questions = [{
    title: 'Avertisseurs de fumée',
    subTitle: 'Ajouter un nouveau détecteur',
    question: 'Quelle est son emplacement?',
    type: 'combo'
  },
  {
    title: 'Avertisseurs de fumée',
    subTitle: 'Ajouter un nouveau détecteur',
    question: 'Est-il fonctionnel ?',
    type: 'boolean'
  },
  {
    title: 'Avertisseurs de fumée',
    subTitle: 'Ajouter un nouveau détecteur',
    question: 'L\'emplacement est-il approprié ?',
    type: 'boolean'
  },
  {
    title: 'Avertisseurs de fumée',
    subTitle: 'Ajouter un nouveau détecteur',
    question: 'Est-il alimenté avec une pile ?',
    type: 'boolean'
  },
  {
    title: 'Avertisseurs de fumée',
    subTitle: 'Ajouter un nouveau détecteur',
    question: 'Est-il relié au réseau électrique du bâtiment ?',
    type: 'boolean'
  },
  {
    title: 'Avertisseurs de fumée',
    subTitle: 'Ajouter un nouveau détecteur',
    question: 'Est-il relié à une centrale ?',
    type: 'boolean'
  }];

  constructor() { }

  ngOnInit() {
  }

  next() {
    if (this.selectedTab < this.questions.length - 1) {
      this.selectedTab++;
    }
  }

  previous() {
    if (this.selectedTab > 0) {
      this.selectedTab--;
    }
  }
}
