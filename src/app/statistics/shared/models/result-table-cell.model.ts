import { Objective } from './objective.model';
import { InspectionForStatistics } from './inspection-for-statistics.model';

export class ResultTableCell extends Objective {
    value: number;

    static tableCell(objective: Objective, inspectionStatistics: InspectionForStatistics[]): ResultTableCell {
        let tableCell = new ResultTableCell();
        tableCell = this.fromObjectives(objective);

        if (inspectionStatistics) {
            tableCell.value = inspectionStatistics.filter((el) => {
                return (el.createOn.getFullYear() === tableCell.year);
            }).length;
        } else {
            tableCell.value = 0;
        }

        return tableCell;
    }

    static fromObjectives(objective: Objective): ResultTableCell {
        return Object.assign(new ResultTableCell(), objective);

    }

    static fromJSON(data: object): ResultTableCell {
        const resultTableCell = new ResultTableCell();
        return Object.assign(resultTableCell, data);
    }
}
