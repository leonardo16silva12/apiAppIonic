import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { Usuario } from '../models/Usuario';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public listaUsuarios: any = [];
  public pagina = 1;
  public totalPaginas = 1;
  public usuario: Usuario = {};
  public id: number;

  constructor(
    private userService: UserService,
    public alertController: AlertController,
  ) {}

  ionViewWillEnter() {
    this.buscarUsuarios(1);
  }

  public buscarUsuarios(pagina: number) {
    if(pagina <= 0) {
      pagina = 1;
    }
    this.pagina = pagina;

    this.userService.buscarTodos(pagina).subscribe(dados => {
      this.listaUsuarios = dados['data'];
      this.totalPaginas = dados['total_pages'];
      console.log(this.listaUsuarios);

    });
  }

  async showAlertDelete() {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: 'Você tem certeza que deseja deletar o usuário?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Ok',
          handler: () => {
            this.userService.deletar(this.usuario);
          }
        }
      ]
    });
  
    await alert.present();
  }

  public async deletar(id: number) {
    console.log(this.usuario);
    this.usuario.id = id;
    console.log(this.usuario);
    this.showAlertDelete();

  }

}
