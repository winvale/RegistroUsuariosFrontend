import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.css']
})
export class RegistroUsuariosComponent implements OnInit {
  ListaUsuarios: any[]=[];
  accion ='Agregar';
  form: FormGroup;
  id: number | undefined;

  constructor(private fb: FormBuilder, 
    private toastr: ToastrService,
    private _usuariosService: UsuariosService) {
    
    this.form=this.fb.group({
      nombre:['', Validators.required],
      cedula:['',[Validators.required, Validators.maxLength(19), Validators.minLength(1)]],
      correo:['',[Validators.required, Validators.email]],
      edad:['', [Validators.required, Validators.maxLength(3), Validators.minLength(1)]],
    })

   }
  
  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(){
  this._usuariosService.getListaUsuarios().subscribe(data => {
    console.log(data);
    this.ListaUsuarios = data;
  }, error => {console.log(error);
  })

  }
  agregarUsuario(){
    
    const registro: any = {
      nombre: this.form.get('nombre')?.value,
      cedula: this.form.get('cedula')?.value,
      correo: this.form.get('correo')?.value,
      edad: this.form.get('edad')?.value,
    }
    if(this.id==undefined){
      //nwe usuario
        this._usuariosService.saveUsuario(registro).subscribe(data => {
        this.toastr.success('Registro exitoso!', 'Usuario Registrado');
        this.obtenerUsuarios();
        this.form.reset
      }, error=>{
        this.toastr.error('Upp', 'error');
        console.log(error);
      
      })
    }else{
          registro.id=this.id;
          this. _usuariosService.updateUsuario(this.id,registro).subscribe(data=> {
          this.form.reset();
          this.accion='Agregar';
          this.id= undefined;
          this.toastr.success('Registro exitoso!', 'Usuario Actualizado');
          this.obtenerUsuarios();
        },error=>{
          console.log(error);
        })
    }
     
    
    
  }
  eliminarUsuario(id: number){
      this._usuariosService.deleteUsuario(id).subscribe(data=>{
        this.toastr.error('Registro eliminado exitoso', ' Registro eliminado' );
        this.obtenerUsuarios();
      },error=>{
        
      })
     
  }
  editarUsuario(registro:any){
       this.accion = 'Editar' ;
       this.id = registro.id;

       this.form.patchValue({
         nombre: registro.nombre,
         numeroCedula: registro.cedula,
         correo: registro.correo,
         edad:registro.edad

       })
  }
  
}
