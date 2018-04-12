import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {UtilisationCode} from '../models/utilisation-code.model';


@Injectable()
export class UtilisationCodeService {

  constructor(private http: HttpClient
  ) { }

  public getAll() {
    /*return this.http.get('utilisationcode').map((response: Response) => {
      const result = response.json();

      return result.data;
    });*/
  }

  public create(code: UtilisationCode) {
    /*return this.http.post(
      'utilisationcode',
      JSON.stringify(code)
    ).map((response: Response) => response.json());*/
  }

  public update(code: UtilisationCode) {
    /*return this.http.put(
      'utilisationcode',
      JSON.stringify(code),
    ).map((response: Response) => response.json());*/
  }

  public remove(idUtilisationCode: string) {
    // return this.http.delete('utilisationcode/' + idUtilisationCode).map((response: Response) => response.json());
  }
}
