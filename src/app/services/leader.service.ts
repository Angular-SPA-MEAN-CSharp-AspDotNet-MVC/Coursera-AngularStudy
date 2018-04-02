import { Injectable } from '@angular/core';

import { Leader } from '../shared/leader';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import { Restangular } from 'ngx-restangular';


@Injectable()
export class LeaderService {

  constructor(private restangular: Restangular) { }

  getLeaders(): Observable<Leader[]> {
    return this.restangular.all('leaders').getList();
  }

  getLeader(id: number): Observable<Leader> {
    // return Observable.of(LEADERS.filter((leader) => (leader.id === id))[0]).delay(2000);
    return this.restangular.one('leaders', id).get();
  }

  getFeaturedLeader(): Observable<Leader> {
    // return Observable.of(LEADERS.filter((ld) => (ld.featured))[0]).delay(2000);
    return this.restangular.all('leaders').getList({feature: true})
      .map(leaders => leaders[0]);
  }

}
