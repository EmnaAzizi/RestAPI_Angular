import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "../../../node_modules/@angular/router";
import { MarsipularmiCService } from "../marsipularmi-c.service";

@Component({
  selector: "app-addnew",
  templateUrl: "./addnew.component.html",
  styleUrls: ["./addnew.component.css"]
})
export class AddnewComponent implements OnInit {
  username: string;
  password: string;
  rpaswword: string;
  race: string;
  famille: string;
  nourriture: string;
  age: string;
  errors: string;
  email: string;
  id: number;
  constructor(
    private router: Router,
    private _route: ActivatedRoute,
    private _marsipulamiservice: MarsipularmiCService
  ) {
    this.id = +this._route.snapshot.params["id"];
  }

  addUser(
    username,
    email,
    password,
    rpassword,
    race,
    famille,
    nourriture,
    age
  ) {
    let user: any;
    user = {
      username: username,
      email: email,
      password: password,
      enabled: true,
      roles: [],
      race: race,
      famille: famille,
      nourriture: nourriture,
      age: age
    };
    this._marsipulamiservice.addUser(user, this.id).subscribe(addError => {
      (this.errors = addError), this.router.navigate(["/Amis/" + this.id]);
    });
  }

  ngOnInit() {}
}
