import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prevention-survey',
  templateUrl: './prevention-survey.component.html',
  styleUrls: ['./prevention-survey.component.styl']
})
export class PreventionSurveyComponent implements OnInit {
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

  constructor() {
  }

  ngOnInit() {
  }

  next() {
    this.selectedTab++;
  }

  previous() {
    this.selectedTab--;
  }
}
