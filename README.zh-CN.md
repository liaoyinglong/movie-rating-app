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

## 🚀 快速开始

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
--------------------------------|---------|----------|---------|---------|-------------------
File                            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
--------------------------------|---------|----------|---------|---------|-------------------
All files                       |   80.48 |    87.05 |   89.28 |   80.48 |
 app                            |       0 |      100 |     100 |       0 |
  page.tsx                      |       0 |      100 |     100 |       0 | 3-25
 app/components                 |   76.08 |      100 |     100 |   76.08 |
  movie-grid.tsx                |     100 |      100 |     100 |     100 |
  search-input.tsx              |       0 |      100 |     100 |       0 | 2-26
 app/movie/[id]                 |   63.86 |     87.5 |      50 |   63.86 |
  page.tsx                      |   63.86 |     87.5 |      50 |   63.86 | 81,103-155
 app/movie/[id]/components      |    90.9 |     37.5 |   66.66 |    90.9 |
  rating-trigger.tsx            |    90.9 |     37.5 |   66.66 |    90.9 | 27-32,39-41
 components                     |   96.26 |    66.66 |     100 |   96.26 |
  login-dialog.tsx              |   94.18 |    57.14 |     100 |   94.18 | 26-30
  pagination.tsx                |     100 |      100 |     100 |     100 |
 components/header              |      40 |      100 |      75 |      40 |
  header-user-info.tsx          |   84.21 |      100 |   66.66 |   84.21 | 37-45
  index.tsx                     |       0 |      100 |     100 |       0 | 2-83
 constants                      |     100 |      100 |     100 |     100 |
  cookie-ids.ts                 |     100 |      100 |     100 |     100 |
  modal-ids.ts                  |     100 |      100 |     100 |     100 |
 server-actions                 |     100 |    94.73 |     100 |     100 |
  check-user-is-rated.ts        |     100 |      100 |     100 |     100 |
  get-user-info.ts              |     100 |      100 |     100 |     100 |
  login.ts                      |     100 |      100 |     100 |     100 |
  logout.ts                     |     100 |      100 |     100 |     100 |
  movie-detail.ts               |     100 |      100 |     100 |     100 |
  page-search-movie-comments.ts |     100 |    77.77 |     100 |     100 | 31,46
  page-search-movies.ts         |     100 |      100 |     100 |     100 |
  rate-movie.ts                 |     100 |      100 |     100 |     100 |
 utils                          |     100 |      100 |     100 |     100 |
  base-page-search-schema.ts    |     100 |      100 |     100 |     100 |
  response.ts                   |     100 |      100 |     100 |     100 |
  test-utils.tsx                |     100 |      100 |     100 |     100 |
--------------------------------|---------|----------|---------|---------|-------------------
```

## 开发规范

项目配置了 Git 提交前检查，确保代码质量：

- 代码格式化（Prettier）
- TypeScript 类型检查
- 单元测试（Vitest）

如果任何检查不通过，提交将被阻止。
