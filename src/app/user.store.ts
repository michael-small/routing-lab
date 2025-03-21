import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { signalStore, withProps, withState } from '@ngrx/signals';
import { User } from "./user.model";
import { withFeatureFactory } from '@angular-architects/ngrx-toolkit';
import { withCrudMappings } from "./conditional-map-methods.store.feature";
import { delay } from "rxjs";

@Injectable({providedIn: 'root'}) export class UserService {
    url = 'https://jsonplaceholder.typicode.com/users/' as const;
    #http = inject(HttpClient)

    #delay = 500;

    getUser(id: string) {
        return this.#http.get<User>(`${this.url}/${id}`).pipe(delay(this.#delay))
    }    
    getUsers() {
        return this.#http.get<User[]>(`${this.url}`).pipe(delay(this.#delay))
    }
}

type UserState = {
  items: User[];
  loading: boolean;
  selectedItem: User | null;
};

const initialState: UserState = {
  items: [],
  loading: false,
  selectedItem: null
};

export const UserStore = signalStore(
  withState(initialState),
  withProps(() => ({serv: inject(UserService)})),
  withFeatureFactory((store) =>
    withCrudMappings({
        read: { methodGetAll: () => store.serv.getUsers(), methodGetOne: ((value: string) => store.serv.getUser(value)) },
        create: false,
        update: false,
        delete: false
    })
  )
);