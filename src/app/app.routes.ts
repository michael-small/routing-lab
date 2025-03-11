import { Routes } from '@angular/router';
import { RootComponent } from './root.component';
import { UsersComponent } from './users.component';
import { UserComponent } from './user.component';

export const routes: Routes = [
    {path: '', component: RootComponent},
    {path: 'users', component: UsersComponent, children: [
        {path: ':id', component: UserComponent, data: {title: 'User', possibleRoles: ['admin', 'editor']}}
    ]}
];
