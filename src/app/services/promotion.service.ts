import { Injectable } from '@angular/core';

import { Promotion } from '../shared/promotion';
import { Observable } from 'rxjs/Observable';
import { RestangularConfigFactory } from '../shared/restConfig';

import  'rxjs/add/operator/delay';
import  'rxjs/add/observable/of';
import { Restangular } from 'ngx-restangular';

@Injectable()
export class PromotionService {

  constructor(private restangular: Restangular) { }

  getPromotions(): Observable<Promotion[]> {
    return this.restangular.all('promotions').getList();
  }

  getPromtion(id: number): Observable<Promotion> {
    return this.restangular.one('promotions', id).get();
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.restangular.all('promotions').getList({feature: true})
      .map( promotions => promotions[0] );
  }

}

