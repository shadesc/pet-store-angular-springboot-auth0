/**
 * Archive - Coding challenge from interview 2018
 * Author: Chadi Cortbaoui
 */
import { PetApiService } from './../../shared/pet-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-pet',
  templateUrl: './delete-pet.component.html',
  styleUrls: ['./delete-pet.component.css']
})
export class DeletePetComponent implements OnInit {
  petID: number;

  constructor(private route: ActivatedRoute,
      private apiService: PetApiService,
      private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.petID = params['id'];
    });
  }

  deletePet() {
    this.apiService.deletePet(this.petID)
      .subscribe(data => {
        this.router.navigate(['']);
      },
      err => console.error('Error deletePet: ', err),
      () => console.log('done deletePet'));
  }

}
