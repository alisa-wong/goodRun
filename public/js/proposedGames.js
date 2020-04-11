new Vue({
  el: "#proposedGames",
  data: {
    days: [],
    times: [ '10:00 am', '10:15 am', '10:30 am','10:45 am', '11:00 am', '11:15 am', '11:30 am', '11:45 am', '12:00 pm', '12:15 pm', '12:30 pm', '12:45 pm', '01:00 pm', '01:15 pm', '01:30 pm', '01:45 pm', '02:00 pm', '02:15 pm', '02:30 pm', '02:45 pm', '03:00 pm', '03:15 pm', '03:30 pm', '03:45 pm', '04:00 pm', '04:15 pm', '04:30 pm', '04:45 pm', '05:00 pm', '05:15 pm', '05:30 pm', '05:45 pm', '06:00 pm', '06:15 pm', '06:30 pm', '06:45 pm', '07:00 pm', '07:15 pm', '07:30 pm', '07:45 pm', '08:00 pm', '08:15 pm', '08:30 pm', '08:45 pm', '09:00 pm', '09:15 pm', '09:30 pm', '09:45 pm', '10:00 pm', '10:15 pm', '10:30 pm', '10:45 pm'],
    games:[
      {
        date: new Date(),
        time: ["10:00 am","11:00 am"],
        location: "Manhattan",
        signups: 7,
        maxSignups: 10,
      },
      {
        date: new Date('April 8, 2020'),
        time: ["05:15 pm","06:15 pm"],
        location: "LIC",
        signups: 12,
        maxSignups: 15,
      },
      {
        date: new Date('April 9, 2020'),
        time: ["11:00 am","12:00 pm"],
        location: "LIC",
        signups: 10,
        maxSignups: 10,
      },
      {
        date: new Date('April 10, 2020'),
        time: ["11:15 am","01:15 pm"],
        location: "Brooklyn",
        signups: 3,
        maxSignups: 10,
      }
    ]
  },
  created() {
    this.setDays()
  },

  methods: {
    setDays(){
      let array = []
      let today = new Date()
      while(array.length < 7) {
        let newDay = new Date()
        newDay.setDate(today.getDate() + array.length)
        array.push(newDay)
      }
      this.days = array
      console.log(array)
    },

    searchDay(array, day) {
      for (let i = 0; i < array.length; i ++) {
        console.log(array)
        console.log(day)
        if (array[i].getDate() === day.getDate() && array[i].getMonth() === day.getMonth() && array[i].getFullYear() === day.getFullYear()) {
          return i
        }
      }
    }
  }
})
