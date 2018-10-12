import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "../../../node_modules/@angular/router";
import { MarsipularmiCService } from "../marsipularmi-c.service";
import { Marisupilami } from "../Marisupilami";

@Component({
  selector: "app-amis",
  templateUrl: "./amis.component.html",
  styleUrls: ["./amis.component.css"]
})
export class AmisComponent implements OnInit {
  id: number;
  user: Marisupilami;
  errorMessage: string;
  users: Array<Marisupilami> = [];

  selectedOption: string;
  listFilter: string = "";
  notFriend: Array<Marisupilami> = [];
  constructor(
    private _route: ActivatedRoute,
    private _userService: MarsipularmiCService
  ) {
    this.id = +this._route.snapshot.params["id"];
  }
  deleteUser(idamis, p) {
    this._userService.deleteAmis(idamis, this.id, p).subscribe();
    this._userService.getUsers().subscribe(userss => {
      this.users = userss;
      this.notFriend = this.notfriendss();
    });
  }

  notfriendss(): Array<Marisupilami> {
    let user: Marisupilami;
    let Notfriends: Array<Marisupilami> = [];
    console.log(this.users.result.length);
    for (let a of this.users.result) {
      console.log(this.users);
      if (a.id == this.id) {
        user = a;
        console.log(user);
      }
    }

    console.log("in not friends");

    for (let k of user.friends) {
      for (let a of this.users.result) {
        if (k.id != a.id) {
          Notfriends.push(a);
        }
      }
    }
    console.log("************************");
    console.log(Notfriends.length);
    var flags = [],
      output = [],
      l = Notfriends.length,
      i;
    for (i = 0; i < l; i++) {
      if (flags[Notfriends[i].id]) continue;
      flags[Notfriends[i].id] = true;
      output.push(Notfriends[i]);
    }

    return output;
  }

  AddUser(a: any) {
    let p;

    this._userService.AjoutAmis(a, this.id, p).subscribe();
    this._userService.getUsers().subscribe(userss => {
      this.users = userss;
      this.notFriend = this.notfriendss();
    });
  }

  ngOnInit() {
    this._userService.getUsers().subscribe(userss => {
      this.users = userss;
      this.notFriend = this.notfriendss();
    });
  }
}
