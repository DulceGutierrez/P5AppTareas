import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { TareaService } from 'src/app/services/tarea-service';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.page.html',
  styleUrls: ['./crear-tarea.page.scss'],
  standalone: false
})
export class CrearTareaPage implements OnInit {

  @ViewChild('customModal') customModal!: IonModal;

  nuevaTarea ={
    titulo: '',
    descripcion: '',
    fechaVencimiento: ''
  }

  fechaHoy: string;
  pickerAbierto = false;

  constructor(
    private tareaService: TareaService,
    private router: Router
  ) {
    this.fechaHoy = new Date().toISOString();
  }

  ngOnInit() { }


  // 3. AÑADE ESTE MÉTODO PARA MANEJAR LA FECHA SELECCIONADA
  seleccionarFecha(evento: any) {
    // El formato que devuelve el picker es ISO 8601, lo guardamos así
    this.nuevaTarea.fechaVencimiento = evento.detail.value;
    this.pickerAbierto = false; // Cerramos el picker al seleccionar
  }

  dateSelected(event: any) {
    console.log(event);
    this.nuevaTarea.fechaVencimiento = event.detail.value;
  }

  clickCancelCustom(){
    this.customModal.dismiss();
    console.log('Click cancel');
  }

  clickConfirmCustom(){
    console.log(this.nuevaTarea.fechaVencimiento);
    this.customModal.dismiss();
  }

  guardarTarea(){

    if(!this.nuevaTarea.titulo || !this.nuevaTarea.descripcion || !this.nuevaTarea.fechaVencimiento){
      alert('Por favor, completa todos los campos.');
      return;
    }

    const guardarTarea ={
      id: Date.now().toString(),
      titulo: this.nuevaTarea.titulo,
      descripcion: this.nuevaTarea.descripcion,
      fechaVencimiento: this.nuevaTarea.fechaVencimiento
    }

    this.tareaService.agregarTarea(guardarTarea);
    console.log('Tarea guardada:', guardarTarea);

    // Reiniciar el formulario
    this.nuevaTarea = {
      titulo: '',
      descripcion: '',
      fechaVencimiento: ''
    };

    alert('Tarea creada con éxito.');

    this.router.navigate(['/inicio']);

  }

}
