onmessage = function(e){

    let id = e.data.id;
    let links = e.data.links;
    let newLinks = [];
    links.forEach(link => {
        let newLink = getRandomLink(e.data.href); 
        newLinks.push({"id":id, "link":link, "newLink":newLink, "comment":"without comment"});
    });
    postMessage(newLinks);
}

function getRandomLink(href){
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let newLink = href;
    for(let i = 0; i < 5; i++)
        newLink += possible.charAt(Math.floor(Math.random() * possible.length));
    return newLink;
}
