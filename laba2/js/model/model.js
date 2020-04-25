export default class Model {
    constructor(){
        this.links = [];
    }

    addShortUrl(link){
        let id = (this.links.length == 0 ? 1: this.links[this.links.length - 1].id + 1);
        if(window.Worker){
            let worker = new Worker("js/model/webWorker.js");
            worker.postMessage({"href":window.location.href, "id":id, "link":link});
            
            worker.onmessage = function(e){
                this.links.push(e.data);
                worker.terminate();
                worker = undefined;
            }.bind(this);
        }else {
            document.getElementById("main_table").innerHTML = "<tr><td>Use good browser, please</td></tr>";
        }
    }

    delLink(id){
       const linkIndex = this.links.findIndex((link) => parseInt(link.id) === parseInt(id));
       this.links.splice(linkIndex, 1);
    }

    rewriteId(){
        for(let i = 0; i < this.links.length; i++){
            this.links[i].id = i + 1;
        }
    }
}