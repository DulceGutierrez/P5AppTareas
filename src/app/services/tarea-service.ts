import { Injectable } from '@angular/core';
import { findIndex } from 'rxjs';

export interface Tarea{

  id: string;
  titulo: string;
  descripcion: string;
  fechaVencimiento: string;


}

@Injectable({
  providedIn: 'root'
})

export class TareaService {

  getTareas(): Tarea[] {

    const tareas = localStorage.getItem('tareas');

    if (tareas) {
      return JSON.parse(tareas);
    } else {
      return [];
    }

  }

  getTarea(id: string){
    const tareas = this.getTareas();

    return tareas.find(tarea => tarea.id === id);
  }

  agregarTarea(tarea: Tarea): void {

    const tareas = this.getTareas();

    tareas.push(tarea);

    localStorage.setItem('tareas', JSON.stringify(tareas));

  }

  actualizarTarea(tareaActualizada: Tarea): void {

    const tareas = this.getTareas();

    const index =  tareas.findIndex(tarea => tarea.id === tareaActualizada.id);

    console.log("Index:", index)

    if (index !== -1) {
      tareas[index] = tareaActualizada;

      console.log("Tareas actualizada:",tareas[index])

      localStorage.setItem('tareas', JSON.stringify(tareas));
    }
  }

  eliminarTarea(id: string): void {

    const tareas = this.getTareas();

    const tareasActualizadas = tareas.filter(tarea => tarea.id !== id);

    localStorage.setItem('tareas', JSON.stringify(tareasActualizadas));

  }

}
