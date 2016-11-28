var folder = "img";

let path = {
    backgroung: "HelloWorld.png",
    someimg: "HelloWorld.png"
}

for (let key in path){
    path[key] = folder + '/' + path[key];
}

module.exports = path;