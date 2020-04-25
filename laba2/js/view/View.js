export default class View {
    constructor(){}
    
    showAllLinks(links){
        if(links.length == 0){
            document.getElementById("main_table").innerHTML = "<tr><td>There will be your links here</td></tr>";
            return;
        }
        let tableHtmlText = "<tr><th>№</th><th>old Link</th><th>new Link</th><th>Del</th></tr>";
        for(let i = 0; i < links.length; i++){
            tableHtmlText +=
             "<tr><td>" + links[i].id + "</td><td><a target= \"_blank\" href = \"" + links[i].link + "\">" + links[i].link 
              +"</a></td><td><a target=\"_blank\" href = \"" + links[i].newLink + "\">" + links[i].newLink +"</a></td><td><button id = \"del_link\" name = \"" + links[i].id + "\">Del</button></td></tr>" 
        }
        document.getElementById("main_table").innerHTML = tableHtmlText;
    }

    clearInput(){
        document.getElementById('input_url').value = "";
    }
}