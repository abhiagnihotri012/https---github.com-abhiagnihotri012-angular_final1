import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PostComponent } from './post/post.component';
const routes: Routes = [
  {path : '' , redirectTo: 'home', pathMatch : 'full'},
  {path : 'login' , component: LoginComponent},
  {path : 'register' , component: RegisterComponent},
  {path : 'home' , component: HomeComponent},
  {path : 'post' , component: PostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
