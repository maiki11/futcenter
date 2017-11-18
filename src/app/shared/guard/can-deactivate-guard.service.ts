import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<any> {
  canDeactivate(component: any): Observable<boolean> | boolean {
    let p = Promise.resolve(window.confirm('Are you sure?'));
    return Observable.fromPromise(p);
  }
}
