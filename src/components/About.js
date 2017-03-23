import React, { Component } from 'react';

class About extends Component {

  render() {
    return (
      <div id="about">
        <h1>About Looseleaf 1.0</h1>
        <div>
          Looseleaf offers the freedom of a blank page without the bulk of a notebook. Its customizable interface combines our favorite features of traditional paper and virtual planning tools, allowing users to create a personal planner best suited to their needs and aesthetic preferences. Resizable, drag-and-drop components such as lists and calendars help users organize their day-to-day, while journal and notes sections provide space to reflect, store snippets, and track progress. Designed to increase headspace, Looseleaf's minimalist dashboard displays only current items. Past entries are archived for future reference.
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
