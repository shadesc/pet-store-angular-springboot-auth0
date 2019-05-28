/**
 * Archive - Coding challenge from interview 2018
 * Author: Chadi Cortbaoui
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AddPetComponent } from './content/add-pet/add-pet.component';
import { DeletePetComponent } from './content/delete-pet/delete-pet.component';
import { EditPetComponent } from './content/edit-pet/edit-pet.component';
import { ViewPetComponent } from './content/view-pet/view-pet.component';
import { PetListComponent } from './content/pet-list/pet-list.component';
import { ContentComponent } from './content/content.component';
import { AuthGuard } from './auth/auth.guard';
import { CallbackComponent } from './auth/callback/callback.component';

const appRoutes: Routes = [
    {
        path: 'pets',
        component: ContentComponent,
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: PetListComponent },
            { path: 'view/:id', component: ViewPetComponent },
            { path: 'edit/:id', component: EditPetComponent, canActivate: [AuthGuard] },
            { path: 'delete/:id', component: DeletePetComponent, canActivate: [AuthGuard] },
            { path: 'add', component: AddPetComponent, canActivate: [AuthGuard] },
        ]
    },
    { path: 'callback', component: CallbackComponent },
    { path: '**', redirectTo: 'pets' } // fallback route for 404
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
