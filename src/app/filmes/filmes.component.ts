import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { GeneroInterface } from '../genero/genero.component';

//dados mattable
export interface FilmesInterface {
  id:number;
  filme: string;
  genero:string;
}

const ELEMENT_DATA: FilmesInterface[] = [
  {id: 1, filme: 'Os outros', genero: 'Terror'},
  {id: 2, filme: 'Até o último homem', genero: 'Acão'},
  {id: 3, filme: 'O máscara', genero: 'Comédia'},
];

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.scss']
})

  export class FilmesComponent implements OnInit {

    private url= "http://localhost:3000/filmes";
    private url2= "http://localhost:3000/genero";
    public listaFilme:any;
    public formFilme!: FormGroup;
    public listaGenero:any;
    public filmeId:number = 0

  constructor(
    private httpClient:HttpClient,
    private formBuilder:FormBuilder,

  ) { }

  get Filmes(){
    return this.listaFilme
  }

  set filmes(filme:FilmesInterface){
    this.listaFilme.push(filme)
  }

  lerFilme():Observable<FilmesInterface[]>{
    return this.httpClient.get<FilmesInterface[]>(this.url)
  }

  lerGenero():Observable<GeneroInterface[]>{
    return this.httpClient.get<GeneroInterface[]>(this.url2)
  }

  salvarFilmeAPI(objetoFilme:FilmesInterface): Observable<FilmesInterface>{
    return this.httpClient.post<FilmesInterface>(this.url,objetoFilme)
  }

  excluirFilmeAPI(id:number){
    return this.httpClient.delete<FilmesInterface>(`${this.url}/${id}`)
  }

  editarFilmeAPI (objetoFilme:FilmesInterface): Observable<FilmesInterface>{
    return this.httpClient.put<FilmesInterface>(`${this.url}/${objetoFilme.id}`, objetoFilme)
  }

  ngOnInit(): void {
    this.lerFilme().subscribe({
      next:(filmes:FilmesInterface[])=>{
        this.listaFilme=filmes;
        console.log(this.listaFilme)
      },
    error:()=>{
      console.log("erro ao importar filmes");
      }
    })

    this.lerGenero().subscribe({
      next:(generos:GeneroInterface[])=>{
        this.listaGenero=generos;
        console.log(this.listaGenero)
      },
    error:()=>{
      console.log("erro ao importar genero");
      }
    })

    this.formFilme=this.formBuilder.group({
      filmeInput: new FormControl('',[Validators.required]),
      generoInput: new FormControl('',[Validators.required])
    })
  }

// Função CRUD

salvarDados (){
  console.log ('salvarDados')
  console.log (this.filmeId)
  if (this.filmeId > 0 ) {
    this.updateFilme()
  }
  else{
    const id = (this.listaFilme[(this.listaFilme.length)-1].id) + 1
    console.log(id)
    const filme = this.formFilme.controls['filmeInput'].value
    console.log(filme)
    const genero = this.formFilme.controls['generoInput'].value
    console.log(genero)
    const objetoFilme:FilmesInterface={id:id, filme:filme, genero:genero}
    console.log('objetoFilme')

    this.salvarFilmeAPI(objetoFilme).subscribe({
      next:()=>{
        this.ngOnInit()
      },
      error:()=>{
        console.log("Erro de importação de filme");
      }
    })
  }
}

excluirFilme(id:number){
  this.excluirFilmeAPI(id).subscribe({
    next:()=>{
    },
    error:()=>{
      console.log("erro ao excluir filmes");
    }
  })
  this.ngOnInit()
}

editarFilme(filme:FilmesInterface){
  console.log("editarFilme")
  this.filmeId = filme.id
  const EditFilme = this.formFilme.controls['filmeInput'].setValue(filme.filme);
  const EditGenero = this.formFilme.controls['generoInput'].setValue(filme.genero);
}

updateFilme(){
  const id = this.filmeId
  const filme = this.formFilme.controls['filmeInput'].value
  const genero = this.formFilme.controls['generoInput'].value
  const objetoFilme:FilmesInterface={id:id, filme:filme, genero:genero}
  this.editarFilmeAPI(objetoFilme).subscribe(
    {
      next:()=>{
        this.filmeId = 0
        this.ngOnInit()
      },error:()=>{
        console.log('erro');
      }
    }
  )
}

  txtFormControl = new FormControl('', [Validators.required]);
  displayedColumns: string[] = ['filme', 'genero',  'botao'];
  dataSource = ELEMENT_DATA;

}


