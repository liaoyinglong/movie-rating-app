### Movie Rating 应用

> 在线预览：[https://movie-rating-app-bice.vercel.app](https://movie-rating-app-bice.vercel.app)

## 功能概览

- 用户认证（登录/登出）
- 电影浏览与详情展示
- 电影评分系统
- 用户评论功能
- 电影搜索
- 深色/浅色主题切换
- 响应式设计
- 国际化

## 项目架构

```plaintext
movie-rating/
├── config/                # 配置文件
│   └── data/              # 初始化数据
├── src/
│   ├── app/               # Next.js App Router 路由结构
│   │   ├── page.tsx       # 首页
│   │   ├── layout.tsx     # 根布局
│   │   ├── globals.css    # 全局样式
│   │   └── movie/         # 电影相关路由
│   │       └── [id]/      # 电影详情页（动态路由）
│   ├── components/        # 可复用组件
│   │   ├── header/        # 页面头部组件
│   │   ├── ui/            # Chakra UI 组件
│   │   └── login-dialog/  # 登录对话框组件
│   ├── constants/         # 常量定义
│   ├── database/          # 数据库交互层
│   ├── server-actions/    # Next.js Server Actions
│   └── utils/             # 工具函数
├── next.config.ts         # Next.js 配置
├── package.json           # 项目依赖
└── tsconfig.json          # TypeScript 配置
```

## 技术栈

### 核心框架

- **Next.js 15**
- **React 19**

### UI 与样式

- **Chakra UI 3**
- **Tailwind CSS 4**

### 后端交互

- **Server Actions** - 使用 Next.js 的 Server Actions 进行和服务端的交互

### 数据校验

- **Zod**

### 测试工具

- **Vitest** - 高性能的测试框架，比 Jest 更快
- **Happy DOM** - 用于测试的 DOM 环境
- **Testing Library** - 用户交互测试工具

  - `@testing-library/dom`
  - `@testing-library/react`
  - `@testing-library/user-event`

### 数据存储

- **Redis** - 用于模拟数据库
- **IORedis** - Redis 客户端

### 开发工具

- **Husky** - Git hooks 管理
- **Prettier** - 代码格式化
- **ESLint** - 代码质量检查
- **lint-staged** - 针对暂存文件运行 linters

## 快速开始

### 环境要求

- **Node.js v22** (参见 `.nvmrc`)
- **pnpm v9** (参见 `package.json#packageManager`)
- **Redis** 服务（可通过 Docker 运行）

### 安装依赖

```shellscript
pnpm install
```

### 数据初始化

#### 选项 1：本地 Redis（推荐用于开发）

使用 Docker 启动 Redis 服务：

```shellscript
docker run --name movie-rating-redis -p 6379:6379 -d redis
```

初始化数据：

```shellscript
pnpm run init:data
```

#### 选项 2：云端 Redis

在 `.env.local` 文件中添加 Redis 连接 URL：

```plaintext
REDIS_URL=redis://...
```

然后运行：

```shellscript
pnpm run init:data
```

### 启动开发服务器

```shellscript
pnpm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用

## 测试

项目使用 Vitest 进行单元测试，测试文件与源代码位于同一目录下：

- `*.ts` - 源代码文件
- `*.spec.ts` - 测试文件

运行测试：

```shellscript
pnpm run test
```

### 当前测试覆盖率

```plaintext
----------------------------------------|---------|----------|---------|---------|-------------------
File                                    | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------------------------------------|---------|----------|---------|---------|-------------------
All files                               |   78.45 |     86.6 |   88.23 |   78.45 |
 src                                    |     100 |      100 |     100 |     100 |
  middleware.ts                         |     100 |      100 |     100 |     100 |
 src/app/[locale]                       |       0 |        0 |       0 |       0 |
  page.tsx                              |       0 |        0 |       0 |       0 | 1-26
 src/app/[locale]/components            |     100 |      100 |     100 |     100 |
  movie-grid.tsx                        |     100 |      100 |     100 |     100 |
  search-input.tsx                      |     100 |      100 |     100 |     100 |
 src/app/[locale]/movie/[id]            |   65.35 |     87.5 |      50 |   65.35 |
  page.tsx                              |   65.35 |     87.5 |      50 |   65.35 | 86,108-160
 src/app/[locale]/movie/[id]/components |   91.17 |     37.5 |   66.66 |   91.17 |
  rating-trigger.tsx                    |   91.17 |     37.5 |   66.66 |   91.17 | 28-33,40-42
 src/components                         |   96.29 |    66.66 |     100 |   96.29 |
  login-dialog.tsx                      |   94.25 |    57.14 |     100 |   94.25 | 28-32
  pagination.tsx                        |     100 |      100 |     100 |     100 |
 src/components/header                  |   30.81 |      100 |      75 |   30.81 |
  header-user-info.tsx                  |   84.48 |      100 |   66.66 |   84.48 | 39-47
  index.tsx                             |       0 |      100 |     100 |       0 | 2-124
 src/constants                          |     100 |      100 |     100 |     100 |
  cookie-ids.ts                         |     100 |      100 |     100 |     100 |
  modal-ids.ts                          |     100 |      100 |     100 |     100 |
 src/i18n                               |   59.61 |    81.81 |     100 |   59.61 |
  client-provider.tsx                   |       0 |      100 |     100 |       0 | 2-14
  client.ts                             |       0 |      100 |     100 |       0 | 2-37
  config.ts                             |     100 |      100 |     100 |     100 |
  server.ts                             |   93.87 |       75 |     100 |   93.87 | 51-53
  shared-options.ts                     |     100 |      100 |     100 |     100 |
 src/server-actions                     |     100 |       95 |     100 |     100 |
  check-user-is-rated.ts                |     100 |      100 |     100 |     100 |
  get-user-info.ts                      |     100 |      100 |     100 |     100 |
  login.ts                              |     100 |      100 |     100 |     100 |
  logout.ts                             |     100 |      100 |     100 |     100 |
  movie-detail.ts                       |     100 |      100 |     100 |     100 |
  page-search-movie-comments.ts         |     100 |    77.77 |     100 |     100 | 31,46
  page-search-movies.ts                 |     100 |      100 |     100 |     100 |
  rate-movie.ts                         |     100 |      100 |     100 |     100 |
 src/utils                              |   93.33 |       75 |     100 |   93.33 |
  base-page-search-schema.ts            |     100 |      100 |     100 |     100 |
  response.ts                           |      92 |       75 |     100 |      92 | 29-30
----------------------------------------|---------|----------|---------|---------|-------------------
```

## 开发规范

项目配置了 Git 提交前检查，确保代码质量：

- 代码格式化（Prettier）
- TypeScript 类型检查
- 单元测试（Vitest）

如果任何检查不通过，提交将被阻止。
