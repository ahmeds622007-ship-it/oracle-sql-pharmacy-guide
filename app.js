document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.nav-tab');
    const sections = document.querySelectorAll('.course-section');
    const showAllBtn = document.getElementById('toggleShowAll');
    const themeBtns = document.querySelectorAll('[data-set-theme]');

    function activateSection(targetId) {
        document.body.classList.remove('show-all-mode');
        if (showAllBtn) {
            showAllBtn.classList.remove('active');
            showAllBtn.textContent = '📖 عرض المنهج كامل في صفحة واحدة';
        }

        tabs.forEach(t => {
            t.classList.toggle('active', t.dataset.target === targetId);
        });

        sections.forEach(sec => {
            sec.classList.toggle('active', sec.id === targetId);
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            activateSection(tab.dataset.target);
        });
    });

    document.querySelectorAll('[data-goto]').forEach(btn => {
        btn.addEventListener('click', () => {
            activateSection(btn.dataset.goto);
        });
    });

    if (showAllBtn) {
        showAllBtn.addEventListener('click', () => {
            const isAll = document.body.classList.toggle('show-all-mode');
            showAllBtn.classList.toggle('active', isAll);
            showAllBtn.textContent = isAll
                ? '🗂️ العودة لنظام التبويبات'
                : '📖 عرض المنهج كامل في صفحة واحدة';
        });
    }

    // Theme Switcher (Light / Sepia / Dark)
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.setTheme;
            document.documentElement.setAttribute('data-theme', theme);
            themeBtns.forEach(b => b.classList.toggle('active', b === btn));
        });
    });

    // Copy Button Functionality
    document.querySelectorAll('.code-container').forEach(container => {
        const pre = container.querySelector('pre');
        const copyBtn = container.querySelector('.copy-btn');
        if (!pre || !copyBtn) return;

        const rawCode = pre.textContent;

        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(rawCode.trim()).then(() => {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = '✅ تم النسخ!';
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                }, 1800);
            });
        });
    });
});
