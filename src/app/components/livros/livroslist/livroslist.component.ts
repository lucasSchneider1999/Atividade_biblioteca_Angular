import { Component } from '@angular/core';
import { Livro } from '../../../models/livro';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-livroslist',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './livroslist.component.html',
  styleUrl: './livroslist.component.scss'
})
export class LivroslistComponent {
  
  lista: Livro[] = [];

  constructor(){

    this.lista.push(new Livro(1, "O iluminado"))
    this.lista.push(new Livro(2, "Mochileiro das galaxias"))
    this.lista.push(new Livro(3, "senhor dos aneis"))
    this.lista.push(new Livro(4, "Os mentirosos"))

    let livroNovo = history.state.livroNovo;
    let livroEditado = history.state.livroEditado;

    if (livroNovo){
      livroNovo.id = 999;
      this.lista.push(livroNovo);
    }

    if (livroEditado){
      let index = this.lista.findIndex(x => {return x.id == livroEditado.id});
      this.lista[index] = livroEditado;
    }

  }

  deletar(id:number){
    if(confirm("deseja deletar?")){
      let index = this.lista.findIndex(x => {return x.id == id});
      this.lista.splice(index, 1);
      alert("livro deletado");
    }
  }

}
