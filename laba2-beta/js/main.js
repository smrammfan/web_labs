import Model from "./model/model.js"
import Controller from "./controller/Controller.js"
import View from "./view/View.js"

let model = new Model();
let view = new View();
let contoller = new Controller(model, view);
