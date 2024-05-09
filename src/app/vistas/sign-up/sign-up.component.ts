import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Alert } from '../../core/models/alert';
import { User } from '../../core/models/user';
import { AuthService } from '../../core/services/auth.service';
import { UtilsService } from '../../core/services/utils.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink,NavbarComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})

export class SignUpComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });
  constructor(private userSrv: AuthService, private utilsSrv: UtilsService) {}
  ngOnInit() {}
  async signUp() {
    if (this.form.valid && this.validarPassword()) {
      await this.userSrv
        .signUp(this.form.value as User)
        .then(() => {
          Alert.mensajeConfirmacion(`Se registro exitosamente!!`);
          this.userSrv.signIn(this.form.value as User);
          this.utilsSrv.routerLink('/home');
        })
        .catch((err) => {
          console.log(err);
          Alert.mensajeError(
            'Error!',
            'Puede que ya exista el usuario!'
          );
        });
    } else {
      Alert.mensajeError('Error!', 'Las contraseñas no coinciden!');
    }
  }
  validarPassword() {
    return this.form.value.password === this.form.value.confirmPassword;
  }
}
