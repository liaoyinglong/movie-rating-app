import {
  getRedirectUrl,
  unstable_doesMiddlewareMatch,
} from 'next/experimental/testing/server';
import { NextRequest } from 'next/server';
import { describe, expect, it } from 'vitest';
import { CookieIds } from './constants/cookie-ids';
import { config, middleware } from './middleware';

describe('middleware', () => {
  const BASE_URL = 'http://localhost:3000';

  describe('基础 URL 重写', () => {
    it('should correctly redirect', async () => {
      await Promise.all(
        [
          // 未携带 locale
          {
            path: '/',
            expected: '/en-US/',
          },
          {
            path: '/movie/1',
            expected: '/en-US/movie/1',
          },
          // 不是预期的 locale
          {
            path: '/movie/1',
            expected: '/en-US/movie/1',
          },
          // 可能是拼写错的 locale
          {
            path: '/en-us/movie/1',
            expected: '/en-US/movie/1',
          },
          {
            path: '/zh-cn/movie/1',
            expected: '/zh-CN/movie/1',
          },
        ].map(async (config) => {
          const request = new NextRequest(`${BASE_URL}${config.path}`);
          const response = await middleware(request);
          expect(response).toBeDefined();
          expect(getRedirectUrl(response!)).toBe(
            `${BASE_URL}${config.expected}`,
          );
        }),
      );
    });
  });

  describe('Cookie 语言处理', () => {
    it('should respect language from cookie', async () => {
      const request = new NextRequest(`${BASE_URL}/movie/1`);
      request.cookies.set(CookieIds.Locale, 'zh-CN');

      const response = await middleware(request);
      expect(response).toBeDefined();
      expect(getRedirectUrl(response!)).toBe(`${BASE_URL}/zh-CN/movie/1`);
    });

    it('should set cookie with correct locale after redirect', async () => {
      const request = new NextRequest(`${BASE_URL}/zh-cn/movie/1`);

      const response = await middleware(request);
      expect(response).toBeDefined();
      expect(response!.cookies.get(CookieIds.Locale)?.value).toBe('zh-CN');
    });
  });

  describe('Accept-Language 请求头处理', () => {
    it('should use Accept-Language header when no cookie present', async () => {
      const request = new NextRequest(`${BASE_URL}/movie/1`, {
        headers: {
          'accept-language': 'zh-CN,zh;q=0.9',
        },
      });

      const response = await middleware(request);
      expect(response).toBeDefined();
      expect(getRedirectUrl(response!)).toBe(`${BASE_URL}/zh-CN/movie/1`);
    });

    it('should fallback to default locale when no valid language found', async () => {
      const request = new NextRequest(`${BASE_URL}/movie/1`, {
        headers: {
          'accept-language': 'fr-FR,fr;q=0.9',
        },
      });

      const response = await middleware(request);
      expect(response).toBeDefined();
      expect(getRedirectUrl(response!)).toBe(`${BASE_URL}/en-US/movie/1`);
    });
  });

  describe('查询参数处理', () => {
    it('should preserve query parameters after redirect', async () => {
      const request = new NextRequest(
        `${BASE_URL}/movie/1?ref=123&source=email`,
      );

      const response = await middleware(request);
      expect(getRedirectUrl(response!)).toBe(
        `${BASE_URL}/en-US/movie/1?ref=123&source=email`,
      );
    });
  });

  describe('不需要重定向的情况', () => {
    it('should not redirect when path is in the allowed list', async () => {
      const request = new NextRequest(`${BASE_URL}/en-US/movie/1`);
      const response = await middleware(request);
      expect(response).toBeDefined();
      expect(getRedirectUrl(response!)).toBeNull();
    });
  });

  describe('middleware 匹配', () => {
    it('should match middleware', async () => {
      [
        {
          url: '/',
          expected: true,
        },
        {
          url: '/en-US/',
          expected: true,
        },
        {
          url: '/api/test',
          expected: false,
        },
        {
          url: '/_next/static',
          expected: false,
        },
        {
          url: '/_next/image',
          expected: false,
        },
        {
          url: '/favicon.ico',
          expected: false,
        },
        {
          url: '/_vercel',
          expected: false,
        },
        {
          url: '/movie/1',
          expected: true,
        },
      ].forEach(async (item) => {
        expect(
          unstable_doesMiddlewareMatch({
            config,
            url: item.url,
          }),
        ).toBe(item.expected);
      });
    });
  });
});
