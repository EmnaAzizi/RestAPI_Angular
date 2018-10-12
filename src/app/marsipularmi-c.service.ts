import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs";
import { Marisupilami } from "./Marisupilami";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/do";
import { AuthService } from "./auth.service";

@Injectable()
export class MarsipularmiCService {
  private uri = "http://127.0.0.1:8000/api/users";
  private url = "http://127.0.0.1:8000/api/users/add";

  constructor(private http: Http, private authenticationService: AuthService) {}

  addUser(user: Marisupilami, id: number) {
    const headers = new Headers();
    headers.append("content-type", "application/json");
    headers.append(
      "Authorization",
      "Bearer " + this.authenticationService.token
    );
    return this.http
      .post("http://127.0.0.1:8000/api/new/" + id, JSON.stringify(user), {
        headers: headers
      })
      .map(res => res.json())
      .do(data => console.log("User add: "));
  }

  getUsers(): Observable<any[]> {
    const headers = new Headers({
      Authorization: "Bearer " + this.authenticationService.token
    });
    return this.http
      .get(this.uri, { headers: headers })
      .map(res => <Marisupilami[]>res.json())
      .do(data => console.log("All: "));
  }

  updateUser(post: Marisupilami, id) {
    const headers = new Headers();
    headers.append("content-type", "application/json");
    headers.append(
      "Authorization",
      "Bearer " + this.authenticationService.token
    );
    return this.http
      .put(this.uri + "/" + id, JSON.stringify(post), { headers: headers })
      .map(res => res.json());
  }

  deleteAmis(id: any, ido: any, post: Marisupilami) {
    const headers = new Headers();
    headers.append("content-type", "application/json");
    headers.append(
      "Authorization",
      "Bearer " + this.authenticationService.token
    );
    return this.http
      .put(
        "http://127.0.0.1:8000/api/supp" + "/" + id + "/" + ido,
        JSON.stringify(post),
        {
          headers: headers
        }
      )
      .map(res => res.json());
  }
  AjoutAmis(id: any, ido: any, post: Marisupilami) {
    const headers = new Headers();
    headers.append("content-type", "application/json");
    headers.append(
      "Authorization",
      "Bearer " + this.authenticationService.token
    );
    return this.http
      .put(this.uri + "/add/" + id + "/" + ido, JSON.stringify(post), {
        headers: headers
      })
      .map(res => res.json());
  }

  deleteUsers(id: any) {
    const headers = new Headers();
    headers.append(
      "Authorization",
      "Bearer " + this.authenticationService.token
    );
    return this.http
      .delete(this.uri + "/" + id, { headers: headers })
      .map(res => res.json());
  }
}
