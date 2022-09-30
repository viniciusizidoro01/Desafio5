import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmesComponent } from './filmes/filmes.component';
import { GeneroComponent } from './genero/genero.component';
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

// router no app-routing.module.ts para trocar o texto no header 
const routes: Routes = [
{path:'', redirectTo:'home',pathMatch:'full'},
{path:'home',component:HomeComponent},
{path:'usuarios',component:UsuariosComponent},
{path:'genero',component:GeneroComponent},
{path:'filmes',component:FilmesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
