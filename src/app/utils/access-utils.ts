export class AccessUtils {

    public static canAccess(uri){
        let publicFunctions = ['/login', '/home', '/dashboard'];
        let owenerFunctions= [''];
        let transcriptorFunctions = [''];
        let map = new Map<string,string[]>();
        map.set('owner',owenerFunctions);
        map.set('transcriptor',transcriptorFunctions);
        console.log(uri);
        //si es publica, nome importa nada
        if (publicFunctions.indexOf(uri) > -1) {
            console.log('funcion publico');
            return true;
        }
        let user = JSON.parse(localStorage.getItem('currentUser'));
        // usuario no logueado
        if(user==null){
            return false;
        }
        //si es admin, si a todo
        if (user.admin){
            return true;
        }
       
        //checkear rol;
        console.log();
        return false;
    }
}