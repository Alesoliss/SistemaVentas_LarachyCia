import { Component,NgModule,OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {  UsuariosServiceService } from '../../api/Services/usuarios-service.service';


import { LoginVieweMOdel } from '../../api/Models/LoginViewModel';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-login',
    templateUrl:'./login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent {
    usuario: string = '';
    contrase: string = '';
    errorMessage: string = ''; // Usa el modelo de Usuario para vincular los datos del formulario
  
    constructor(private router: Router, private userService: UsuariosServiceService,private cookieService: CookieService,) {}
  

    
    onLogin() {
      this.userService.login(this.usuario, this.contrase).subscribe({
        next: (data) => {
          if (data.length > 0) {
            console.log('Login successful', data);
            // Almacena el nombre de usuario en el Local Storage
            this.cookieService.set('roleID', data[0].roles_Id); // Suponiendo que el nombre de usuario está en data[0].empl_Nombre
            console.log('Nombre de usuario almacenado:', data[0].roles_Id); // Agrega esta línea para mostrar el nombre de usuario en la consola
            this.router.navigate(['/app/dashboard']);
          } else {
            // Maneja la respuesta vacía como credenciales incorrectas
            this.errorMessage = 'Usuario o contraseña incorrectos';
            console.error('Login failed: Incorrect credentials');
          }
        },
        error: (error) => {
          this.errorMessage = 'Error en la conexión con el servidor';
          console.error('Login failed:', error);
        }
      });
    }
    
    
    
  }
  
  
  

