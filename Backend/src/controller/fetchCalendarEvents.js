const fetchCalendarEvents = async (req, res) => {
  try {
    const response = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        headers: {
          Authorization: `Bearer ${global.access_token_calendar}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      const filteredEvents = data.items.map((event) => ({
        id: event.id,
        startDateTime: event.start.dateTime,
        email: event.creator.email ? event.creator.email : "Unknown",
        eventName: event.summary,
        description: event.description,
        Link: event.location ? event.location : "No such Link is provided",
      }));
      console.log("Filtered Calendar Events sent...");
      res.send(filteredEvents);
    } else {
      console.error("Failed to fetch calendar events:", response.status);
      res.send("error");
    }
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    res.send(error);
  }
};

module.exports = fetchCalendarEvents;
