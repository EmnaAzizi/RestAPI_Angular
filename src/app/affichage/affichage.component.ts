import { Component, OnInit } from "@angular/core";
import { Marisupilami } from "../Marisupilami";
import { MarsipularmiCService } from "../marsipularmi-c.service";
import { ActivatedRoute } from "../../../node_modules/@angular/router";

@Component({
  selector: "app-affichage",
  templateUrl: "./affichage.component.html",
  styleUrls: ["./affichage.component.css"]
})
export class AffichageComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _userService: MarsipularmiCService
  ) {
    this.username = this._route.snapshot.params["username"];
  }

  users: Array<Marisupilami> = [];
  errorMessage: string;
  username: string;
  getUsers() {
    this._userService.getUsers().subscribe(posts => (this.users = posts));
  }

  ngOnInit() {
    this.getUsers();
  }
}
