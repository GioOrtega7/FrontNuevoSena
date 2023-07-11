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
              text: '\n\n\n\n\nServicio Nacional de Aprendizaje - SENA\n\n\n',
              style: 'header',
              alignment: 'center',
             
            },

            {
              text: '\nNIT:  899.999.034-1\n\n',
              style: 'header',
              alignment: 'center',
            
            },

            {
              text: 'EL(LA) SUSCRITO(A) COORDINADOR(A) DEL GRUPO DE RELACIONES LABORALES/ EL(LA) COORDINADOR(A) REGIONAL DE GESTIÓN DE TALENTO HUMANO/ EL(LA) COORDINADOR(A) DEL GRUPO ADMINISTRATIVO DE APOYO MIXTO DEL SENA\n\n',
              style: 'header',
              alignment: 'center',
              
            },
            {
              text: 'CERTIFICA\n\n\n\n',
              style: 'header',
              alignment: 'center',
              
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
              
            },
            {
              text: [
                'En constancia se firma en la ciudad de Popayán, Cauca, ', { text: fechaFormateada, bold: true },'\n\n\n\n\n'
              ],
              style: 'header',
              bold: false,
              
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
              fontSize: 11,
              bold: true,
              alignment: 'justify',
              lineHeight: 1,
              margin: [40, 0, 40, 0]
            }
          },

          header: {
            table: {
              widths: ['*', '*'],
              body: [
                [
                  {
                    image: 'data:image/png;base64,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',
                    width: 50,
                    alignment: 'left',
                    margin: [80, 80, 20, 20]
                    
                  },
                  {
                    image: 'data:image/png;base64,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',
                    width: 50,
                    alignment: 'left',
                    margin: [20, 10, 20, 20]
                  }
                ]
              ]
            },
            layout: 'noBorders'
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




