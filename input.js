export class InputHandler {
    constructor() {
        this.keys = [];
        this.useOnce = [];
        window.addEventListener('keydown', e=>{
            if ( this.keys.indexOf(e.key)===-1) {
                this.keys.push(e.key);            
            }
            if (this.useOnce.indexOf(e.key)==-1) {
                this.useOnce.push(e.key);
            }
        });
        window.addEventListener('keyup', e=> {
            let i = this.keys.indexOf(e.key);
            if ( i != -1) {
                this.keys.splice(i, 1);
            }
            i = this.useOnce.indexOf(e.key);
            if (i != -1) {
                this.useOnce.splice(i, 1);
            }
        });
    }

    useKey(key) {
        let i = this.useOnce.indexOf(key);
        if (i != -1) {
            this.useOnce.splice(i, 1);
        }
        return i != -1; //Return true if we used the key
    }
}