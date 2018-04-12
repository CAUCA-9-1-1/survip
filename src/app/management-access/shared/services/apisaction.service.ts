import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class ApisActionService {

  constructor(private http: HttpClient) { }

  public getAll() {
    /*return this.http.get('apisaction').map((response: Response) => {
      const result = response.json();

      return result.data;
    });*/
  }
}
