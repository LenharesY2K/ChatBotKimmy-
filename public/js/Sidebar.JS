document.addEventListener('DOMContentLoaded', function () {
    const closeSidebarBtn = document.getElementById('CloseSidebar');
    const sidebar = document.querySelector('.sidebar');

    if (closeSidebarBtn && sidebar) {
        closeSidebarBtn.addEventListener('click', function () {
            sidebar.classList.toggle('active');

            const icon = closeSidebarBtn.querySelector('i');
            if (icon) {
                if (sidebar.classList.contains('active')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            }
        });

        document.addEventListener('click', function (event) {
            const isClickInsideSidebar = sidebar.contains(event.target);
            const isClickOnButton = closeSidebarBtn.contains(event.target);
            const isMobile = window.innerWidth <= 768;

            if (!isClickInsideSidebar && !isClickOnButton && sidebar.classList.contains('active') && isMobile) {
                sidebar.classList.remove('active');

                const icon = closeSidebarBtn.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            }
        });
    }

    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
        }
    });
});