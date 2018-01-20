import React from 'react'
import Table from 'antd/lib/table'
import { withTracker } from 'meteor/react-meteor-data'

import { dateToString } from '../../lib/helpers'
import { Links } from '../../api/links/links'

const { Column } = Table

const LinksTable = ({ dataSource, isReady }) => {
  return (
    <Table dataSource={dataSource} loading={!isReady}>
      <Column
        title='Title'
        key='title'
        dataIndex='title'
      />
      <Column
        title='URL'
        key='url'
        dataIndex='url'
        render={(t, r) => <a href={t} target='_blank'>{t}</a>}
      />
      <Column
        title='CreatedAt'
        key='createdAt'
        dataIndex='createdAt'
        render={(t, r) => dateToString(t)}
      />
    </Table>
  )
}

export default withTracker(() => {
  // 订阅数据
  const linksHandle = Meteor.subscribe('links.all')
  const links = Links.find({}).fetch()
  const dataSource = []

  // 遍历数据，增加 key 用于表格显示
  if (Array.isArray(links)) {
    links.map(link => {
      dataSource.push({
        key: link._id,
        ...link
      })
    })
  }  

  return {
    isReady: linksHandle.ready(),
    dataSource
  }
})(LinksTable)
