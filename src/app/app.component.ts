import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  template: `
    <h1>Router Lab</h1>

    <a [routerLink]="['/users/1']" [queryParams]="{count: 1, value: 0}" fragment='a'>users/1</a>
    <br />
    <a [routerLink]="['/users/2']" [queryParams]="{count: 1, value: 0}" fragment='b'>users/2</a>

    <router-outlet />
  `,
})
export class AppComponent {
  title = 'routing-lab';
}
