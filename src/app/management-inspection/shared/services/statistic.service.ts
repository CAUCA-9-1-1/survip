import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class StatisticService {

  constructor(private http: HttpClient) { }

  public get(stat: string) {
    /*return this.http.get('inspectionstatistic/' + stat).map((response: Response) => {
      const result = response.json();

      return result.data;
    });*/
  }
}
