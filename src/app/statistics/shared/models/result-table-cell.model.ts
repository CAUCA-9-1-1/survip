import { Objective } from './objective.model';
import { InspectionForStatistics } from './inspection-for-statistics.model';

export class ResultTableCell extends Objective {
    result: number;
    annualResult: number;
    cumulativeResult: number;

    static tableCells(
        objectives: Objective[],
        inspectionStatistics: InspectionForStatistics[] = [],
        isHighRisk: boolean)
        : ResultTableCell[] {
        const dataSource: ResultTableCell[] = [];

        let cumulativeObjective = 0;

        objectives.forEach(element => {
            let tableCell = new ResultTableCell();
            tableCell = this.fromObjectives(element);

            tableCell.result = inspectionStatistics.filter((el: InspectionForStatistics) => {
                const isCorrectYear = (new Date(el.completedOn).getFullYear() === tableCell.year);
                const isCorrectRisk = (isHighRisk && el.riskLevel > 2) || (!isHighRisk && el.riskLevel <= 2);
                return (isCorrectYear && isCorrectRisk);
            }).length;

            cumulativeObjective += tableCell.objective;

            tableCell.annualResult = tableCell.result / tableCell.objective;
            tableCell.cumulativeResult = tableCell.result / cumulativeObjective;

            dataSource.push(tableCell);
        });
        return dataSource;
    }

    static fromObjectives(objective: Objective): ResultTableCell {
        return Object.assign(new ResultTableCell(), objective);
    }

    static fromJSON(data: object): ResultTableCell {
        const resultTableCell = new ResultTableCell();
        return Object.assign(resultTableCell, data);
    }
}
