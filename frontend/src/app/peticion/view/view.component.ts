import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../peticion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Peticion } from '../peticion';   

import { AuthStateService } from 'src/app/shared/auth-state.service';
import { AuthService } from 'src/app/shared/auth.service';


      
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  id!: number;
  peticion!: Peticion;
  image:string="";
  categoria:number=0;
  loggedUser: any;
  isSignedIn!: boolean;

  private serverURL = "http://localhost:8000/"
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public peticionService: PeticionService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthStateService,
    private authService: AuthService,
    
   ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */

  ngOnInit(): void {
    this.id = this.route.snapshot.params['peticionId'];
        
    this.peticionService.find(this.id).subscribe((data: any)=>{
      this.peticion = data;
      this.image=this.serverURL+this.peticion.files[0].file_path;
      this.categoria=this.peticion.categoria.nombre;
    });

    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
    });
    this.getUserLogged();
  }

  firmar(id:number){
    this.peticionService.firmar(this.id).subscribe((data:any)=>{
      this.peticion=data;
      this.categoria=this.peticion.categoria.nombre;
      this.image=this.serverURL+this.peticion.files[0].file_path;
    })
    this.router.navigateByUrl('peticion/index')
  }
  
  cambiarEstado(peticion:Peticion){
    this.peticionService.cambiarEstado(peticion.id).subscribe((data:Peticion)=>{
    })
    this.router.navigateByUrl('peticion/index');
  }

  getUserLogged(){
    this.authService.profileUser().subscribe((data)=>{
      this.loggedUser = data;
      console.log(this.loggedUser)
    })
    console.log(this.loggedUser)
  }
}