const { Genders, Regions, SkillLevels, Genres } = require('../models');
const LoadDataHelper = require('../lib/loadFormData.js');
const UserHelper = require('../helpers/UserHelper.js');
const skillLevels = ["HS Varsity / Regular at Rec Leagues", "D3 / Club Team", 
                    "D2 / Competitive Traveling Club Team", "D1", 
                    "Semi-Pro / Overseas"];
const nycRegions = ["Brooklyn Heights", "Bushwick", "Chelsea", "Chinatown",
                    "East Village", "FiDi", "Gramercy", "Harlem", "Hell's Kitchen",
                    "Hell's Kitchen", "LES", "Midtown", "Murray Hill", "Park Slope",
                    "Tribeca", "UES", "UWS", "West Village", "Williamsburg"];

const InitializeController = {

    /* There are some initial data points that should exist in the database 
     * from the beginning of time (eg. genders male and female). They should be
     * in the database now but in case it gets wiped you can make a post 
     * request to /initialize and the template data will be created.
     */
    initializeData: async function(req, res) {
        await Genders.findOrCreate({
            where: {name: "Female"}
        });
        await Genders.findOrCreate({
            where: {name: "Male"}
        });

        skillLevels.forEach(async function(skillLevelName) {
            await SkillLevels.findOrCreate({
                where: {name: skillLevelName}
            });
        });

        nycRegions.forEach(async function(regionName) {
            await Regions.findOrCreate({
                where: {name: regionName}
            });
        });

        await Genres.findOrCreate({
            where: { name: "Basketball"}
        });

        return res.send("Done!");
    },

    loadData: async function(req, res) {
        try {
            let data = await LoadDataHelper.loadCSV("./lib/data.csv");
            let newUsers = await LoadDataHelper.parseData(data);
            // console.log(newUsers);
            await LoadDataHelper.createModelEntries(newUsers);
        } catch(err) {
            console.log(":(\n", err);
            return res.send("Fail!");
        }

        return res.send("Done!");
    }

}

module.exports = InitializeController;