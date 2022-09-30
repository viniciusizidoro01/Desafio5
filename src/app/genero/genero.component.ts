import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

//dados mattable
export interface GeneroInterface {
  id:number;
  genero:string;
}

const ELEMENT_DATA: GeneroInterface[] = [
  {id: 1, genero: 'Ação'},
  {id: 2, genero: 'Terror'},
  {id: 3, genero: 'Comédia'},
];

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.scss']
})

export class GeneroComponent implements OnInit {

  private url= "http://localhost:3000/genero";
  public listaGenero:any
  public formGenero!:FormGroup;
  public generoId:number=0

  constructor(
    private httpClient:HttpClient,
    private formBuilder:FormBuilder
    ) { }

  get generos(){
    return this.listaGenero
  }

  set generos(genero:GeneroInterface){
    this.listaGenero.push(genero)
  }

  lerGenero():Observable<GeneroInterface[]>{
    return this.httpClient.get<GeneroInterface[]>(this.url)
  }

  salvarGeneroAPI(objetoGenero:GeneroInterface): Observable<GeneroInterface>{
    return this.httpClient.post<GeneroInterface>(this.url,objetoGenero)
  }

  excluirGeneroAPI(id:number){
    return this.httpClient.delete<GeneroInterface>(`${this.url}/${id}`)
  }

  editarGeneroAPI (objetoGenero:GeneroInterface): Observable<GeneroInterface>{
    return this.httpClient.put<GeneroInterface>(`${this.url}/${objetoGenero.id}`, objetoGenero)
  }

  ngOnInit(): void {
    this.lerGenero().subscribe({
      next:(generos:GeneroInterface[])=>{
        this.listaGenero=generos;
        console.log(this.listaGenero)
      },
    error:()=>{
      console.log("erro ao importar gêneros");
      }
    })

    this.formGenero=this.formBuilder.group({
      generoInput: new FormControl('',[Validators.required])
    })
  }


//FUNÇÃO CRUD

  salvarDados (){
    if (this.generoId > 0 ) {
      this.updateGenero()
    }
    else{
      const id = (this.listaGenero[(this.listaGenero.length)-1].id) + 1
      console.log(id)
      const genero = this.formGenero.controls['generoInput'].value
      console.log(genero)
      const objetoGenero:GeneroInterface={id:id, genero:genero}
      console.log(objetoGenero)

      this.salvarGeneroAPI(objetoGenero).subscribe({
        next:()=>{
          this.ngOnInit()
        },
        error:()=>{
          console.log("Erro de importação de genero");
        }
      })
    }
  }

  excluirGenero(id:number){
    this.excluirGeneroAPI(id).subscribe({
      next:()=>{
      },
      error:()=>{
        console.log("erro ao excluir gêneros");
      }
    })
    this.ngOnInit()
  }

  editarGenero(genero:GeneroInterface){
    console.log("editarGenero")
    this.generoId = genero.id
    const EditGenero = this.formGenero.controls['generoInput'].setValue(genero.genero);
  }

  updateGenero() {
    const id = this.generoId
    const genero = this.formGenero.controls['generoInput'].value
    const objetoGenero:GeneroInterface={id:id, genero:genero}
    this.editarGeneroAPI(objetoGenero).subscribe(
      {
        next:()=>{
          this.generoId = 0
          this.ngOnInit()
        },error:()=>{
          console.log('erro');
        }
      }
    )
  }

  //Informações da TABLE
  txtFormControl = new FormControl('', [Validators.required]);
  displayedColumns: string[] = ['genero', 'botao'];
  dataSource = ELEMENT_DATA;
}
