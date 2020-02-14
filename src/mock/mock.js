import Mock from 'mockjs'
// import { Random } from 'mockjs'

Mock.setup({
  timeout: 800 // 设置延迟响应，模拟向后端请求数据
})

Mock.mock(/\/api\/getUserList/, 'get', {
  code: 200,
  message: 'success',
  data: {
    'userList|15': [{
      'head_url': '',
      'user_id|+1': 1,
      'name': '@name',
      'sex|1': ['男', '女'],
      'department|1': ['数字一群', '数字三群', '数字五群', '事业一群'],
      'role|1': ['consumer', 'administrator', 'checker', 'supervisor']
    }],
    'total|30-60': 30
  }
})
Mock.mock(/\/api\/getRecordList/, 'get', {
  code: 200,
  message: 'success',
  data: {
    'recordList|15': [{
      'user_id|+1': 1,
      'name': '@name',
      'action|1': ['登录', '退出', '下载', '上传'],
      'time': `${Mock.Random.date('yyyy-MM-dd')}-${Mock.Random.time('HH:mm:ss')}`
    }],
    'total|30-60': 30
  }
})
Mock.mock(/\/api\/getTagList/, 'get', {
  code: 200,
  message: 'success',
  data: {
    'tagList|15': [{
      'id|+1': 1,
      'name': '@name',
      'number|1-200': 1,
      'classify|1': [{ name: '活力', id: 12 }, { name: '潮', id: 15 }, { name: '保守', id: 17 }, { name: '色彩', id: 20 }],
      'used|1-100': 2
    }],
    'total|30-60': 30
  }
})
Mock.mock(/\/api\/getClassifyTag/, 'get', {
  code: 200,
  message: 'success',
  data: {
    'tagList|7': [{
      'id|+1': 1,
      'name': '@name'
    }]
  }
})
Mock.mock(/\/api\/getClassifyList/, 'get', {
  code: 200,
  message: 'success',
  data: {
    'classifyList': [{
      'id': 1,
      'name': '活力',
      'parent_id': '',
      'children': [2, 3]
    }, {
      'id': 2,
      'name': '潮',
      'parent_id': 1,
      'children': []
    }, {
      'id': 3,
      'name': '色彩',
      'parent_id': 1,
      'children': [5]
    }, {
      'id': 4,
      'name': '保守',
      'parent_id': '',
      'children': []
    }, {
      'id': 5,
      'name': '蓝',
      'parent_id': 3,
      'children': []
    }]
  }
})
Mock.mock(/\/api\/getTagImgList/, 'get', {
  code: 200,
  message: 'success',
  data: {
    'imgList|5': [{
      'name': '@name',
      'url|1': ['//os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png', 'http://ht.idealead.hbindex.com/uploadFiles/images/20191127/f04253da72556ea2e9b6ec55a0b27c26.png', 'http://ht.idealead.hbindex.com/uploadFiles/images/20191212/dde50e67f04b80d691b88dafb54ade7b.png', 'http://ht.idealead.hbindex.com/uploadFiles/images/20191217/e0dcedb2d42ca77e54841d6fe2b73254.JPG']
    }]
  }
})
Mock.mock(/\/api\/getMaterialList/, 'get', {
  code: 200,
  message: 'success',
  data: {
    'materialList|15': [{
      'id|+1': 1,
      'name': '@name',
      'url|1': ['//os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png', 'http://ht.idealead.hbindex.com/uploadFiles/images/20191127/f04253da72556ea2e9b6ec55a0b27c26.png', 'http://ht.idealead.hbindex.com/uploadFiles/images/20191212/dde50e67f04b80d691b88dafb54ade7b.png', 'http://ht.idealead.hbindex.com/uploadFiles/images/20191217/e0dcedb2d42ca77e54841d6fe2b73254.JPG', '//gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'],
      'tag': [{
        'id': 21,
        'name': '标签1'
      }, {
        'id': 22,
        'name': '标签2'
      }, {
        'id': 23,
        'name': '标签3'
      }, {
        'id': 24,
        'name': '标签4'
      }],
      'user_name': '@name',
      'create_time': `${Mock.Random.date('yyyy-MM-dd')}-${Mock.Random.time('HH:mm:ss')}`,
      'file_size|1024-2048': 1,
      'size_width|1-1000': 1,
      'size_height|1-1000': 1,
      'format|1': ['jpg', 'png', 'else'],
      'type|1': ['drawing', 'picture'],
      'theme': [{
        'id': 31,
        'name': '主题1'
      }, {
        'id': 32,
        'name': '主题2'
      }],
      'is_original|1': ['yes', 'no'],
      'copyright|1': ['known', 'unknow'],
      'copyright_name|1': ['视觉中国', '图图网', '大千世界'],
      'copyright_url': '//***.***.**',
      'audits|1': ['reject', 'pass', 'wait']
    }],
    'total|30-60': 30
  }
})
Mock.mock(/\/api\/getThemeList/, 'get', {
  code: 200,
  message: 'success',
  data: {
    'themeList': [{
      'id': 31,
      'name': '主题1'
    }, {
      'id': 32,
      'name': '主题2'
    }, {
      'id': 33,
      'name': '主题3'
    }, {
      'id': 34,
      'name': '主题4'
    }, {
      'id': 35,
      'name': '主题35'
    }]
  }
})
Mock.mock(/\/api\/getCopyrightList/, 'get', {
  code: 200,
  message: 'success',
  data: {
    'copyrightList|20': [{
      'id|+1': 41,
      'name': '@name',
      'number|1-50': 1
    }]
  }
})
Mock.mock(/\/api\/getAuditsList/, 'get', {
  code: 200,
  message: 'success',
  data: {
    'materialList|15': [{
      'id|+1': 1,
      'name': '@name',
      'url|1': ['//os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png', 'http://ht.idealead.hbindex.com/uploadFiles/images/20191127/f04253da72556ea2e9b6ec55a0b27c26.png', 'http://ht.idealead.hbindex.com/uploadFiles/images/20191212/dde50e67f04b80d691b88dafb54ade7b.png', 'http://ht.idealead.hbindex.com/uploadFiles/images/20191217/e0dcedb2d42ca77e54841d6fe2b73254.JPG', '//gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'],
      'tag': [{
        'id': 21,
        'name': '标签1'
      }, {
        'id': 22,
        'name': '标签2'
      }, {
        'id': 23,
        'name': '标签3'
      }, {
        'id': 24,
        'name': '标签4'
      }],
      'user_name': '@name',
      'create_time': `${Mock.Random.date('yyyy-MM-dd')}-${Mock.Random.time('HH:mm:ss')}`,
      'file_size|1024-2048': 1,
      'size_width|1-1000': 1,
      'size_height|1-1000': 1,
      'format|1': ['jpg', 'png', 'else'],
      'type|1': ['drawing', 'picture'],
      'theme': [{
        'id': 31,
        'name': '主题1'
      }, {
        'id': 32,
        'name': '主题2'
      }],
      'is_original|1': ['yes', 'no'],
      'copyright|1': ['known', 'unknow'],
      'copyright_name|1': ['视觉中国', '图图网', '大千世界'],
      'copyright_url': '//***.***.**',
      'audits|1': ['reject', 'pass', 'wait']
    }],
    'total|30-60': 30
  }
})
