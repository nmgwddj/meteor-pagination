// All links-related publications

import { Meteor } from 'meteor/meteor'
import { Links } from '../links.js'

Meteor.publish('links.all', function (currentPage = 1, pageSize = 10) {
  return Links.find({}, {
    limit: pageSize,                    // 订阅一页的数据
    skip: (currentPage - 1) * pageSize  // 跳过当前页-1 * 每页数据的数据量
  })
});
