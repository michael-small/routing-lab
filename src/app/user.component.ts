import { Component, inject } from '@angular/core';
import { UserStore } from './user.store';
import { injectParams } from 'ngxtension/inject-params';
import { JsonPipe } from '@angular/common';
import { injectQueryParams } from 'ngxtension/inject-query-params';
import { injectRouteData } from 'ngxtension/inject-route-data';
import { injectRouteFragment } from 'ngxtension/inject-route-fragment';
import {FormsModule} from '@angular/forms'
import { linkedQueryParam } from 'ngxtension/linked-query-param';

@Component({
  selector: 'app-user',
  template: `
    <pre>params: {{params() | json}}</pre>
    <pre>paramsId: {{paramsId() | json}}</pre>

    <pre>queryParams: {{queryParams() | json}}</pre>
    <p>linkedQueryParam is two way binding for query params: it syncs to when QPs are sent (hardcoded to buttons), or it will update the QPs if you set them (like this input)</p>
    <label for="linkedQP">Linked Query Param</label>
    <input [(ngModel)]="count" name="linkedQP" type="number" />

    <pre>routeData: {{routeData() | json}}</pre>

    @if (!userStore.loading()) {
        <pre>user: {{user() | json}}</pre>
    } @else {
        <p>Loading...</p>
    }
  `,
  styles: ``,
  imports: [JsonPipe, FormsModule],
  providers: [UserStore]
})
export class UserComponent {
    readonly userStore = inject(UserStore);

    user = this.userStore.selectedItem;

    params = injectParams(); // { id: string }
    paramsId = injectParams('id'); // soon there will be a default value + parsing to number and whatnot
    queryParams = injectQueryParams(); // can also be passed a param
    routeData = injectRouteData();

    count = linkedQueryParam('value', {
        parse: (value) => parseInt(value ?? '0', 10),
        stringify: (value) => value.toString(),
    });

    ngOnInit() {
        this.userStore.getOne(this.paramsId())
    }
}
