import {WithLocalization} from '../../../shared/models/with-localization';


export class UnitOfMeasure extends WithLocalization {
    abbreviation: string;
    measureType: string;

    static fromJSON(data: object): UnitOfMeasure {
        const unit = new UnitOfMeasure();

        return Object.assign(unit, data);
    }
}
