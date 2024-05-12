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
            // this.cookieService.set('namee', response.data.emple_Id);
            // this.cookieService.set('roleID', response.data.roles_Id);
      
            this.router.navigate(['/app/dashboard']);
          } else {
            // Maneja la respuesta de error
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
  
  
  

