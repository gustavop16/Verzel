import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { ListComponent } from "../car/list/list.component";
import { HeaderComponent } from '../../components/header/header/header.component';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [MatToolbarModule, MatIconModule, ListComponent, HeaderComponent]
})
export class HomeComponent {

      
}
