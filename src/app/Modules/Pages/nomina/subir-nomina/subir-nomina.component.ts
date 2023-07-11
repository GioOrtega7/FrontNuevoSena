import { Component } from '@angular/core';
import { CoreService } from 'src/app/shared/services/core.service';
@Component({
  selector: 'app-subir-nomina',
  templateUrl: './subir-nomina.component.html',
  styleUrls: ['./subir-nomina.component.css']
})


export class SubirNominaComponent {
  selectedFile: File | undefined;

  constructor(private _coreService:CoreService) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }  

  onUpload() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('excelFile', this.selectedFile);
      console.log('archivo seleccionado');
      //const URL_DEL_ENDPOINT = 'http://localhost:8000/api/import-excel';

      this._coreService.post('carganomina', formData).subscribe(
        response => {
          // Manejar la respuesta del backend
          
          console.log(response); // Puedes ver la respuesta del backend en la consola
          alert('Archivo importado correctamente');
         
        },
        error => {
          // Manejar errores
          console.error(error);
        }
      );
    } else {
      console.log('No se ha seleccionado ningún archivo');
    }
  }

  pruebapdf(){
    const url='http://127.0.0.1:8000/api/pdfprueba';
    window.open(url);
  }

  



  
}
