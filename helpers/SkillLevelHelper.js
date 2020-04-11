const { SkillLevels } = require('../models');


const SkillLevelHelper = {

    getSkillLevelIdByName: async function(name) {
        let skillLevel = await SkillLevels.findOne({
            where: {
                name: name
            }
        });

        return skillLevel.id;
    }
}

module.exports = SkillLevelHelper;