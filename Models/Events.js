const dbConn = require('../Utils/DBconnection');
const { EventsQuery } = require('../Constants/SqlQuery');
const eventsQuery = EventsQuery();
class Event {
  constructor(events) {
    this.events = events;
  }
  saveEvents() {
    return dbConn
      .execute(eventsQuery.SAVE_EVENTS, [this.events.date, this.events.time, this.events.location, this.events.announcementId])
      .then((success) => {
        return success;
      })
      .catch((error) => {
        throw Error(error);
      });
  }
}

module.exports = Event;
