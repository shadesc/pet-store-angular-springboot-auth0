/**
 * Archive - Coding challenge from interview 2018
 * Author: Chadi Cortbaoui
 */
import { PetTags } from './../models/petTags.model';
import { PetCategory } from './../models/petCategory.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pet } from './../models/pet.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { AppConstants } from './app-constants.component';

@Injectable()
export class PetApiService {
  apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiEndpoint;
  }

  fetchPetList() {
    return this.httpClient.get<Pet[]>(`${this.apiUrl}/pets`)
      .map((pets) => {
        for (const pet of pets) {
          // potential filtering
        }
        return pets;
      });
  }

  fetchPetById(id: number) {
    return this.httpClient.get<Pet>(`${this.apiUrl}/pets/${id}`);
  }

  fetchAllAvailableCategories() {
    return this.httpClient.get<PetCategory[]>(`${this.apiUrl}/pets/categories`);
  }

  fetchAllAvailableTags() {
    return this.httpClient.get<PetTags[]>(`${this.apiUrl}/pets/tags`);
  }

  fetchAllAvailableCategoriesAndTags() {
    return forkJoin(
      this.fetchAllAvailableCategories(),
      this.fetchAllAvailableTags()
    );
  }

  updatePet(pet: Pet) {
    const httpOptions = AppConstants.buildHttpHeader(AppConstants.contentTypeOptions.json);
    const body = pet;
    return this.httpClient.put<Pet>(`${this.apiUrl}/pets`, body, httpOptions);
  }

  addPet(pet: Pet) {
    const httpOptions = AppConstants.buildHttpHeader(AppConstants.contentTypeOptions.json);
    const body = pet;
    return this.httpClient.post<Pet>(`${this.apiUrl}/pets`, body, httpOptions);
  }

  deletePet(petID: number) {
    const httpOptions = AppConstants.buildHttpHeader(AppConstants.contentTypeOptions.json);
    return this.httpClient.delete(`${this.apiUrl}/pets/${petID}`, httpOptions);
  }
}
