# Movie Rating

> 在线预览：https://movie-rating-app-bice.vercel.app

## 功能描述

- 登录
- 登出
- 首页
- 电影详情
- 电影评分
- 电影评论
- 电影搜索
- 深浅主题
- 自适应

## 项目结构

```sh
movie-rating/
├── config/                # 配置文件
│   └── data/              # 初始化数据
├── src/
│   ├── app/               # Next.js 应用路由
│   │   ├── page.tsx       # 首页
│   │   ├── layout.tsx     # 根布局
│   │   ├── globals.css    # 全局样式
│   │   └── movie/         # 电影相关路由
│   │       └── [id]/      # 电影详情页，动态路由
│   ├── components/        # React 组件
│   │   ├── header/        # 页面头部组件
│   │   ├── ui/            # chakra 生成代码
│   │   └── login-dialog/  # 登录对话框组件
│   ├── constants/         # 常量定义
│   ├── database/          # 数据库相关
│   ├── server-actions/    # 服务端操作，包含登录、登出等功能
│   └── utils/             # 工具函数
├── next.config.ts         # Next.js 配置
├── package.json           # 项目依赖
└── tsconfig.json          # TypeScript 配置
```

## 项目技术栈

### 基础

- `next.js 15`
- `react 19`

### 样式

- `chakra ui 3`
- `tailwindcss 4`

### 状态管理

暂未使用， 目前功能较为简单暂时不需要共享太多状态

### 与后端交互

目前使用 `next.js` 的 `server actions` 与后端交互

### 数据校验

使用 `zod` 进行数据校验

### 测试

这里选用了比 `jest` 更为强大的 `vitest` 进行单元测试

- `vitest`
- `happy-dom`
- `@testing-library/dom`
- `@testing-library/react`
- `@testing-library/user-event`

### 数据库

当前使用 `redis` 模拟数据库, 使用 `ioredis` 连接

### 其他

- `husky` - `git hook`
- `prettier` - 代码格式化
- `eslint` - 代码检查
- `lint-staged` - 提交检查

## 项目启动

### 前置条件

需要安装以下内容：

- `node@22` 见 `.nvmrc`
- `pnpm@9` 见 `package.json#packageManager`
- `redis`, 或者使用 `docker`: 运行 `docker run --name movie-rating-redis -p 6379:6379 -d redis`

### 安装项目依赖

```sh
pnpm install
```

### 初始化数据

#### 本地 redis

使用 `docker` 启动 `redis` 服务

```sh
docker run --name movie-rating-redis -p 6379:6379 -d redis
```

```sh
pnpm run init:data
```

#### 云端 redis

使用云端 `redis` 运行

添加环境变量到 `.env.local`

```sh
REDIS_URL=redis://...
```

然后运行

```sh
REDIS_URL=redis://... pnpm run init:data
```

### 启动项目

```sh
pnpm run dev
```

项目运行后访问：[http://localhost:3000](http://localhost:3000) 进入首页

## 运行测试

目前单元测试文件和代码在同一文件夹下，通过后缀名区分

- `*.ts` 为代码文件
- `*.spec.ts` 为测试文件

运行测试

```sh
pnpm run test
```

### 目前的测试覆盖率

```sh
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

## 提交代码

配置有 `pre-commit` 钩子， 在提交代码时会进行格式化代码 / `typescript` 类型检查 / `vitest` 单元测试， 如果检查不通过会阻止提交
