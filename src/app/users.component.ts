import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './user.store';

@Component({
  selector: 'app-users',
  imports: [RouterOutlet],
  template: `
    <p>Users</p>
    
    <router-outlet />
  `,
  styles: ``
})
export class UsersComponent {
    readonly userService = inject(UserService);
}
