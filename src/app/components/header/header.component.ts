import { Component, inject } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  username: string = localStorage.getItem('username') as string;
  route = inject(Router);
  signOut(){
    localStorage.clear();
    this.route.navigate(['/auth/login']);
  }
}
