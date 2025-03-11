import { Component, inject } from '@angular/core';
import { UserStore } from './user.store';
import { injectParams } from 'ngxtension/inject-params';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-user',
  template: `
    <p>params: {{params() | json}}</p>
    <p>paramsId: {{paramsId() | json}}</p>

    <pre>user: {{user() | json}}</pre>
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

    ngOnInit() {
        this.userStore.getOne(this.paramsId())
    }
}
