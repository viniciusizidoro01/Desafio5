import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';

//dados mattable
export interface User {
  id:string;
  genero:string;
}

const ELEMENT_DATA: User[] = [
  {id: '1', genero: 'Ação'},
  {id: '2', genero: 'Terror'},
  {id: '3', genero: 'Comédia'},
];


@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.scss']
})
export class GeneroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  txtFormControl = new FormControl('', [Validators.required]);
  displayedColumns: string[] = ['genero', 'botao'];
  dataSource = ELEMENT_DATA;
}
