import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {UIService} from "../../shared/ui-service";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";
import * as fromRoot from "../../app.reducer";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading$: Observable<boolean>;
  private loadingSubs: Subscription;

  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
   /* this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });*/
  }

  onSubmit(form) {
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    });
  }

/*  ngOnDestroy() {
    if(this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
  }*/

}
