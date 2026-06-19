// assets/content-map.js
// 站点内容地图与搜索工具

const siteConfig = {
  baseUrl: 'https://web-main-aiyouxi.com.cn',
  siteName: '爱游戏',
  defaultLang: 'zh-CN'
};

const contentSections = [
  {
    id: 'home',
    title: '首页',
    keywords: ['爱游戏', '首页', '推荐', '热门'],
    path: '/',
    priority: 1.0
  },
  {
    id: 'news',
    title: '新闻中心',
    keywords: ['爱游戏', '新闻', '资讯', '更新', '公告'],
    path: '/news',
    priority: 0.9
  },
  {
    id: 'games',
    title: '游戏库',
    keywords: ['爱游戏', '游戏', '分类', '类型', '全部游戏'],
    path: '/games',
    priority: 0.8
  },
  {
    id: 'strategy',
    title: '攻略专区',
    keywords: ['爱游戏', '攻略', '技巧', '教程', '指南'],
    path: '/strategy',
    priority: 0.7
  },
  {
    id: 'community',
    title: '玩家社区',
    keywords: ['爱游戏', '社区', '论坛', '讨论', '交流'],
    path: '/community',
    priority: 0.6
  },
  {
    id: 'support',
    title: '客服支持',
    keywords: ['爱游戏', '客服', '帮助', '反馈', '联系'],
    path: '/support',
    priority: 0.5
  },
  {
    id: 'about',
    title: '关于我们',
    keywords: ['爱游戏', '关于', '介绍', '团队', '合作'],
    path: '/about',
    priority: 0.4
  }
];

const tagCategories = {
  genre: ['动作', '角色扮演', '策略', '休闲', '射击', '体育', '模拟'],
  platform: ['PC', '移动端', '网页', '主机'],
  feature: ['多人', '单人', '免费', '付费', '竞技']
};

function searchContent(query) {
  if (!query || typeof query !== 'string') {
    return [];
  }
  const lowerQuery = query.toLowerCase().trim();
  const results = [];

  for (const section of contentSections) {
    const titleMatch = section.title.toLowerCase().includes(lowerQuery);
    const keywordMatch = section.keywords.some(kw =>
      kw.toLowerCase().includes(lowerQuery)
    );
    if (titleMatch || keywordMatch) {
      results.push({
        sectionId: section.id,
        title: section.title,
        url: siteConfig.baseUrl + section.path,
        relevance: section.priority
      });
    }
  }

  results.sort((a, b) => b.relevance - a.relevance);
  return results;
}

function getSectionsByTag(tag) {
  if (!tag || typeof tag !== 'string') {
    return [];
  }
  const lowerTag = tag.toLowerCase().trim();
  const matched = [];

  for (const section of contentSections) {
    const hasTag = section.keywords.some(kw =>
      kw.toLowerCase().includes(lowerTag)
    );
    if (hasTag) {
      matched.push({
        sectionId: section.id,
        title: section.title,
        url: siteConfig.baseUrl + section.path
      });
    }
  }
  return matched;
}

function getContentMapData() {
  return {
    site: siteConfig,
    sections: contentSections,
    tags: tagCategories,
    generatedAt: new Date().toISOString()
  };
}

export {
  siteConfig,
  contentSections,
  tagCategories,
  searchContent,
  getSectionsByTag,
  getContentMapData
};