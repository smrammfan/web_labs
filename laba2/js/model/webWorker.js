onmessage = function(e){
    let id = e.data.id;
    let link = e.data.link;
    let newLink = getRandomLink(e.data.href); 
    postMessage({"id":id, "link":link, "newLink":newLink});
}

function getRandomLink(href){
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let newLink = href;
    for(let i = 0; i < 5; i++)
        newLink += possible.charAt(Math.floor(Math.random() * possible.length));
    return newLink;
}
