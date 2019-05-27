import { Pet } from './../../models/pet.model';
import { PetApiService } from './../../shared/pet-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.css']
})
export class EditPetComponent implements OnInit {
  petId: string;
  pet: Pet;

  constructor(private route: ActivatedRoute,
    private apiService: PetApiService,
    private router: Router) { }

  fetchPetById(id: number) {
    this.apiService.fetchPetById(id)
      .subscribe(data => {
        this.pet = data;
      },
      err => { console.error('Error Fecthing by id: ', err); this.router.navigate(['']); },
      () => console.log('done fetchPetById'));
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.petId = params['id'];
      this.fetchPetById(params['id']);
    });
  }
}
