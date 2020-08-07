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
        let functionName = '';
        if(this.isFunction(uri)){
            functionName=this.getFunction(uri);
        }
        let found = false;
        functionsUser.forEach(functionUser => {
            if (this.getFunction(functionUser)==functionName){
                found=true;
            }
        });
        return found;
    }

    public static checkUri(uri, functionsUser) {
        let found = false;
        functionsUser.forEach(functionUser => {
            if (functionUser.includes(uri)) {
                found = true;
            }
        });
        return found;
    }

    public static canAccess(uri){
        console.log('uri receibed',uri);
        if(this.isNull(uri)){
            return false;
        }
        let publicFunctions = [
            '/login', 
            '/home', 
            '/dashboard', 
            '/collections/list', 
            '/work', 
            '/transcribe'
        ];

        /** publicas mas .. */
        let owenerFunctions = [
            '/search',
            '/startproject',
            '/user/profile',
            '/work:activities', 
            '/work:configuration', 
            '/transcribe:transcribe', 
            '/collections/list:config', 
            '/collections/list:activities',
            '/page-version'
        ];
        
//        let owenerFunctions = ['/work:activities', '/work:configuration', '/transcribe:transcribe', '/collections/list:config', '/collections/list:activities'];
        let transcriptorFunctions = [
            '/startproject',
            '/user/profile',
            '/page-version',
            '/work:activities',
            '/work:configuration',
            '/transcribe:transcribe',
            '/collections/list:config',
            '/collections/list:activities', 
            '/search', 
            '/ontology'];
        let superfunciones = [];
        superfunciones=superfunciones.concat(publicFunctions);
        
        console.log(uri);
        
        let user = JSON.parse(localStorage.getItem('currentUser'));
        
        if (user && user.admin) {
            superfunciones=superfunciones.concat(transcriptorFunctions)
        }
        if (user && !user.admin) {
            superfunciones = superfunciones.concat(owenerFunctions)
        }

        
        console.log(superfunciones);
        if(this.isOnlyUri(uri)){
            if(this.checkUri(uri,superfunciones)){
                return true;
            }
        }
        if(this.checkFunction(uri,superfunciones)){
            return true;
        }

        return false;
    }
}