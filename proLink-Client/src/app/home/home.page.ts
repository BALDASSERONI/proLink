import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  categories
  typeEntreprises
  entreprises
  allEntreprise
  filtre
  constructor() {

    this.getCategories()
    this.getTypeEntreprises()
    this.getEntreprises()
  }
  getCategories() {
    var requestOptions = {
      method: 'GET',

    };

    fetch("http://localhost:1337/api/categories", requestOptions)
      .then(response => response.json())
      .then((result) => {
        this.categories = result.data
        console.log(this.categories)
      })
      .catch(error => console.log('error', error));

  }
  getTypeEntreprises() {
    var requestOptions = {
      method: 'GET',

    };

    fetch("http://localhost:1337/api/type-d-entreprises", requestOptions)
      .then(response => response.json())
      .then((result) => {
        this.typeEntreprises = result.data
        console.log(this.typeEntreprises)
      })
      .catch(error => console.log('error', error));

  }

  getEntreprises() {
    var requestOptions = {
      method: 'GET',

    };

    fetch("http://localhost:1337/api/entreprises?populate=*", requestOptions)
      .then(response => response.json())
      .then((result) => {
        this.entreprises = result?.data
        console.log(this.entreprises)
      })
      .catch(error => console.log('error', error));

  }
  /*fonction filtre */
  categorieSet(event) {
    console.log(event.detail.value);
    this.filtre = event.detail.value;
    if (this.filtre == 'all') {
      this.getEntreprises()
    } else {
      var requestOptions = {
        method: 'GET',

      };

      fetch("http://localhost:1337/api/entreprises?populate=*&filters[categorie]=" + this.filtre, requestOptions)
        .then(response => response.json())
        .then((result) => {
          console.log(result)
          this.entreprises = result?.data
        })
        .catch(error => console.log('error', error));
    }


  }

  /*return envoie une valeur*/
  filtreCategories(element) {
    return element.attributes.categories.data.id == this.filtre
  }
}
