const api = {
  // 获取用户列表接口
  getUserList: '/api/getUserList',

  // 获取用户记录接口
  getRecordList: '/api/getRecordList',

  // 获取标签列表接口
  getTagList: '/api/getTagList',

  // 获取标签分类列表接口
  getClassifyList: '/api/getClassifyList',

  // 根据标签id获取标签图片列表
  getTagImgList: '/api/getTagImgList',

  // 根据分类id获取分类下的标签
  getClassifyTag: '/api/getClassifyTag',

  // 获取素材列表
  getMaterialList: '/api/getMaterialList',

  // 获取主题列表
  getThemeList: '/api/getThemeList',

  // 获取版权主体列表
  getCopyrightList: '/api/getCopyrightList',

  // 通过审核筛选获得素材列表
  getAuditsList: '/api/getAuditsList'
}
export { api }
