import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {
  userName
  email
  password
  confirmation
  token

  constructor(private router: Router) { }

  ngOnInit() {
  }
  register() {
    console.log(this.email, this.password)
    console.log(this.userName, this.confirmation)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "username": this.userName,
      "email": this.email,
      "password": this.password
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,

    };

    fetch("http://localhost:1337/api/auth/local/register", requestOptions)
      .then(response => response.json())
      .then((result) => {
        console.log(result)
        this.token = result
        if (this.token.jwt) {
          this.navigate()
        }
      })
      .catch(error => console.log('error', error));
  }
  navigate() {
    this.router.navigate(['/home'])
  }
}
