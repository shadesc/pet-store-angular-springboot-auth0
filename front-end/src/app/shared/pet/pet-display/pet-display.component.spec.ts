/**
 * Archive - Coding challenge from interview 2018
 * Author: Chadi Cortbaoui
 */
import { PetTags } from './../../../models/petTags.model';
import { PetCategory } from './../../../models/petCategory.model';
import { Pet } from './../../../models/pet.model';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetDisplayComponent } from './pet-display.component';

describe('PetDisplayComponent', () => {
  let component: PetDisplayComponent;
  let fixture: ComponentFixture<PetDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PetDisplayComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetDisplayComponent);
    component = fixture.debugElement.componentInstance;

    // Mock a pet display object
    const category = new PetCategory(4, 'Hamster');
    const tags = [new PetTags(5, 'Protector')];
    const pet = new Pet('2000', category, 'Max', ['https://cdn.omlet.co.uk/images/originals/hamsters-make-great-pets.jpg'], tags, 'sold');

    // inject the mock object to the component
    component.pet = pet;
    fixture.detectChanges(); // trigger initial data binding after setting pet values above
  });

  it('should create petDisplayComponent', () => {
    expect(component).toBeTruthy();
  });
});
