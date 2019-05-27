import { PetApiService } from './../../pet-api.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetFormComponent } from './pet-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('PetFormComponent', () => {
  let component: PetFormComponent;
  let fixture: ComponentFixture<PetFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [
        PetFormComponent
      ],
      providers: [
        PetApiService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetFormComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create petFormComponent', () => {
    expect(component).toBeTruthy();
  });
});
