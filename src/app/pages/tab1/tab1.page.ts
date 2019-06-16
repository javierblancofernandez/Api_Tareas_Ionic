import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  lista1: any[] = [];

  constructor(public deseosService: DeseosService,
              private router: Router,
              private alertCtrl: AlertController) {

    this.lista1 = this.deseosService.listas;
  }

  async agregarLista() {
    // this.router.navigateByUrl('/tabs/tab1/agregar');
    const alert = await this.alertCtrl.create({
      header: 'nueva lista',
      inputs: [{
        name: 'titulo',
        type: 'text',
        placeholder: 'nombre de la lista'
      }],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('cancelar');
          }
        },
        {
          text: 'Crear',
          handler: (data) => {
            console.log(data);

            if (data.titulo.length === 0) {
              return;
            }
            const listaId = this.deseosService.crearLista(data.titulo);
            // Tengo que crear la lista
            this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
          }
        }]
    });

    await alert.present();
  }


}
