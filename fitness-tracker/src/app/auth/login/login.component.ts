import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {UIService} from "../../shared/ui-service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private loadingSubs: Subscription;

  constructor(private authService: AuthService, private uiService: UIService) { }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  onSubmit(form) {
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnDestroy() {
    if(this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
  }

}
