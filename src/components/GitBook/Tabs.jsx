import React, { useState, useRef, useEffect } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './Tabs.module.css';

export default function Tabs({ children, variant = 'default', size = 'medium' }) {
  // 确保children是数组
  const childrenArray = React.Children.toArray(children);

  // 提取所有标题和图标
  const tabsData = childrenArray.map(child => ({
    title: child.props.title,
    icon: child.props.icon,
    disabled: child.props.disabled || false
  }));

  // 状态管理
  const [activeTab, setActiveTab] = useState(0);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const tabListRef = useRef(null);
  const dropdownRef = useRef(null);
  const { colorMode } = useColorMode();

  // 检查是否溢出
  useEffect(() => {
    const checkOverflow = () => {
      if (tabListRef.current) {
        const container = tabListRef.current;
        const isOverflow = container.scrollWidth > container.clientWidth;
        setIsOverflowing(isOverflow);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [children]);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showDropdown]);

  const handleTabClick = (index) => {
    if (!tabsData[index].disabled) {
      setActiveTab(index);
      setShowDropdown(false);
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleTabClick(index);
    } else if (event.key === 'Escape' && showDropdown) {
      setShowDropdown(false);
    }
  };

  const getTabClassName = (index) => {
    let className = `${styles.tabButton} ${styles[variant]} ${styles[size]}`;
    if (index === activeTab) className += ` ${styles.active}`;
    if (tabsData[index].disabled) className += ` ${styles.disabled}`;
    return className;
  };

  return (
    <div className={`${styles.tabContainer} ${styles[variant]} ${styles[colorMode]}`}>
      {/* 桌面端标签栏 */}
      <div
        className={`${styles.tabList} ${isOverflowing ? styles.overflowing : ''}`}
        ref={tabListRef}
      >
        {tabsData.map((tab, index) => (
          <button
            key={index}
            className={getTabClassName(index)}
            onClick={() => handleTabClick(index)}
            disabled={tab.disabled}
            role="tab"
            aria-selected={index === activeTab}
            aria-controls={`tabpanel-${index}`}
            id={`tab-${index}`}
          >
            {tab.icon && <span className={styles.tabIcon}>{tab.icon}</span>}
            <span className={styles.tabTitle}>{tab.title}</span>
          </button>
        ))}
      </div>

      {/* 移动端下拉选择器 - 在移动端或溢出时显示 */}
      <div className={styles.mobileTabSelector} ref={dropdownRef}>
        <button
          className={styles.dropdownToggle}
          onClick={() => setShowDropdown(!showDropdown)}
          onKeyDown={(e) => handleKeyDown(e, activeTab)}
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
        >
          <span className={styles.currentTab}>
            {tabsData[activeTab].icon && (
              <span className={styles.tabIcon}>{tabsData[activeTab].icon}</span>
            )}
            {tabsData[activeTab].title}
          </span>
          <svg
            className={`${styles.dropdownIcon} ${showDropdown ? styles.rotated : ''}`}
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </button>

        {showDropdown && (
          <div className={styles.dropdownMenu}>
            {tabsData.map((tab, index) => (
              <button
                key={index}
                className={`${styles.dropdownItem} ${index === activeTab ? styles.active : ''} ${tab.disabled ? styles.disabled : ''}`}
                onClick={() => handleTabClick(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                disabled={tab.disabled}
                role="option"
                aria-selected={index === activeTab}
              >
                {tab.icon && <span className={styles.tabIcon}>{tab.icon}</span>}
                {tab.title}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 内容区域 */}
      <div className={styles.tabContent}>
        <div
          className={styles.tabPanel}
          role="tabpanel"
          id={`tabpanel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
        >
          {React.cloneElement(childrenArray[activeTab])}
        </div>
      </div>
    </div>
  );
}

export function Tab({ children, title, icon, disabled }) {
  return <div>{children}</div>;
}