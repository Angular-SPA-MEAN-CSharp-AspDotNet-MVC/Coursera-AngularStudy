import { Injectable } from '@angular/core';

import { Feedback } from '../shared/feedback';
import { baseURL } from '../shared/baseurl';
import { Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs/Observable';
import { RestangularConfigFactory } from '../shared/restConfig';


@Injectable()
export class FeedbackService {


  constructor(private restangular: Restangular) {
  }

  submitFeedback(fdVar: Feedback): Observable<Feedback[]> {
    console.log(fdVar);
    return this.restangular.all('feedback').post(fdVar);
  }


  getSubmittedFeedback(): Observable<Feedback[]> {
    return this.restangular.all('feedback').getList();
  }


}
