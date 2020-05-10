import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { RouterExtensions } from "nativescript-angular/router";
import { LoginService } from "./login.service";

import * as dialog from "tns-core-modules/ui/dialogs";

@Component({
    selector: "LoginComponent",
    templateUrl: "login.component.html",
})
export class LoginComponent implements OnInit {
    user: User = { username: "username", password: "password" };
    loginForm: FormGroup = this.fb.group({
        username: [this.user.username, Validators.required],
        password: [this.user.password, Validators.required],
    });

    constructor(
        private page: Page,
        private fb: FormBuilder,
        private router: RouterExtensions,
        private ls: LoginService
    ) {
        page.actionBarHidden = true;
    }

    ngOnInit() {
        if (this.ls.isLoggedIn()) {
            this.router.navigate(["/pokemon"], { clearHistory: true });
        }
    }

    username = this.loginForm.get("username");
    password = this.loginForm.get("password");

    login() {
        console.log(this.loginForm.value);
        if (this.ls.login(this.loginForm.value)) {
            this.router.navigate(["/pokemon"], { clearHistory: true });
        } else {
            alert("username or password are wrong");
        }
    }

    register() {
        if (this.ls.isAlreadyRegistered()) {
            dialog
                .confirm(
                    "Register a new user will replace the current user. Are you sure?"
                )
                .then((result) => {
                    if (result) {
                        this.ls.register(this.loginForm.value);
                        alert(
                            `User ${this.loginForm.value.username} has been registered`
                        );
                    }
                });
        } else {
            this.ls.register(this.loginForm.value);
            alert(`User ${this.loginForm.value.username} has been registered`);
        }
    }
}
