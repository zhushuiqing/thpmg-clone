// THPMG 公司数据
// 注意：多语言文本已同步到 messages/*.json 翻译文件中
// 页面应优先使用翻译文件中的文本

export const companyData = {
  name: "P.M.I 总管理处",
  fullName: "杭州秉育企业咨询管理有限公司",
  description: "P.M.I.总管理处成立于 2015 年 1 月，下辖财务长室、中央研究所、人资部、经营规划部及 8 家事业单位（含 3 家包材事业、3 家原料事业、1 家食材事业、1 家物流事业）。在国内 14 个省市、泰国 4 个城市开设有生产基地，截至 2025 年 12 月，P.M.I.总管理处拥有员工近 7500 人。",
  pmi: {
    P: "Packaging(包材)：包含软包装、彩盒、食品纸质容器的生产企业 - 顶正包材，以环保瓦楞纸箱为媒介、致力于为客户提供一站式包装服务解决方案的包装公司 - 秉信包装，食品级塑料制品制造商 - 和昇塑料",
    M: "Materials(原料)：包含芝麻油和芝麻制品供应商 - 顶志食品，致力于淀粉及淀粉衍生物的研发和应用创新的食品级变性淀粉厂商 - 中国普罗星，食品级木薯原淀粉、变性淀粉的制造商 - 泰国普罗星",
    I: "Ingredients(食材)：包含冻干食品加工企业 - 味珍食品"
  },
  strategy: "稳健、技术、品质、成本",
  values: "诚信、务实、创新",
  address: "上海市闵行区吴中路 1688 号 A 栋 7 楼",
  phone: "021-31754203",
  icp: "浙 ICP 备 14023763 号",
  policeIcp: "浙公网安备 33011802001131 号"
};

// 发展历程数据
export const historyData = [
  { year: "2015", event: "P.M.I.总管理处成立" },
  { year: "2016", event: "旗下事业单位逐步整合" },
  { year: "2019", event: "生产基地扩展至全国 14 个省市" },
  { year: "2025", event: "拥有员工近 7500 人，泰国 4 个城市开设生产基地" }
];

// 下属企业列表
export const subsidiaries = [
  {
    id: 1,
    name: "秉信包装",
    english: "Baxin Packaging",
    description: "以环保瓦楞纸箱为媒介，致力于为客户提供一站式包装服务解决方案",
    website: "https://www.bxpackaging.com",
    category: "包材事业"
  },
  {
    id: 2,
    name: "顶正包材",
    english: "Tingzheng Packaging",
    description: "软包装、彩盒、食品纸质容器的生产企业",
    website: "https://www.tingzheng.com.cn",
    category: "包材事业"
  },
  {
    id: 3,
    name: "和昇塑料",
    english: "Hesheng Plastic",
    description: "食品级塑料制品制造商",
    website: "https://www.hs-plastic.net",
    category: "包材事业"
  },
  {
    id: 4,
    name: "普罗星淀粉",
    english: "Prostar Starch",
    description: "致力于淀粉及淀粉衍生物的研发和应用创新的食品级变性淀粉厂商",
    website: "https://www.starpro.com.cn",
    category: "原料事业"
  },
  {
    id: 5,
    name: "顶志食品",
    english: "Tingzhi Food",
    description: "芝麻油和芝麻制品供应商",
    website: "https://www.tingzhisesame.com",
    category: "原料事业"
  },
  {
    id: 6,
    name: "泰普淀粉",
    english: "Starpro Thailand",
    description: "食品级木薯原淀粉、变性淀粉的制造商（泰国）",
    website: "https://starpro.co.th",
    category: "原料事业"
  },
  {
    id: 7,
    name: "味珍食品",
    english: "Weizhen Food",
    description: "冻干食品加工企业",
    website: "https://www.weizhenfd.com",
    category: "食材事业"
  },
  {
    id: 8,
    name: "顶通物流",
    english: "Tingtong Logistics",
    description: "专业物流服务企业",
    website: "https://www.tingtong.com.cn",
    category: "物流事业"
  }
];

// 新闻中心数据
export const newsData = [
  {
    id: 1,
    title: "PMI 上海区员工举行 Q2 庆生会",
    date: "2019-08-13",
    category: "employee",
    excerpt: "PMI 上海区员工齐聚一堂，共同庆祝第二季度员工生日会，现场气氛热烈，增强了团队凝聚力。",
    content: "近日，PMI 上海区在总部大楼举行了 Q2 员工庆生会。活动现场，寿星们齐聚一堂，共享美味蛋糕，参与互动游戏。公司管理层亲临现场，为员工送上生日祝福和精美礼品。大家在欢声笑语中度过了一个难忘的下午，进一步增强了团队凝聚力和归属感。"
  },
  {
    id: 2,
    title: "P.M.I.五月净心之旅",
    date: "2019-08-14",
    category: "employee",
    excerpt: "P.M.I.组织员工开展五月净心之旅活动，让员工在大自然中放松身心，增进交流。",
    content: "五月的阳光温暖宜人，P.M.I.组织员工开展了一场别开生面的净心之旅。活动包括徒步登山、团队拓展、冥想放松等环节。员工们在大自然中释放工作压力，增进彼此了解，提升了团队协作精神。"
  },
  {
    id: 3,
    title: "PMI 百草园 + 莫干山秋季拓展",
    date: "2019-08-15",
    category: "employee",
    excerpt: "PMI 组织员工前往百草园和莫干山开展秋季拓展活动，挑战自我，熔炼团队。",
    content: "秋高气爽之际，PMI 组织员工前往风景秀丽的百草园和莫干山开展秋季拓展训练。活动设置了高空断桥、信任背摔、毕业墙等经典拓展项目，员工们在挑战中突破自我，在协作中增进信任。此次活动不仅锻炼了员工的意志品质，更增强了团队的凝聚力和战斗力。"
  }
];

// 招聘职位数据
export const recruitmentData = [
  {
    id: 1,
    title: "供应链程序设计师 (2 名)",
    department: "中央研究所",
    location: "杭州下沙",
    responsibilities: [
      "供应链模块及相关资讯系统、应用软件等开发、测试、维护、用户辅导与使用问题处理",
      "参加相关的专案工作",
      "编写操作手册，用户操作培训",
      "协助业务分析师进行少量的系统分析的工作"
    ],
    requirements: [
      "计算机硬件软件、信息管理、数学、通讯工程、电子商务、管理科学与工程专业",
      "有 ERP 工作经验或应届毕业生"
    ]
  },
  {
    id: 2,
    title: "营业程序设计师 (1 名)",
    department: "中央研究所",
    location: "杭州下沙",
    responsibilities: [
      "营业模块及相关资讯系统、应用软件等开发、测试、维护、用户辅导与使用问题处理",
      "参加相关的专案工作",
      "编写操作手册，用户操作培训",
      "协助业务分析师进行少量的系统分析的工作"
    ],
    requirements: [
      "计算机硬件软件、信息管理、数学、通讯工程、电子商务、管理科学与工程专业",
      "有 ERP 工作经验或应届毕业生"
    ]
  },
  {
    id: 3,
    title: "财会程序设计师 (1 名)",
    department: "财务长室",
    location: "杭州下沙",
    responsibilities: [
      "财会模块及相关资讯系统、应用软件等开发、测试、维护、用户辅导与使用问题处理",
      "参加相关的专案工作",
      "编写操作手册，用户操作培训",
      "协助业务分析师进行少量的系统分析的工作"
    ],
    requirements: [
      "计算机硬件软件、信息管理、数学、通讯工程、电子商务、管理科学与工程专业",
      "有 ERP 工作经验或应届毕业生"
    ]
  },
  {
    id: 4,
    title: "应用软件设计师 (1 名)",
    department: "中央研究所",
    location: "杭州下沙",
    responsibilities: [
      "资讯系统、应用软件等开发、测试、维护、用户辅导与使用问题处理",
      "参加相关的专案工作",
      "编写操作手册，用户操作培训",
      "协助业务分析师进行少量的系统分析的工作"
    ],
    requirements: [
      "计算机硬件软件、信息管理、数学、通讯工程、电子商务、管理科学与工程专业",
      "有 ERP 工作经验或应届毕业生"
    ]
  },
  {
    id: 5,
    title: "后台管理员 (2 名)",
    department: "经营规划部",
    location: "杭州下沙",
    responsibilities: [
      "管理安装、管理防毒软件，管理 AD 和邮件等微软标准应用系统",
      "应用系统安全及用户权限管理、备份、数据归档",
      "应用系统安装、配置、升级、监控及优化等"
    ],
    requirements: [
      "计算机硬件软件、信息管理、数学、通讯工程、电子商务、管理科学与工程专业",
      "有系统管理经验、AD 和邮件管理经验者优先"
    ]
  }
];

// 薪酬福利
export const benefits = [
  {
    title: "具有竞争力的薪酬",
    description: "提供行业内有竞争力的薪资水平，并根据个人绩效定期调整"
  },
  {
    title: "完善的社会保险",
    description: "五险一金全覆盖，补充商业医疗保险"
  },
  {
    title: "带薪年假",
    description: "除国家法定年假外，提供额外福利年假"
  },
  {
    title: "员工关怀",
    description: "节日礼金、生日福利、定期体检、员工活动"
  },
  {
    title: "培训发展",
    description: "完善的培训体系，提供内外训、在线学习等多种学习机会"
  },
  {
    title: "职业晋升",
    description: "双通道职业发展路径，管理序列和专业序列并行"
  }
];
