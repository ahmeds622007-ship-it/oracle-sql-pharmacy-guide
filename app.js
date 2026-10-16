document.addEventListener('DOMContentLoaded', () => {
    const landingView = document.getElementById('landing-view');
    const sections = document.querySelectorAll('.course-section');
    const showAllBtn = document.getElementById('toggleShowAll');
    const themeBtns = document.querySelectorAll('[data-set-theme]');

    function showLandingPage() {
        document.body.classList.remove('show-all-mode');
        if (showAllBtn) {
            showAllBtn.classList.remove('active');
            showAllBtn.textContent = '📖 عرض المنهج كامل';
        }
        sections.forEach(sec => sec.classList.remove('active'));
        if (landingView) landingView.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function openSection(targetId) {
        if (targetId === 'landing-view') {
            showLandingPage();
            return;
        }
        document.body.classList.remove('show-all-mode');
        if (showAllBtn) {
            showAllBtn.classList.remove('active');
            showAllBtn.textContent = '📖 عرض المنهج كامل';
        }
        if (landingView) landingView.classList.add('hidden');
        sections.forEach(sec => {
            sec.classList.toggle('active', sec.id === targetId);
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // All elements with [data-goto] (Landing Cards, Return Buttons, Next/Prev Buttons)
    document.querySelectorAll('[data-goto]').forEach(el => {
        el.addEventListener('click', () => {
            openSection(el.dataset.goto);
        });
    });

    // Show All Mode Toggle
    if (showAllBtn) {
        showAllBtn.addEventListener('click', () => {
            const isAll = document.body.classList.toggle('show-all-mode');
            showAllBtn.classList.toggle('active', isAll);
            showAllBtn.textContent = isAll
                ? '🏠 العودة للصفحة الرئيسية'
                : '📖 عرض المنهج كامل';
            if (!isAll) {
                showLandingPage();
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // Theme Switcher (Dark Default / Light / Sepia)
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

        copyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
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
