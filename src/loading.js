export default class loading{
    constructor(exclusive=true){
        this.resolved=true;
        this.err=undefined;
        this.exclusive=exclusive;
    }
    async wrap(fn){
        if(this.exclusive && !this.resolved){return;}
        this.resolved=false;
        this.err=undefined;
        try{
            await fn();
        }catch(e){
            this.err=e;
        }
        this.resolved=true;
    }
}