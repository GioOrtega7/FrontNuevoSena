import { Component } from '@angular/core';
import { CoreService } from 'src/app/shared/services/core.service';

@Component({
  selector: 'app-subir-archivos',
  templateUrl: './subir-archivos.component.html',
  styleUrls: ['./subir-archivos.component.css']
})
export class SubirArchivosComponent {

  selectedFiles: File[] = [];

  constructor(private _coreService:CoreService) {}

  onFileChange(event: any) {
    this.selectedFiles = event.target.files;
  }

  uploadFiles(event: Event) {
    event.preventDefault();
    const formData = new FormData();

    for (let file of this.selectedFiles) {
      formData.append('files[]', file, file.name);
    }

    this._coreService.post('variosarchivos', formData).subscribe(
      response => {
        // Manejar la respuesta del backend
        
        console.log(response); // Puedes ver la respuesta del backend en la consola
        alert('se enviaron los archivos');
       
      },
      error => {
        // Manejar errores
        console.error(error);
      }
    );

  }



  
}
