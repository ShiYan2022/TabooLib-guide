import React, { useEffect } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import { IoArrowForward, IoBookOutline, IoTerminalOutline, IoGridOutline } from 'react-icons/io5';
import LanguageRedirect from '../components/LanguageRedirect';

function HomepageHeader() {
  return (
    <div className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}>社区文档</div>
          <h1 className={styles.title}>TabooLib</h1>
          <p className={styles.description}>
            跨平台服务端插件开发框架的社区文档
          </p>
          
          <div className={styles.cta}>
            <Link className={styles.primaryBtn} to="/intro">
              开始使用
              <IoArrowForward />
            </Link>
          </div>
          
          <div className={styles.quickAccess}>
            <Link to="https://tabooproject.org/" className={styles.quickItem}>
              <IoBookOutline />
              官方文档
            </Link>
            <Link to="/kether-list" className={styles.quickItem}>
              <IoTerminalOutline />
              Kether 语句
            </Link>
            <Link to="/plugin-catalog" className={styles.quickItem}>
              <IoGridOutline />
              插件目录
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  useEffect(() => {
    // 只在客户端运行，避免SSR问题
    if (typeof window === 'undefined') return;
    
    // 使用更简单安全的方式 - 只添加CSS样式，不进行DOM移除
    const styleId = 'homepage-hide-elements';
    let existingStyle = document.getElementById(styleId);
    
    if (!existingStyle) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        body.homepage-mode nav.navbar, 
        body.homepage-mode footer.footer, 
        body.homepage-mode .navbar-sidebar, 
        body.homepage-mode .theme-doc-sidebar-container, 
        body.homepage-mode .theme-doc-footer {
          display: none !important;
        }
        body.homepage-mode {
          margin: 0 !important;
          padding: 0 !important;
          overflow-x: hidden !important;
        }
        body.homepage-mode #__docusaurus {
          margin: 0 !important;
          padding: 0 !important;
        }
        body.homepage-mode .main-wrapper {
          margin: 0 !important;
          padding: 0 !important;
        }
      `;
      document.head.appendChild(style);
    }
    
    // 添加body类名
    document.body.classList.add('homepage-mode');

    return () => {
      // 清理时只移除body类名
      document.body.classList.remove('homepage-mode');
      // 不移除style元素，让它保持在页面中，避免DOM错误
    };
  }, []);
  
  return (
    <div className={styles.homepage}>
      <HomepageHeader />
      <LanguageRedirect />
    </div>
  );
}