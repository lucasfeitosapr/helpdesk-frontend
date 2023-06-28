import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credenciais } from 'app/models/credenciais';
import { AuthService } from 'app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds: Credenciais = {
      email: "",
      senha: ""
  }

  email = new FormControl(null, Validators.email)
  senha = new FormControl(null, Validators.minLength(3))

  constructor(
    private toast: ToastrService,
    private service: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  logar() {
    this.service.authenticate(this.creds).subscribe(
      resposta => {
          console.log(resposta.headers.get('Authorization').substring(7));
          this.service.successfullLogin(resposta.headers.get('Authorization').substring(7));
          this.router.navigate(['']);
      }, 
      error => {
          this.toast.error('Usuário e/ou senha inválidos');
      }
  );
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid;
  }

}
