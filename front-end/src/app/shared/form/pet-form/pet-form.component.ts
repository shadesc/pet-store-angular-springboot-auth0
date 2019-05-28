/**
 * Archive - Coding challenge from interview 2018
 * Author: Chadi Cortbaoui
 */
import { AppConstants } from './../../app-constants.component';
import { PetStatus } from './../../../models/petStatus.model';
import { PetTags } from './../../../models/petTags.model';
import { PetCategory } from './../../../models/petCategory.model';
import { Component, OnInit, OnChanges, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Pet } from './../../../models/pet.model';
import { PetApiService } from '../../pet-api.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.css']
})
export class PetFormComponent implements OnInit {
  @Input() pet: Pet;
  isEditMode: boolean; // to know if we are adding or editing Pet
  selectedCategory: number; // Used for ngModel - Category currently chosen
  selectedStatus: string; // Used for ngModel - Status currently chose
  photoUrls: string[] = []; // Used to collect current and added photo url, to be submitted to api
  currentInputPhotoURL: string; // used in ngmodel to clear photoUrl input field after add
  currentName = ''; // used in ngModel to populate/get current pet name in input field
  allPetCategories: PetCategory[] = []; // all available categories - from API
  allPetTags: PetTags[] = []; // all available tags - from API
  allPetStatus: PetStatus[] = AppConstants.allAvailableStatuses; // all available status - put in constants and not API because binary.

  constructor(private apiService: PetApiService, private router: Router) { }

  ngOnInit() {
    this.fetchAllAvailableCategoriesAndTags();
  }

  /* Default form values when editing ie DB values */
  bootStrapEditForm() {
    this.isEditMode = true;
    this.selectedCategory = this.pet.category.id;
    this.selectedStatus = this.pet.status;
    this.photoUrls = this.pet.photoUrls;
    this.currentName = this.pet.name;
  }

  /* Default form values when adding ie any data at first index */
  bootStrapAddForm() {
    this.selectedCategory = this.allPetCategories[0].id;
    this.selectedStatus = this.allPetStatus[0].status;
  }

  /* Fetch from server all available categories and tags. Then bootstrap form for either edit OR add Pet */
  fetchAllAvailableCategoriesAndTags() {
    this.apiService.fetchAllAvailableCategoriesAndTags()
      .subscribe(([categories, tags]) => {
        this.allPetCategories = categories;
        this.allPetTags = tags;

        // if this.pet ie there is a Pet object sent from /list ie we are editing pet
        if (this.pet) {
          this.bootStrapEditForm();
        } else {
          this.bootStrapAddForm();
        }
      },
      err => console.error('Error fetchAllAvailableCategoriesAndTags: ', err),
      () => console.log('done fetchAllAvailableCategoriesAndTags'));
  }

  updatePet(petObject) {
    this.apiService.updatePet(petObject)
      .subscribe(data => {
        console.log('Pet UPDATE Completed - ', data);
        this.router.navigate(['']);
      },
      err => console.error('Error updatePet: ', err),
      () => console.log('done updatePet'));
  }

  addPet(petObject) {
    this.apiService.addPet(petObject)
      .subscribe(data => {
        console.log('Pet ADD Completed - ', data);
        this.router.navigate(['']);
      },
      err => console.error('Error addPet: ', err),
      () => console.log('done addPet'));
  }

  /* Auto check already chosen tags by comparing stored tags with all available tags */
  tagCheck(tag) {
    let found = null;
    if (this.pet) { // ie edit mode
      found = this.pet.tags.find(x => x.id === tag.id && x.name === tag.name);
    }
    return found;
  }

  addPhotoUrl(url) {
    const urlValue = url.value;
    const photoDuplicate = this.photoUrls.find(x => x === urlValue);
    if (urlValue.length && !photoDuplicate) {
      this.photoUrls = [...this.photoUrls, urlValue];
    }
  }

  // Maps ngModelGroup id:boolean pair to id:tag_id to send to server
  buildTagResponse(tagObj) {
    const finalTagObj = [];
    Object.keys(tagObj).forEach(function (key) {
      const value = tagObj[key];
      if (value) { // if true, get key and map it as id
        finalTagObj.push({ id: key });
      }
    });
    return finalTagObj;
  }

  onSubmit(petForm: NgForm) {
    let petObjectToSubmit = {};
    let photoUrls = [];

    if (this.isEditMode) {
      console.log('Submitting for this pet id ', this.pet.id);
      photoUrls = petForm.value.photoUrls
        && petForm.value.photoUrls.length ? [...this.photoUrls, petForm.value.photoUrls] : this.photoUrls;
      petObjectToSubmit = {
        id: this.pet.id,
        ...petForm.value,
        category: { id: petForm.value.category },
        photoUrls,
        tags: this.buildTagResponse(petForm.value.tags)
      };
    } else {
      photoUrls = petForm.value.photoUrls || this.photoUrls;
      petObjectToSubmit = {
        ...petForm.value,
        category: { id: petForm.value.category },
        photoUrls,
        tags: this.buildTagResponse(petForm.value.tags)
      };
    }

    console.log('Form submitting following object: ', petObjectToSubmit);

    // If edit : PUT to api
    if (this.isEditMode) {
      this.updatePet(petObjectToSubmit);
    } else { // if add POST to api
      this.addPet(petObjectToSubmit);
    }

  }

  tagChecked(tag) {
    const myTag = this.tagCheck(tag);
    return myTag ? true : false; // using ngModelGroup will return json
    // tags { tag_id:true/false, tag_id:true/false} which we will filter before submit
  }
}
