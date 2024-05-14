import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Livro } from '../../../models/livro';

@Component({
  selector: 'app-livrosdetails',
  standalone: true,
  imports: [MdbFormsModule, RouterOutlet, FormsModule],
  templateUrl: './livrosdetails.component.html',
  styleUrl: './livrosdetails.component.scss'
})

export class LivrosdetailsComponent {

  livro: Livro = new Livro(0, "");
  //servve para pegar um parametro de rota
  router = inject(ActivatedRoute);
  //serve para redirecionar para outra rota
  router2 = inject(Router);

  constructor(){
    let id = this.router.snapshot.params['id'];
    if(id > 0){
      this.findById(id);
    }
  }

  findById(id: number){
    let livroRetornado: Livro = new Livro(id, "editado");
    this.livro = livroRetornado;
  }

  salvar(){
    if(this.livro.id > 0){
      alert("editado com sucesso");
      this.router2.navigate(['admin/livros'], {state: {livroEditado: this.livro}})
    }else{
      alert("salvo com sucesso");
      this.router2.navigate(['admin/livros'], {state: {livroNovo: this.livro}})
    }
  }

}
