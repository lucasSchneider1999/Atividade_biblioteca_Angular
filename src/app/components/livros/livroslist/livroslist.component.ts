import { Component, TemplateRef, ViewChild, inject, viewChild } from '@angular/core';
import { Livro } from '../../../models/livro';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { LivrosdetailsComponent } from '../livrosdetails/livrosdetails.component';

@Component({
  selector: 'app-livroslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, LivrosdetailsComponent],
  templateUrl: './livroslist.component.html',
  styleUrl: './livroslist.component.scss'
})
export class LivroslistComponent {
  
  lista: Livro[] = [];
  livroEdit: Livro = new Livro(0, "");

  //Elementos da modal
  modalService = inject(MdbModalService); //serve para poder abrir a modal
  @ViewChild("modalLivrosDetalhe") modalLivrosDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;



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

    Swal.fire({
      title: 'Aviso!',
      text: 'deseja deletar?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Deletar',
      denyButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        let index = this.lista.findIndex(x => {return x.id == id});
        this.lista.splice(index, 1);

        Swal.fire({
          title: 'Deletado com Sucesso!',
          icon: 'success',
          confirmButtonText: 'OK'
        })
      }
    });

  }

  new(){
    this.livroEdit = new Livro(0, "");
    this.modalRef = this.modalService.open(this.modalLivrosDetalhe);
  }

  edit(livro: Livro){
    this.livroEdit = Object.assign({}, livro); //clonando para evitar referencia de objeto
    this.modalRef = this.modalService.open(this.modalLivrosDetalhe);
  }

  retornoDetalhe(livro: Livro){

    if(livro.id > 0){
      let index = this.lista.findIndex( x => {return x.id == livro.id});
      this.lista[index] = livro;
    }else{
      livro.id = 999
      this.lista.push(livro);
    }

    this.modalRef.close();
  }

}
