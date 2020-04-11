const Papa = require('papaparse');
const fs = require('fs');
const file = fs.createWriteStream('importResults.txt');
file.on('error', function(err) { console.log(err) });

const { Regions, Users, Genders, Genres, UserAvailabilities, Players, Roles, 
        SkillLevels, UserRoles, UserGenders, SkillLevelInterests } = require('../models');
const caresAboutOptions = ["Hooping with friends", 
                            "Good comp (at my skill level)",
                            "Commute / Distance", 
                            "I want exercise", 
                            "Meet new people",
                            "Tell me anytime there's run"];
let caresAboutCounts = [0, 0, 0, 0, 0, 0];
const availabilityOptions = ["Morning", "Afternoon", "Evening", "Night"];
const availabilityHours = {
    Morning: { start: 7, end: 11 },
    Afternoon: { start: 11, end: 15 },
    Evening: { start: 15, end: 18 },
    Night: { start: 18, end: 23 },
}
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const LoadDataHelper = {

    loadCSV: async function(filename) {
        const file = fs.createReadStream(filename);
        return new Promise(resolve => {
            Papa.parse(file, {
                error: function(err, file, inputElem, reason) {
                    console.log(err)
                    console.log(reason)
                    resolve([]);
                },
                complete: results => {

                    resolve(results.data);
                }
            });
          });
    },

    parseData: function(data) {
        let invites = [];
        let inviters = [];
        let newUsers = [];
        data.forEach(row => {
            let homeRegion = row[14];
            if (homeRegion == "Other: add your neighborhood in the next question field") {
                homeRegion = row[15];
            }

            let newUser = {
                firstName: row[2],
                lastName: row[3],
                email: row[1],
                phone: row[4],
                gradYear: row[20],
                school: row[19],
                homeRegion: homeRegion,
                gender: row[17],
                availability: {
                    Sunday:  row[11].split(", "),
                    Monday: row[5].split(", "),
                    Tuesday: row[6].split(", "),
                    Wednesday: row[7].split(", "),
                    Thursday: row[8].split(", "),
                    Friday: row[9].split(", "),
                    Saturday: row[10].split(", "),
                },
                caresAbout: row[18].split(", "),
                position: row[16],
                skillLevels: row[13].split(", "),
                invitedBy: row[23]
            }

            newUsers.push(newUser);
            if (row[21] != '') invites.push(row[21]);
            if (row[22] != '') invites.push(row[22]);
            if (row[23] != '') inviters.push(row[23]);
            newUser.caresAbout.forEach((reason) => {
                caresAboutCounts[caresAboutOptions.indexOf(reason)] += 1;
            });
        });
        
        file.write("INTEREST REASON RESULTS\n");
        caresAboutOptions.forEach((reason, index) => {
            file.write("\n" + reason + ": " + caresAboutCounts[index]);
        })
        file.write("\n\nINVITES\n");
        invites.forEach(function(v) { file.write(v + '\n'); });
        file.end();
        return newUsers;
    },

    createModelEntries: async function(userData) {
        const inviterFile = fs.createWriteStream('referrals.txt');
        inviterFile.on('error', function(err) { console.log(err) });
        inviterFile.write("Referrals [Referer, Referee User Id]\n");

        for await (user of userData) {

            let [userRegion] = await Regions.findOrCreate({
                where: {name: user.homeRegion}
            });

            // create User
            let [newUser] = await Users.findOrCreate({
                where: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    gradYear: user.gradYear,
                    school: user.school,
                    homeRegionId: userRegion.id
                }
            });

            // Find Genre for id
            let genre = await Genres.findOne({
                where: { name: "Basketball" }
            });

            // Find skill level for id
            let [skillLevel] = await SkillLevels.findOrCreate({
                where: { name: user.skillLevels[user.skillLevels.length - 1] }
            });

            // create Role
            let [role] = await Roles.findOrCreate({
                where: {
                    skillLevelId: skillLevel.id,
                    genreId: genre.id
                }
            });

            for await (let level of user.skillLevels) {
                let [skillLevelEntry] = await SkillLevels.findOrCreate({
                    where: {name: level}
                });
                await SkillLevelInterests.findOrCreate({
                    where: {
                        roleId: role.id,
                        skillLevelId: skillLevelEntry.id
                    }
                })
            }

            // create UserRole
            await UserRoles.findOrCreate({
                where: {
                    userId: newUser.id,
                    roleId: role.id,
                }
            });

            // create Player
            await Players.findOrCreate({
                where: {
                    roleId: role.id,
                    userId: newUser.id,
                    position: user.position
                }
            });

            let [gender] = await Genders.findOrCreate({
                where: {name: user.gender}
            });

            // create UserGender
            await UserGenders.findOrCreate({
                where: {
                    userId: newUser.id,
                    genderId: gender.id
                }
            });

            inviterFile.write(newUser.id + ", " + user.invitedBy + '\n');

            // create UserAvailability
            let availabilityEntries = LoadDataHelper.getUserAvailabilities(user.availability, newUser.id);
            await UserAvailabilities.bulkCreate(availabilityEntries);
            console.log("User created with id:", newUser.id);
        };
        
        return {};
    },

    getUserAvailabilities: function(userAvailabilities, userId) {
        let availabilityEntries = [];
        for(let day of days) {
            if (userAvailabilities[day].indexOf("Any time") > -1) {
                availabilityEntries.push({
                    userId: userId,
                    dayOfWeek: day,
                    startHour: 7,
                    startMinute: 0,
                    endHour: 23,
                    endMinute: 0
                });
            } else {
                for (let time of userAvailabilities[day]) {
                    if (availabilityOptions.indexOf(time) > -1) {
                        availabilityEntries.push({
                            userId: userId,
                            dayOfWeek: days.indexOf(day),
                            startHour: availabilityHours[time].start,
                            startMinute: 0,
                            endHour: availabilityHours[time].end,
                            endMinute: 0
                        });
                    }
                }
            }
        }
        return availabilityEntries;
    }

}

module.exports = LoadDataHelper;

