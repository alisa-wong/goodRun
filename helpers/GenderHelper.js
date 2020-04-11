const { Genders } = require('../models');


const GenderHelper = {

    getGenderId: async function(name) {
        // Precondition: name in ["male", "female"]
        let gender = await Genders.findOne({
            where: { name: name }
        });
        return gender.id;
    }
}

module.exports = GenderHelper;