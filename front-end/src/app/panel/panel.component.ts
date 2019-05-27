import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  addPet() {
    this.router.navigate(['pets', 'add']);
  }

  findPetById(searchval) {
    // This line is there to force renavigating to the same component but different values
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    const nav = searchval ? ['pets', 'view', searchval] : [''];
    this.router.navigate(nav);
  }
}
