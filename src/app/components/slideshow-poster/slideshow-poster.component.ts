import { Component, Input, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/interface/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];

  slideOpts = {
    slidesPerView: 3.1,
    freeMode: true,
    spaceBetween: -10
  };

  constructor( private modalCtrl: ModalController) { }

  ngOnInit() {}

  async verDetalle(id: string) {
    
    const modal =  await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();

  }

}
