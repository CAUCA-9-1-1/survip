import {Injectable} from '@angular/core';
import {Response} from '@angular/http';

import {HttpService} from '../../../core/http/http.service';

@Injectable()
export class UtilisationCodeService {

  constructor(private http: HttpService) { }

  getAll() {
    return this.http.get('utilisationcode').map((response: Response) => {
      const result = response.json();

      return result.data;
    });
  }
}
