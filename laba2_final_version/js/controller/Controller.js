export default class Controller {
    constructor(model, view){
        this.model = model;
        this.view = view;
        this.initOnModelChange();
        document.querySelector('#get_url').addEventListener('click', (e)=>this.addLink(e));
        document.querySelector('#main_table').addEventListener('click', (e)=>this.delLink(e));
    }

    addLink(e){ 
        let text = document.querySelector('#input_url').value;
        if(text == "") return;
        let links = text.split('\n');
        for(let i = 0; i < links.length; i++){
            let protocol_ok = links[i].startsWith("http://") || links[i].startsWith("https://") || links[i].startsWith("ftp://");
            if(!protocol_ok){
                links[i] = "https://"+ links[i];
            }
        }
        this.model.addShortUrl(links); 
    }

    delLink(e){
        e = e || window.event;
        let target = e.target || e.srcElement;
        if(target.id == 'del_link'){
            this.model.delLink(target.name);
        }else if(target.id == 'show_commet'){
            this.view.printMessage(this.model.getComment(target.name));
        }else if(target.id == 'change_commet'){
            let newComment = this.view.getText("Write comment");
            this.model.changeComment(target.name, newComment);
        }
    }

    initOnModelChange() {
        /* updates UI when a model list has changed (adds, deletes links) */
        let handler = {
            set: (obj, prop, val) => {
                obj[prop] = val;
                this.model.rewriteId();
                this.view.showAllLinks(this.model.links);
                this.view.clearInput();
                return true;
            }
        }
        this.model.links = new Proxy(this.model.links, handler);
    }


}