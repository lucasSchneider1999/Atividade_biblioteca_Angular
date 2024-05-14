import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
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

  salvar(){
    alert("salvo com sucesso");
  }

}
