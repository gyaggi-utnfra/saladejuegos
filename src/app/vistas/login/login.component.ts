import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { UtilsService } from '../../core/services/utils.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Alert } from '../../core/models/alert';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [CommonModule, ReactiveFormsModule, NavbarComponent,RouterLink]
})
export class LoginComponent {

  form: FormGroup;
  usuarioStorage: any = {};
  constructor(
    private formBuilder: FormBuilder,
    private userSrv: AuthService,
    private utilsSrv: UtilsService
  ) {
    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {}
  async login() {
    console.log("Al menos aca pasa");
    await this.userSrv
      .signIn(this.form.value)
      .then(() => {
        this.form.disable();
        this.utilsSrv.routerLink('/home');
        Alert.mensajeConfirmacion(
          `Bienvenido ${this.userSrv.user.displayName}!!`
        );
      })
      .catch((err: any) => {
        console.log(err);
        Alert.mensajeError(
          'Error en el ingreso:',
          'Revise sus credenciales',
          '<p>Esta registrado? Se puede registrar <a href="/sign-up">aqui</a><p>'
        );
      });
  }

  cargarUsuario() {
    this.form.get('email')?.setValue(this.usuario.email);
    this.form.get('password')?.setValue(this.usuario.passwod);
  }

  usuario = {
    email: 'JuanSmith@gmail.com',
    passwod: '123456',
  };
}