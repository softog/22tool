import { LRUCache } from 'lru-cache';
import { useRouter } from 'next/router';

export const cache = new LRUCache({
  max: 999, // 缓存最大条目数
  maxAge: 1000 * 60 * 60 * 24, // 每个条目的最长生命周期（24小时）
});

export default class RequestUtil {
  static async get(url) {
    const res = await fetch(url);
    const data = await res.json();
    if (res.status !== 200 || !data || data.code !== 200) {
      return null;
    }
    return data.data ? data.data : null;
  }

  static async getTool(context) {
    const firstLevelPathname = context.resolvedUrl.split('/')[2];
    // TODO: 如果等于null, 那么提示404
    const cachedResult = this.cacheRequest(`tool_${firstLevelPathname}`, () => {
      return this.get(`https://tool.softog.com/api/tool/${firstLevelPathname}`);
    });
    return cachedResult;
  }

  static getToolName() {
    const router = useRouter();
    const currentURL = router.asPath.substring(1);
    return currentURL;
  }

  static cacheRequest(key, dataCallback) {
    let cacheData = cache.get(key);
    if (cacheData) {
      console.log(`缓存${key}`);
      return cacheData;
    }
    console.log(`未缓存${key}`);
    const newData = dataCallback();
    cache.set(key, newData);
    return newData;
  }
}
