import { PetApiService } from './../../shared/pet-api.service';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DeletePetComponent } from './delete-pet.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

describe('DeletePetComponent', () => {
  let component: DeletePetComponent;
  let fixture: ComponentFixture<DeletePetComponent>;
  const activateRouteMockPetID = 2000;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        DeletePetComponent
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
    fixture = TestBed.createComponent(DeletePetComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create deletePetComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should display text with pet ID when prompting to delete pet', fakeAsync(() => {
    const actRoute = fixture.debugElement.injector.get(ActivatedRoute);

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    tick();

    expect(compiled.querySelector('ul li:first-child').textContent)
      .toBe(`Are you sure you would like to delete Pet: ${activateRouteMockPetID}?`);
  }));
});
