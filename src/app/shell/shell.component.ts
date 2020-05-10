import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { LoginService } from "../login/login.service";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "ShellComponent",
    templateUrl: "shell.component.html",
})
export class ShellComponent implements OnInit {
    constructor(
        private page: Page,
        private ls: LoginService,
        private router: RouterExtensions
    ) {
        page.actionBarHidden = true;
    }

    ngOnInit() {}

    logout() {
        this.ls.logout();
        this.router.navigate(["/login", { clearHistory: true }]);
    }
}
