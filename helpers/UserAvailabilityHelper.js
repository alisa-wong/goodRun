const { UserAvailabilities } = require('../models');
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const zeros = (m, n) => [...Array(m)].map(e => Array(n).fill(0));

const UserAvailabilityHelper = {

    getUserAvailabilityBlocks: async function(userId) {
        let userAvailabilities = await UserAvailabilities.findAll({
            where: { userId },
            raw: true
        });
        
        // Initialize zeroed block array: 96 rows of 7
        // 24 hours of 4 15 minute blocks = 96, 7 days a week
        // Set each available block to 1 in the array
        let blocks = zeros(96, 7);

        userAvailabilities.forEach(availability => {
            let dayIndex = availability.dayOfWeek;
            let startBlock = this.getBlockIndex(availability.startHour, availability.startMinute);
            let endBlock = this.getBlockIndex(availability.endHour, availability.endMinute) - 1;
            let currentBlock = startBlock;

            while (currentBlock < endBlock) {
                blocks[currentBlock][dayIndex] = 1;
                currentBlock++;
            }
        });

        return blocks;
    },

    getBlockIndex: function(hour, minute) {
        return hour*4 + minute%15;
    },

    updateUserAvailabilityBlocks: async function(blocks, userId) {
        let newAvailabilities = [];
        days.forEach((day) => {
            let currentHour = 0;
            let currentMinute = 0;
            let currentBlockIndex = 0;
            let currentDayIndex = days.indexOf(day);
            let currentStartHour = 0;
            let currentStartMinute = 0;
            let startCreated = false;

            while (currentBlockIndex < blocks.length) {
                // If start created and 
                if (!startCreated && blocks[currentBlockIndex][currentDayIndex] == 1) {
                    // Set start fields
                    startCreated = true;
                    currentStartHour = currentHour;
                    currentStartMinute = currentMinute;
                } else if (startCreated && blocks[currentBlockIndex][currentDayIndex] == 0) {
                    // End availability and add it
                    newAvailabilities.push({
                        userId: userId,
                        dayOfWeek: currentDayIndex,
                        startHour: currentStartHour,
                        startMinute: currentStartMinute,
                        endHour: currentHour,
                        endMinute: currentMinute
                    })
                    startCreated = false;
                }

                // increment fields for next block
                currentBlockIndex++;
                if (currentMinute == 45) {
                    currentMinute = 0;
                    currentHour++;
                } else {
                    currentMinute += 15;
                }
            }
        });

        await UserAvailabilities.destroy({
            where: { userId }
        });
        
        return UserAvailabilities.bulkCreate(newAvailabilities);
    },

}

module.exports = UserAvailabilityHelper;