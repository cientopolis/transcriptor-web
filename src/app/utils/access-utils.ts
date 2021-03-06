export class AccessUtils {

    public static isNull(param){
        return param==null
    }

    public static getFunction(uri){
        if(this.isNull(uri)){
            return null;
        }
        if (uri.includes(':')) {
            return uri.split(':')[1];
        }
        return null;        
    }

    public static isFunction(uri){
        return !this.isNull(this.getFunction(uri));
    }
    public static isOnlyUri(uri){
        return !this.isFunction(uri);
    }

    public static checkFunction(uri,functionsUser){
        let functionName = uri;
/*         if(this.isFunction(uri)){
            functionName=this.getFunction(uri);
        } */
        let found = false;
        functionsUser.forEach(functionUser => {
            if (functionUser.uri==functionName){
                found=true;
            }
        });
        return found;
    }

    public static checkUri(uri, functionsUser) {
        let found = false;
        functionsUser.forEach(functionUser => {
            if (functionUser.uri.includes(uri)) {
                found = true;
            }
        });
        return found;
    }

    public static canAccess(uri){
        if(this.isNull(uri)){
            return false;
        }
        let publicFunctions = [
            {uri:'/login'}, 
            {uri:'/home'}, 
            {uri:'/dashboard'}, 
            {uri:'/collections/list'}, 
            {uri:'/work'}, 
            {uri:'/transcribe'}
        ];

        let functions: Array<any> = JSON.parse(localStorage.getItem('functions'));
        let user = JSON.parse(localStorage.getItem('currentUser'));
        if (!functions){
            functions = publicFunctions;
        }     
        if(this.isOnlyUri(uri)){
            if (this.checkUri(uri, functions)){
                return true;
            }
        }
        if (this.checkFunction(uri, functions)){
            return true;
        }

        return false;
    }
}