import { Component, inject, Injectable, signal } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { injectDestroy } from 'ngxtension/inject-destroy';
import { BehaviorSubject, map, merge, Observable, of, pipe, ReplaySubject, switchMap, tap } from 'rxjs';

@Injectable({providedIn: 'root'}) export class GuardService {
    dirtied = signal(false);

    readonly syncDirtyState = rxMethod<{dirty: Observable<boolean>, destroyed: ReplaySubject<void>}>(
        // 👇 RxJS operators are chained together using the `pipe` function.
        pipe(
          switchMap((res) => {
            return merge(res.dirty, res.destroyed)
          }),
          tap((res) => {
            console.log(res)
            if (typeof res === 'boolean') {
                this.dirtied.set(res)
            } else {
                this.dirtied.set(false)
            }
          })
        )
      );
}

@Component({
  selector: 'app-root',
  imports: [],
  template: `
    <p>
      root works!
    </p>
  `,
  styles: ``
})
export class RootComponent {
    dirtied = new BehaviorSubject(false);
    destroyRef = injectDestroy();

    constructor() {
        inject(GuardService).syncDirtyState({ dirty: this.dirtied, destroyed: this.destroyRef })
    }
}
