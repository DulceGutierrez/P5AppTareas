import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonModal, ToastController } from '@ionic/angular';
import { Tarea, TareaService } from 'src/app/services/tarea-service';

@Component({
  selector: 'app-detalles-tarea',
  templateUrl: './detalles-tarea.page.html',
  styleUrls: ['./detalles-tarea.page.scss'],
  standalone: false
})
export class DetallesTareaPage implements OnInit {

  @ViewChild('customModal') customModal!: IonModal;
  tareaActual!: Tarea; // Variable para almacenar la tarea actual no nula
  editarTarea: boolean = true;
  fechaHoy: string;

  constructor(
    private tareaService: TareaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.fechaHoy = new Date().toISOString();

    const tareaId = this.activatedRoute.snapshot.paramMap.get('id');

    if (tareaId) {
      const tareaEncontrada = this.tareaService.getTarea(tareaId);


      if(tareaEncontrada){
        this.tareaActual = tareaEncontrada;
        console.log('Tarea encontrada:', this.tareaActual);
      }else{
        this.router.navigate(['/inicio']);
      }

    }else{
      console.log('Tarea no encontrada', tareaId)
    }



  }

  toggle(){
    this.editarTarea = !this.editarTarea;
  }

  clickCancelCustom(){
    this.customModal.dismiss();
  }

  clickConfirmCustom(){
    this.customModal.dismiss();
  }

  async guardarCambios(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Cambios realizos correctamente',
      duration: 1500,
      position: position,
    });

    this.tareaService.actualizarTarea(this.tareaActual);
    this.router.navigate(['/inicio']);
    console.log('Cambios guardados', this.tareaActual);

    await toast.present();
  }

  async eliminarTarea() {
    const alert = await this.alertController.create({
      header: 'Seguro que desea eliminar esta Tarea?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Alert canceled');
          },
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.tareaService.eliminarTarea(this.tareaActual.id);
            this.router.navigate(['/inicio']);
          },
        },
      ],
    });

    await alert.present();

  }

}
