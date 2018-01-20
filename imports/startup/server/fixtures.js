// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor'
import { Links } from '../../api/links/links.js'

Meteor.startup(() => {
  // if the Links collection is empty
  Links.remove({})
  for (let i = 0; i < 500; i++) {
    Links.insert({
      title: `Link title (${i})`,
      url: `https://www${i}.google.hk.com/`,
      createdAt: new Date()
    })
  }
})
