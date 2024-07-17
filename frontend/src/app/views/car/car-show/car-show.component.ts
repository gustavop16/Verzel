import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../../shared/services/car.service';
import { CarModel } from '../../../shared/models/car.model';

@Component({
  selector: 'app-car-show',
  standalone: true,
  imports: [HeaderComponent, MatCardModule, MatButtonModule],
  templateUrl: './car-show.component.html',
  styleUrl: './car-show.component.css'
})
export class CarShowComponent {

  carId!: number;
  car!: CarModel;

  constructor(private route: ActivatedRoute, private carService: CarService, private router: Router) {}

  ngOnInit() {
    this.carId = Number(this.route.snapshot.paramMap.get('id')!);
    this.getCar(this.carId) 
  }

  getCar(id: number){
    this.carService.getById(id).subscribe({
      next: (response) => {
        this.car = response.data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  list(){
    this.router.navigate(['home']);
  }


}
