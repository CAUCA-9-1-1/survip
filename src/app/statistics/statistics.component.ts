import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
    colors = {
        visites: ['#447bdd', '#ff8a2f', '#fd9e54', '#c4c4c4'],
        resultats: ['#ffff0a', '#447bdd'],
    };

    visites: any = [{
        description: 'Nombre de réponse avec succès',
        total: 128,
    }, {
        description: 'Nombre de visite avec absence',
        total: 27,
    }, {
        description: 'Nombre d\'accroche porte répondu',
        total: 32,
    }, {
        description: 'Nombre d\'inspection refusée',
        total: 11,
    }];

    resultats: any = [{
        description: 'Objectif',
        total: 270
    }, {
        description: 'Réponses',
        total: 128
    }];

    constructor() { }

    ngOnInit() {
    }

    showPourcent(arg: any) {
        return {
            text: arg.argumentText + '<br/><b>' + arg.percentText + '</b>'
        };
    }

    showTooltip(arg: any) {
        return {
            text: arg.argumentText + '<br/><b>' + arg.valueText + '</b>'
        };
    }

    customizePieLabel = (arg: any) => {
        return arg.valueText + ' (' + arg.percentText + ')';
    }

    customizeBarLabel = (arg: any) => {
        return {
            visible: true,
            backgroundColor: '#666',
            customizeText: function (e: any) {
                return e.valueText;
            }
        };
    }
}
