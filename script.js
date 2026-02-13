// script.js ———— 独立JS文件，负责导航高亮、统一交互
// 完全与HTML、CSS分离，SPA式激活效果，同时保留多页面跳转

document.addEventListener('DOMContentLoaded', function() {
    // ---------- 功能1：根据当前页面，为导航栏添加active高亮 ----------
    // 获取当前页面的ID (body上的id，如page-home, page-video等)
    const currentBodyId = document.body.id; // 例如 "page-home"
    
    // 如果没有id则尝试从URL判断，但我们的页面都带有精确id，优先使用
    let targetPage = '';
    
    if (currentBodyId && currentBodyId.startsWith('page-')) {
        targetPage = currentBodyId.replace('page-', ''); // 得到 home, video 等
    } else {
        // 保底策略：从URL获取文件名
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        if (page === 'index.html' || page === '') targetPage = 'home';
        else if (page.includes('video')) targetPage = 'video';
        else if (page.includes('edit')) targetPage = 'edit';
        else if (page.includes('audio')) targetPage = 'audio';
        else if (page.includes('book')) targetPage = 'book';
    }

    // 获取所有导航链接
    const navLinks = document.querySelectorAll('.main-nav .nav-link');
    
    // 遍历并为匹配的链接添加active类
    navLinks.forEach(link => {
        const dataPage = link.getAttribute('data-page');
        if (dataPage === targetPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active'); // 移除其他可能遗留的active
        }
    });

    // ---------- 功能2：统一所有卡片上的“查看/播放”按钮占位提示（无需功能）--------
    // 仅用于粉丝站氛围，无实际交互，但可添加轻提示（非必须）
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        // 防止多次绑定
        if (!btn.hasAttribute('data-initialized')) {
            btn.setAttribute('data-initialized', 'true');
            // 可添加title属性，仅展示氛围，无跳转
            if (!btn.getAttribute('title')) {
                btn.setAttribute('title', '粉丝展示页 · 无实际链接');
            }
        }
    });

    // ---------- 功能3：简单页面过渡记录（极轻）---------
    // 可用来添加控制台欢迎语
    console.log('✨ 粉丝小站分类页加载完成 · 当前页面: ' + targetPage);
});

// 额外：防止某些老旧浏览器异常，空函数
window.onerror = function() {
    // 静默处理，保证粉丝站体验
    return true;
};