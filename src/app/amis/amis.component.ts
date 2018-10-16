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
  users: any;

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

  comparer(otherArray, id) {
    return function(current) {
      return (
        otherArray.filter(function(other) {
          return other.id == current.id && current.id != id && other.id != id;
        }).length == 0
      );
    };
  }
  notfriendss(): Array<Marisupilami> {
    let users: Array<Marisupilami> = [];
    let user: Marisupilami;
    let Notfriends: Array<Marisupilami> = [];
    users = this.users.result;
    console.log("hello  in not friends **************************************");
    for (let a of users) {
      if (a.id == this.id) {
        user = a;
        console.log(user);
      }
    }

    let onlyInA = users.filter(this.comparer(user.friends, user.id));
    let onlyInB = user.friends.filter(this.comparer(users, user.id));

    let result = onlyInA.concat(onlyInB);
    const index = result.indexOf(user);
    result.splice(index, 1);

    console.log(result, "hello this is the result ");

    console.log(users.length, "first length");

    console.log("************************");
    console.log(Notfriends.length);
    return result;
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
