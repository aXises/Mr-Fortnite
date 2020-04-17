"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Nikku = require("nikku");
const initializer = {
    configurationPath: "config.json",
};
const core = new Nikku.NikkuCore(initializer);
const importer = new Nikku.CommandImporter();
importer.registerPath("commands");
core.start();
