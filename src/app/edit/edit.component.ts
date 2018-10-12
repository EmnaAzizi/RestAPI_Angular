import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "../../../node_modules/@angular/router";
import { MarsipularmiCService } from "../marsipularmi-c.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"]
})
export class EditComponent implements OnInit {
  id: number;
  errors = [];
  race: string;
  famille: string;
  age: string;
  nourriture: string;
  username: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _postService: MarsipularmiCService
  ) {
    this.id = this.route.snapshot.params["id"];
    this.username = this.route.snapshot.params["username"];
  }

  editUser(race, age, nourriture, famille) {
    let user: any;
    console.log("this is id", this.id);
    user = { race: race, age: age, nourriture: nourriture, famille: famille };
    this._postService.updateUser(user, this.id).subscribe(result => {
      this.router.navigate(["/users/" + this.username]);
    });
  }

  ngOnInit() {}
}
