import React from 'react'
import Table from 'antd/lib/table'
import { withTracker } from 'meteor/react-meteor-data'
import { compose, withHandlers, withState } from 'recompose'

import { dateToString } from '../../lib/helpers'
import { Links } from '../../api/links/links'

const { Column } = Table

const LinksTable = ({ dataSource, isReady, currentPage, setCurrentPage, linksCount }) => {
  const pagination = {
    total: linksCount,
    current: currentPage,
    onChange: (page, pageSize) => {
      setCurrentPage(page)
    }
  }

  return (
    <Table dataSource={dataSource} loading={!isReady} pagination={pagination}>
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

const enhance = compose(
  withState('currentPage', 'setCurrentPage', 1),
  withState('linksCount', 'setLinksCount', 0)
)

export default enhance(
  withTracker(({ currentPage, setLinksCount }) => {
    // 订阅数据
    const linksHandle = Meteor.subscribe('links.all', currentPage)
    const links = Links.find({}).fetch()
    const dataSource = []
    Meteor.call('links.count', (err, result) => {
      if (!err) {
        // 设置数据总量
        setLinksCount(result)
      } else {
        console.log(err.message)
      }
    })
  
    // 用于调试，查看订阅了多少数据
    if (Array.isArray(links) && links.length !== 0) {
      console.log(links)
    }

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
)
