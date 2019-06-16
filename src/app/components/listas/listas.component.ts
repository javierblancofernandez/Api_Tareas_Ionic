import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';


@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  @ViewChild(IonList) lista: IonList;
  @Input() terminada = true;
  constructor(public deseosService: DeseosService,
              private router: Router,
              private alertCtrl: AlertController) { }

  ngOnInit() { }
  listaSeleccionada(lista: Lista) {
    console.log(lista);
    if (this.terminada) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    }
    this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);

  }
  borrarLista(lista: Lista) {
    this.deseosService.borrarLista(lista);
    console.log('la lista se borro ok');
  }

  async editarLista(lista: Lista) {
    const alert = await this.alertCtrl.create({
      header: 'editar lista',
      inputs: [{
        name: 'titulo',
        type: 'text',
        value: lista.titulo,
        placeholder: 'nombre de la lista'
      }],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('cancelar');
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            console.log(data);

            if (data.titulo.length === 0) {
              return;
            }
            lista.titulo = data.titulo;
            // Tengo que crear la lista
            this.deseosService.guardarStorage();
            this.lista.closeSlidingItems();
          }
        }]
    });

    await alert.present();
  }

}
