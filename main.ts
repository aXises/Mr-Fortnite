import * as Nikku from "nikku"

const initializer: Nikku.CoreInitializer = {
    configurationPath: "config.json",
}

const core = new Nikku.NikkuCore(initializer);

const importer: Nikku.CommandImporter = new Nikku.CommandImporter();
importer.registerPath("commands");

core.start()
