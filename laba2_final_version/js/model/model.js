export default class Model {
    constructor(){
        this.links = [];
    }

    addShortUrl(newLinks){
        let id = (this.links.length == 0 ? 1: this.links[this.links.length - 1].id + 1);
        if(window.Worker){
            let worker = new Worker("js/model/webWorker.js");
            worker.postMessage({"href":window.location.href, "id":id, "links":newLinks});
            
            worker.onmessage = function(e){
                e.data.forEach(link => {
                    this.links.push(link);
                });
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

    getComment(id){
        const linkIndex = this.links.findIndex((link) => parseInt(link.id) === parseInt(id));
        return this.links[linkIndex].comment;
    }

    changeComment(id, newComment){
        const linkIndex = this.links.findIndex((link) => parseInt(link.id) === parseInt(id));
        this.links[linkIndex].comment = newComment;
    }

    rewriteId(){
        for(let i = 0; i < this.links.length; i++){
            this.links[i].id = i + 1;
        }
    }
}