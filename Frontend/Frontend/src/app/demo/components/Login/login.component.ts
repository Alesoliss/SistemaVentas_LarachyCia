import { Component,OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {  UsuariosServiceService } from '../../api/Services/usuarios-service.service';


import { LoginVieweMOdel } from '../../api/Models/LoginViewModel';
@Component({
    selector: 'app-login',
    templateUrl:'./login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent {
    usuario: string = '';
    contrase: string = '';
    errorMessage: string = ''; // Usa el modelo de Usuario para vincular los datos del formulario
  
    constructor(private router: Router, private userService: UsuariosServiceService) {}
  

    
    onLogin() {
      this.userService.login(this.usuario, this.contrase).subscribe({
        next: (data) => {
          if (data.length > 0) {
            console.log('Login successful', data);
            // Almacena el nombre de usuario en el Local Storage
            this.router.navigate(['/app/dashboard']);
            // Redirecciona al usuario o realiza acciones post-login
            // Redirecciona al usuario con los parámetros de consulta
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
  


