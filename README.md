# lighthouse_report
lighthouse测试


### lighthouserc 中的配置
#### options
- port: number; // chrome的端口
- logLevel: 'silent' | 'error' | 'info' | 'verbose'; // 日志等级
- output: 'json' | 'html'| 'csv'; // 报告输出格式
- onlyAudits: string[] | null; // 只执行的审查器
- onlyCategories: string[] | null; // 只执行的审查类别
- skipAudits: string[] | null; // 跳过的审查器
- throttlingMethod: 'devtools' | 'simulate' | 'provided'; // 网络节流方式
- throttling ThrottlingSettings; // 网络模拟控制
- emulatedFormFactor: 'mobile' | 'desktop' | 'none'; // 模拟设备
- locale: Locale; // 语言

#### configs
extends: 'lighthouse:default' | undefined; // 是否继承默认配置
settings: Object | undefined; // 运行时配置
passes: Object[]; // 采集器
audits: string[]; // 审查器
categories: Object | undefined; // 类别
groups: Object | undefined; // 分组
