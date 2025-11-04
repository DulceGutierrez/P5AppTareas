import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TareaService, Tarea } from 'src/app/services/tarea-service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: false
})
export class InicioPage implements OnInit {

  tareas: Tarea[] = [];
  listaVacia: boolean = false;

  constructor(private tareaService: TareaService) { }
  ngOnInit() {
  }

  ionViewWillEnter() {
    //this.tareas = this.tareasPrueba
    this.tareas = this.tareaService.getTareas();
    console.log("Tareas cargadas");

    this.listaVacia = this.tareas.length === 0;
    console.log("Lista vacía:", this.listaVacia);
  }

}
