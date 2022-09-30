import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//dados mattable
export interface UsuariosInterface {
  id:number;
  name: string;
  email:string;
  telefone:string;
}

const ELEMENT_DATA: UsuariosInterface[] = [
  {id: 1, name: 'Paulo Andre', email: 'paulo@email.com', telefone: '33496788'},
  {id: 2, name: 'Joao Andre', email: 'marcos@email.com', telefone: '33496788'},
  {id: 3, name: 'Laura Port', email: 'laura@email.com', telefone: '33496788'},
];

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})

  export class UsuariosComponent implements OnInit {

    private url= "http://localhost:3000/usuarios";
    public listaUsuario:any
    public formUsuarios! :FormGroup;
    public usuariosId:number=0

  constructor(
    private httpClient:HttpClient,
    private formBuilder:FormBuilder
  ) { }

  get usuarios(){
    return this.listaUsuario
  }

  set usuarios(usuario:UsuariosInterface){
    this.listaUsuario.push(usuario)
  }

  lerUsuario():Observable<UsuariosInterface[]>{
    return this.httpClient.get<UsuariosInterface[]>(this.url)
  }

  salvarUsuarioAPI(objetoUsuario:UsuariosInterface): Observable<UsuariosInterface>{
    return this.httpClient.post<UsuariosInterface>(this.url,objetoUsuario)
  }

  excluirUsuarioAPI(id:number){
    console.log(id)
    return this.httpClient.delete<UsuariosInterface>(`${this.url}/${id}`)
  }

  editarUsuarioAPI (objetoUsuario:UsuariosInterface): Observable<UsuariosInterface>{
    return this.httpClient.put<UsuariosInterface>(`${this.url}/${objetoUsuario.id}`, objetoUsuario)
  }

  ngOnInit(): void {

    this.lerUsuario().subscribe({
      next:(usuarios:UsuariosInterface[])=>{
        this.listaUsuario=usuarios;
        console.log(this.listaUsuario)
      },
    error:()=>{
      console.log("erro ao importar usuários");
      }
    })

    this.formUsuarios=this.formBuilder.group({
      usuarioInput: new FormControl('',[Validators.required]),
      emailFormControl: new FormControl('',[Validators.required]),
      txtFormControl: new FormControl('',[Validators.required])
    })
  }

// Função CRUD
salvarDados (){
  if (this.usuariosId > 0 ) {
    this.updateUsuario()
  }
  else{
    const id = (this.listaUsuario[(this.listaUsuario.length)-1].id) + 1
    const usuario = this.formUsuarios.controls['usuarioInput'].value
    const email = this.formUsuarios.controls['emailFormControl'].value
    const telefone = this.formUsuarios.controls['txtFormControl'].value
    const objetoUsuario:UsuariosInterface={id:id, name:usuario, email:email, telefone:telefone}
    this.salvarUsuarioAPI(objetoUsuario).subscribe({
      next:()=>{
        this.ngOnInit()
      },
      error:()=>{
        console.log("Erro de importação de genero");
      }
    })
  }
}

excluirUsuario(id:number){
  this.excluirUsuarioAPI(id).subscribe({
    next:()=>{
    },
    error:()=>{
      console.log("erro ao excluir gêneros");
    }
  })
  this.ngOnInit()
}

editarUsuario(objetousuario:UsuariosInterface){
  this.usuariosId = objetousuario.id
  this.formUsuarios.controls['usuarioInput'].setValue(objetousuario.name);
  this.formUsuarios.controls['emailFormControl'].setValue(objetousuario.email);
  this.formUsuarios.controls['txtFormControl'].setValue(objetousuario.telefone);
}

updateUsuario() {
  const id = this.usuariosId
  const usuario = this.formUsuarios.controls['usuarioInput'].value;
  const email = this.formUsuarios.controls['emailFormControl'].value
  const telefone = this.formUsuarios.controls['txtFormControl'].value
  const objetoUsuario:UsuariosInterface={id:id, name:usuario, email:email, telefone:telefone}
  this.editarUsuarioAPI(objetoUsuario).subscribe(
    {
      next:()=>{
        this.usuariosId = 0
        this.ngOnInit()
      },error:()=>{
        console.log('erro');
      }
    }
  )
}


//Informações Table
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  txtFormControl = new FormControl('', [Validators.required]);
  displayedColumns: string[] = ['name', 'email', 'telefone', 'botao'];
  dataSource = ELEMENT_DATA;
}


