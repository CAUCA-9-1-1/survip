import { Component, OnInit } from '@angular/core';

import { WindowRefService } from '../../../shared/window-ref.service';

@Component({
  selector: 'app-prevention-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.styl']
})
export class SurveyComponent implements OnInit {
  public mode = 'over';
  public align = 'end';
  public selectedTab = 0;
  public menuItems = [
  {
    name: 'building',
    title: 'Question 1',
  },
  {
    name: 'building',
    title: 'Question 2',
  },
  {
    name: 'building',
    title: 'Question 3',
  }];
  public questions = [{
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
