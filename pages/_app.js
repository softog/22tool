import App from 'next/app'
import { ConfigProvider, theme as antTheme, message } from 'antd'
import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Router from 'next/router';
import NProgress from 'nprogress';
import { LRUCache } from 'lru-cache';

import 'antd/dist/reset.css'
import 'nprogress/nprogress.css';
import '../styles/globals.css';

// 配置 message
message.config({
  maxCount: 2, // 最多显示两条消息
});

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});

Router.events.on('routeChangeError', () => {
  NProgress.done();
});

export const TestContext = React.createContext({})
export const cache = new LRUCache({
  max: 100, // 缓存最大条目数
  maxAge: 1000 * 60 * 60 * 24, // 每个条目的最长生命周期（24小时）
});

async function fetchData() {
  const response = await fetch('https://tool.softog.com/api/category')
  const data = await response.json()
  const categoryItems = data.code === 200 ? data.data : null
  return categoryItems;
}

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }


    let categoryItems = cache.get('categoryItems');
    if (!categoryItems) {
      categoryItems = await fetchData();
      cache.set('categoryItems', categoryItems);
    }
    return { pageProps, categoryItems }
  }

  state = {
    darkMode: false
  }

  toggleDarkMode = () => {
    this.setState(prevState => ({ darkMode: !prevState.darkMode }))
  }

  render() {
    const { Component, pageProps, categoryItems } = this.props
    const { darkMode } = this.state
    return (
      <TestContext.Provider value={{ categoryItems }}>
        <Head>
          <style>{`
            html, body, #__next {
              height: 100%;
            }
          `}</style>
        </Head>
        <ConfigProvider
          theme={{
            algorithm: darkMode
              ? antTheme.darkAlgorithm
              : antTheme.defaultAlgorithm,
          }}
        >
          <Component
            {...pageProps}
            categoryItems={categoryItems}
            darkMode={darkMode}
            setDarkMode={this.toggleDarkMode}
          />
        </ConfigProvider>
      </TestContext.Provider>
    )
  }
}

export default MyApp
