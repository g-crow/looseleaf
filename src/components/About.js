import React, { Component } from 'react';

class About extends Component {

  render() {
    return (
      <div id="about">
        <h1>About</h1>
        <div>
          Looseleaf is a customizable personal planner. Its interface combines our favorite features of traditional paper and virtual planning tools, allowing users to create a personal planner best suited to their needs and aesthetic preferences. In developing this app, we aimed to capture the essense of a well-loved Moleskin notebook. Resizable, drag-and-drop components such as lists and calendars help users organize their day-to-day, while journal and notes sections provide space to reflect, store snippets, and track progress toward goals, as well as keep priorities and inspiration in sight alongside these elements. Designed to increase headspace, Looseleaf's minimalist dashboard displays only current items. Past entries are archived for future reference.
        </div>
        <h1>2.0 Features... coming soon</h1>
        <ul>
          <li>Fully responsive grid layout and mobile compatibility </li>
          <li>Add/remove component options</li>
          <li>Allow users to add images, links, and styling to entries</li>
          <li>Customizable themes and color schemes</li>
          <li>Google Calendar integration</li>
          <li>Additional components and widgets</li>
        </ul>
      </div>
    )
  }
}

export default About;
