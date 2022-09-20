import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';


//dados mattable
export interface User {
  id:string;
  filme: string;
  genero:string;
}

const ELEMENT_DATA: User[] = [
  {id: '1', filme: 'Os outros', genero: 'Terror'},
  {id: '2', filme: 'Até o último homem', genero: 'Acão'},
  {id: '3', filme: 'O máscara', genero: 'Comédia'},
];

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.scss']
})

  export class FilmesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  txtFormControl = new FormControl('', [Validators.required]);
  displayedColumns: string[] = ['filme', 'genero',  'botao'];
  dataSource = ELEMENT_DATA;
  
}