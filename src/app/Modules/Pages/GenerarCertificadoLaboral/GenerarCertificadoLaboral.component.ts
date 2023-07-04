import { Component, OnInit } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { CoreService } from 'src/app/shared/services/core.service';
import { options } from '@fullcalendar/core/preact';
import { format, getDate, getDay, getMonth, getYear  } from 'date-fns';
import { es } from 'date-fns/locale';
import { FormsModule } from '@angular/forms';


(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-GenerarCertificadoLaboral',
  templateUrl: './GenerarCertificadoLaboral.component.html',
  styleUrls: ['./GenerarCertificadoLaboral.component.css']
})



export class GenerarCertificadoLaboralComponent {
  constructor(private _coreService:CoreService) { }


  cedula!: string;
  nombres!: string;
  apellidos!: string;
  sueldoBasico!: string;
  fechaInicio!: string;
  fechaVencimiento!: string;


  prueba() {
    
    alert('entro');
    this._coreService.get<any>(`carganomina/${this.cedula}`, options).subscribe(
      (response) => {
        //console.log(response);
        // Aquí puedes utilizar la respuesta del backend (datos relacionados a la cédula) para generar el PDF usando pdfmake
        //const datosRelacionados = response; // Suponiendo que la rkkkkkllespuesta contiene los datos relacionados
        
        // Generar el PDF utilizando pdfmake con los datos obtenidos
        // ...
        //const datosTexto = JSON.stringify(response, null, 2);
        
        // Mostrar los datos en un alert
        //alert(datosTexto);

        this.nombres = response.nombres;
        this.apellidos = response.apellidos;
        this.sueldoBasico = response.sueldoBasico;
        this.fechaInicio = response.fechaInicio;
        this.fechaVencimiento = response.fechaVencimiento;

        alert(this.fechaVencimiento);
      },

      
      (error) => {
        console.log('Error al buscar los datos:', error);
      }
    );
    
    
  }

  testfecha(){

    const fechaString = '25/06/1992';
    const fechaParts = fechaString.split('/');
    const fecha = new Date(`${fechaParts[1]}/${fechaParts[0]}/${fechaParts[2]}`);

    console.log(fecha); // Verifica la salida de la fecha en la consola

    const fechaFormateada = format(fecha, "dd 'de' MMMM 'de' yyyy", { locale: es });


    console.log(fechaFormateada); // Verifica la salida de la fecha en la consola



  }
  
  
  
  createPdf() {

    
    this._coreService.get<any>(`carganomina/${this.cedula}`, options).subscribe(
      (response) => {
        
        
        this.nombres = response.nombres;
        this.apellidos = response.apellidos;
        this.sueldoBasico = response.sueldoBasico;
        this.fechaInicio = response.fechaInicio;
        this.fechaVencimiento = response.fechaVencimiento;
        this.cedula = response.cedula;


        
        const fechaParts1 = this.fechaInicio.split('/');
        const fecha1 = new Date(`${fechaParts1[1]}/${fechaParts1[0]}/${fechaParts1[2]}`);
        const fechaFormateada1 = format(fecha1, "dd 'de' MMMM 'de' yyyy", { locale: es });

        const fechaParts2 = this.fechaVencimiento.split('/');
        const fecha2 = new Date(`${fechaParts2[1]}/${fechaParts2[0]}/${fechaParts2[2]}`);
        const fechaFormateada2 = format(fecha2, "dd 'de' MMMM 'de' yyyy", { locale: es });

        

          
 
        const fechaActual = new Date();

        // Obtener el número del día
        const dia = getDate(fechaActual);
        console.log(fechaActual);

        // Obtener el nombre del mes en español
        const mes = format(fechaActual, 'MMMM', { locale: es });

        // Obtener el año
        const anio = getYear(fechaActual);

        const fechaFormateada = ` a los (${dia}) días del mes de ${mes} del año ${anio}`;
        console.log(fechaFormateada);


        const pdfDefinition: any = {
          content: [

            {
              image: 'data:image/png;base64,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',
              width: 150, // ajusta el ancho de la imagen según tus necesidades
              alignment: 'center', // Centrar el contenido
            },
    
    
            {
              text: 'Servicio Nacional de Aprendizaje - SENA\n\n\n\n',
              style: 'header',
              alignment: 'center',
              fontSize: 14
            },
            {
              text: 'CERTIFICACIÓN LABORAL\n\n\n\n',
              style: 'header',
              alignment: 'center',
              fontSize: 13
            },
            {
              text: [
                'El Servicio Nacional de Aprendizaje - SENA, se permite certificar que ',
                { text: this.nombres, bold: true },' ',{ text: this.apellidos, bold: true },  ' identificado con la cedula No. ',
                { text: this.cedula, bold: true },
                ', Presto sus servicios profesionales en nuestra institución desde el ' ,
                { text: fechaFormateada1, bold: true }, ' hasta el ' ,
                { text: fechaFormateada2, bold: true },', y devengo un salario básico de ',
                { text: this.sueldoBasico, bold: true }, '\n\n\n\n\n'
              ],
              style: 'header',
              bold: false,
              lineHeight: 1.5
            },
            {
              text: [
                'En constancia se firma en la ciudad de Popayán, Cauca, ', { text: fechaFormateada, bold: true },'\n\n\n\n\n'
              ],
              style: 'header',
              bold: false,
              lineHeight: 1.5
            },
    
            {
              text: [
                'Cordialmente.\n\n\n\n\n\n\n\n\n'
              ],
              style: 'header',
              bold: false
            },

            {
              text: [
                '__________________\nFirma encargado'
              ],
              style: 'header',
              bold: false
            }
            
    
          ],
    
          styles: {
            header: {
              fontSize: 12,
              bold: true,
              alignment: 'justify'
            }
          }
    
    
        }

        const pdf = pdfMake.createPdf(pdfDefinition);
        pdf.open();

      },

      
      (error) => {
        console.log('Error al buscar los datos:', error);
      }
    );
   
  }

}


