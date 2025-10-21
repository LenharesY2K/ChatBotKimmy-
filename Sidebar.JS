// Script para abrir e fechar a sidebar
document.addEventListener('DOMContentLoaded', function() {
  const closeSidebarBtn = document.getElementById('CloseSidebar');
  const sidebar = document.querySelector('.sidebar');
  
  // Verificar se os elementos existem
  if (closeSidebarBtn && sidebar) {
    // Adicionar evento de clique no botão
    closeSidebarBtn.addEventListener('click', function() {
      sidebar.classList.toggle('active');
      
      // Opcional: mudar o ícone do botão
      const icon = closeSidebarBtn.querySelector('i');
      if (icon) {
        if (sidebar.classList.contains('active')) {
          // Sidebar aberta - mostrar ícone de fechar
          icon.className = 'fas fa-times';
        } else {
          // Sidebar fechada - mostrar ícone de menu
          icon.className = 'fas fa-bars';
        }
      }
    });
    
    // Opcional: fechar sidebar ao clicar fora dela em mobile
    document.addEventListener('click', function(event) {
      const isClickInsideSidebar = sidebar.contains(event.target);
      const isClickOnButton = closeSidebarBtn.contains(event.target);
      const isMobile = window.innerWidth <= 768;
      
      if (!isClickInsideSidebar && !isClickOnButton && sidebar.classList.contains('active') && isMobile) {
        sidebar.classList.remove('active');
        
        // Restaurar ícone de menu
        const icon = closeSidebarBtn.querySelector('i');
        if (icon) {
          icon.className = 'fas fa-bars';
        }
      }
    });
  }
  
  // Opcional: ajustar estado da sidebar ao redimensionar a janela
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      // Desktop - sempre mostrar sidebar
      sidebar.classList.remove('active');
    }
  });
});