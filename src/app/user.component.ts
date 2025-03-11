import { Component, inject } from '@angular/core';
import { UserStore } from './user.store';
import { injectParams } from 'ngxtension/inject-params';
import { JsonPipe } from '@angular/common';
import { injectQueryParams } from 'ngxtension/inject-query-params';
import { injectRouteData } from 'ngxtension/inject-route-data';
import { injectRouteFragment } from 'ngxtension/inject-route-fragment';

@Component({
  selector: 'app-user',
  template: `
    <pre>params: {{params() | json}}</pre>
    <pre>paramsId: {{paramsId() | json}}</pre>
    <pre>queryParams: {{queryParams() | json}}</pre>
    <pre>routeData: {{routeData() | json}}</pre>
    <pre>routeFragment: {{routeFragment() | json}}</pre>

    @if (!userStore.loading()) {
        <pre>user: {{user() | json}}</pre>
    } @else {
        <p>Loading...</p>
    }
  `,
  styles: ``,
  imports: [JsonPipe],
  providers: [UserStore]
})
export class UserComponent {
    readonly userStore = inject(UserStore);

    user = this.userStore.selectedItem;

    params = injectParams(); // { id: string }
    paramsId = injectParams('id'); // soon there will be a default value + parsing to number and whatnot
    queryParams = injectQueryParams(); // can also be passed a param
    routeData = injectRouteData();
    routeFragment = injectRouteFragment();

    ngOnInit() {
        this.userStore.getOne(this.paramsId())
    }
}
