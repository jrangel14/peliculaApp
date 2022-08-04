import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Cast, PeliculaDetalle } from '../../interface/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input() id;

  oculto = 130;
  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  estrella = 'star-outline';
  message = '';

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5,
  };

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController,
    private dataLocal: DataLocalService
  ) {}

  ngOnInit() {
    //console.log('id: ', this.id);

    this.dataLocal
      .existePelicula(this.id)
      .then((existe) => (this.estrella = existe ? 'star' : 'star-outline'));

    this.moviesService.getPeliculaDetalle(this.id).subscribe((resp) => {
      console.log(resp);
      this.pelicula = resp;
    });

    this.moviesService.getActoresDetalle(this.id).subscribe((resp) => {
      console.log(resp);
      this.actores = resp.cast;
    });
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  favorito() {
    const existe = this.dataLocal.guardarPelicula(this.pelicula);
    this.estrella = existe ? 'star' : 'star-outline';
  }
}
