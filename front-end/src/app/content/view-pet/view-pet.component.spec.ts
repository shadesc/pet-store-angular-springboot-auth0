import { PetDisplayComponent } from './../../shared/pet/pet-display/pet-display.component';
import { PetListComponent } from './../pet-list/pet-list.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPetComponent } from './view-pet.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ViewPetComponent', () => {
  let component: ViewPetComponent;
  let fixture: ComponentFixture<ViewPetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ], declarations: [
        ViewPetComponent,
        PetListComponent,
        PetDisplayComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPetComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create viewPetComponent', () => {
    expect(component).toBeTruthy();
  });
});
