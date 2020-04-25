export default class Controller {
    constructor(model, view){
        this.model = model;
        this.view = view;
        this.initOnModelChange();
        document.querySelector('#get_url').addEventListener('click', (e)=>this.addLink(e));
        document.querySelector('#main_table').addEventListener('click', (e)=>this.delLink(e));
    }

    addLink(e){ 
        let link = document.querySelector('#input_url').value;
        let protocol_ok = link.startsWith("http://") || link.startsWith("https://") || link.startsWith("ftp://");
        if(!protocol_ok){
            link = "https://"+ link;
        }
        this.model.addShortUrl(link);
    }

    delLink(e){
        e = e || window.event;
        let target = e.target || e.srcElement;
        if(target.id == 'del_link'){
            this.model.delLink(target.name);
        }
    }

    initOnModelChange() {
        /* updates UI when a model list has changed (adds, deletes links) */
        let handler = {
            set: (obj, prop, val) => {
                obj[prop] = val;
                this.view.showAllLinks(this.model.links);
                this.view.clearInput();
                return true;
            }
        }
        this.model.links = new Proxy(this.model.links, handler);
    }


}