import { Pet } from './../../models/pet.model';
import { PetTags } from './../../models/petTags.model';
import { PetCategory } from './../../models/petCategory.model';
import { PetApiService } from './../../shared/pet-api.service';
import { PetDisplayComponent } from './../../shared/pet/pet-display/pet-display.component';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PetListComponent } from './pet-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { AuthService } from '../../auth/auth.service';

describe('PetListComponent', () => {
  let component: PetListComponent;
  let fixture: ComponentFixture<PetListComponent>;
  let pet: Pet;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        PetListComponent,
        PetDisplayComponent
      ],
      providers: [
        PetApiService,
        AuthService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetListComponent);
    component = fixture.debugElement.componentInstance;

    // Mock a pet display object
    const category = new PetCategory(4, 'Hamster');
    const tags = [new PetTags(5, 'Protector')];
    pet = new Pet('2000', category, 'Max', ['https://cdn.omlet.co.uk/images/originals/hamsters-make-great-pets.jpg'], tags, 'sold');
  });

  it('should create pet list component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data successfully if called asynchronously', async(() => {
    const apiservice = fixture.debugElement.injector.get(PetApiService);
    const spy = spyOn(apiservice, 'fetchPetList')
      .and.returnValue(Observable.of([pet]));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(JSON.stringify(component.petList)).toBe(JSON.stringify([pet]));
    });
  }));

  it('fakeAsync - should fetch data successfully if called asynchronously', fakeAsync(() => {
    const apiservice = fixture.debugElement.injector.get(PetApiService);
    const spy = spyOn(apiservice, 'fetchPetList')
      .and.returnValue(Observable.of([pet]));

    fixture.detectChanges();

    tick();
    expect(JSON.stringify(component.petList)).toBe(JSON.stringify([pet]));
  }));
});
