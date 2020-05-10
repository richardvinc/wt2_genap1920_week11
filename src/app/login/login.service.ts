import { Injectable } from "@angular/core";
import * as as from "tns-core-modules/application-settings";

@Injectable({ providedIn: "root" })
export class LoginService {
    constructor() {}

    isAlreadyRegistered() {
        return as.hasKey("user");
    }

    isLoggedIn() {
        return as.hasKey("token");
    }

    register(user: User) {
        as.setString("user", JSON.stringify(user));
    }

    login(userParam: User) {
        if (!this.isAlreadyRegistered()) {
            return false;
        }

        let user: User = JSON.parse(as.getString("user"));
        if (
            user.username === userParam.username &&
            user.password === userParam.password
        ) {
            as.setString("token", userParam.username);
            return true;
        }
        return false;
    }

    logout() {
        as.remove("token");
    }
}
