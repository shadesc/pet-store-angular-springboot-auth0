/**
 * Archive - Coding challenge from interview 2018
 * Author: Chadi Cortbaoui
 */
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(private authService: AuthService, router: Router) {
    authService.handleLoginCallback().then((d) => {
      router.navigate(['']);
    }, e => router.navigate(['']));
  }

  ngOnInit() {
  }

}
