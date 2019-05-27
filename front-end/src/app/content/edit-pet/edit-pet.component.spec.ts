import { PetFormComponent } from './../../shared/form/pet-form/pet-form.component';
import { PetCategory } from './../../models/petCategory.model';
import { PetTags } from './../../models/petTags.model';
import { Pet } from './../../models/pet.model';
import { PetApiService } from './../../shared/pet-api.service';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { EditPetComponent } from './edit-pet.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

describe('EditPetComponent', () => {
  let component: EditPetComponent;
  let fixture: ComponentFixture<EditPetComponent>;
  const activateRouteMockPetID = 2000;
  let pet: Pet;
  let category: PetCategory;
  let tags: PetTags[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        EditPetComponent,
        PetFormComponent
      ],
      providers: [
        PetApiService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({ id: activateRouteMockPetID })
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPetComponent);
    component = fixture.debugElement.componentInstance;

    // Mock a pet display object
    category = new PetCategory(4, 'Hamster');
    tags = [new PetTags(5, 'Protector')];
    pet = new Pet(activateRouteMockPetID.toString(), category
      , 'Max', ['https://cdn.omlet.co.uk/images/originals/hamsters-make-great-pets.jpg'],
      tags, 'sold');

  });

  it('should create editPetComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should display text with pet ID when prompting to edit pet', fakeAsync(() => {
    const actRoute = fixture.debugElement.injector.get(ActivatedRoute);
    const apiservice = fixture.debugElement.injector.get(PetApiService);

    // mock async calls done in the component since we are using fakeAsync.
    const spy = spyOn(apiservice, 'fetchPetById')
      .and.returnValue(Observable.of(pet));
    const tagsAndCategoriesSpy = spyOn(apiservice, 'fetchAllAvailableCategoriesAndTags')
      .and.returnValue(Observable.of([[category], tags]));

    fixture.detectChanges();
    tick();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent)
      .toBe(`Edit Pet - ID:${activateRouteMockPetID}`);
  }));

  it('should fetch pet by id successfully if called asynchronously', fakeAsync(() => {
    const apiservice = fixture.debugElement.injector.get(PetApiService);

    // mock async calls done in the component since we are using fakeAsync.
    const spy = spyOn(apiservice, 'fetchPetById')
      .and.returnValue(Observable.of(pet));
    const tagsAndCategoriesSpy = spyOn(apiservice, 'fetchAllAvailableCategoriesAndTags')
      .and.returnValue(Observable.of([[category], tags]));

    fixture.detectChanges();

    tick();

    expect(component.pet).toBe(pet);
  }));
});
