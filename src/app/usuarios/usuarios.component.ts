import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';


//dados mattable
export interface User {
  id:string;
  name: string;
  email:string;
  telefone:string;
}

const ELEMENT_DATA: User[] = [
  {id: '1', name: 'Paulo Andre', email: 'paulo@email.com', telefone: '3349 6788'},
  {id: '2', name: 'Joao Andre', email: 'marcos@email.com', telefone: '3349 6788'},
  {id: '3', name: 'Laura Port', email: 'laura@email.com', telefone: '3349 6788'},

];

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})

  export class UsuariosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  txtFormControl = new FormControl('', [Validators.required]);
  displayedColumns: string[] = ['name', 'email', 'telefone', 'botao'];
  dataSource = ELEMENT_DATA;
  
}


