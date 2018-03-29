import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable'
import { Http, Response } from '@angular/http';

@Injectable()
export class ProcessHTTPMsgService {

  constructor() { }
  public extractData(res: Response) {
    let body = res.json();
    console.log("Body here:");
    console.log(body);
    return body || {};
  }

}