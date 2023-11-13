import {
  AuthenticationBindings,
  AuthenticationMetadata,
  AuthenticationStrategy,
} from '@loopback/authentication';
import{inject} from '@loopback/context'
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {log} from 'console';
import parseBearerToken from 'parse-bearer-token';



export class AuthStrategy implements AuthenticationStrategy {
  name: string = 'auth';

  constructor(
    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata[],
  ) {}

  /**
   * autenticacion de un usuario frente a una accion en la base de datos
   * @param request la solicitud con el token
   * @returns el perfil del usuario, undefined cuando no tiene permiso o httpError[401] cuando no tiene token
   */

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    let token = parseBearerToken(request);
    console.log(request);
    
    if (token) {
      let idPermissions: string = this.metadata[0].options![0];
      let accion: string = this.metadata[0].options![1];
      console.log(this.metadata);
      console.log("Conectar con ms-seguridad");

      let continuar:boolean =false;
      if (continuar){
        let perfil: UserProfile = Object.assign({
          permitido:"OK"
        });
        return perfil;
      }else {
        return undefined;
      }
    }
    throw new HttpErrors[401]('No es posible ejecutar la acción por falta de un token.')
  }
}