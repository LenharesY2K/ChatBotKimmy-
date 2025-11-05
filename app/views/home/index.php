 <?php include __DIR__ . '/../Templates/header.php'; ?>

 <div class="orb orb1"></div>
 <div class="orb orb2"></div>
 <div class="orb orb3"></div>
 <div class="orb orb4"></div>

 <div class="particles" id="particles"></div>

 <div class="shine"></div>


 <button id="CloseSidebar">
     <i class="fas fa-bars"></i>
 </button>


 <div class="sidebar">
     <div class="option-menu-icons">
         <i class="right-icon fa fa-fish-fins tooltip" id="fish"></i>
         <img src="<?= str_replace('public/', '', $user['profile_image'] ?? 'uploads/default_photo.jpeg') ?>" alt="Profile"
             alt="User" class="profile-sidebar left-icon" id="user">
     </div>
     <ul>
         <li>
             <div class="option-menu tooltip" id="newChat">
                 <i class="fa-regular fa-pen-to-square fa-2x"></i>
                 <a>New Chat</a>
             </div>
         </li>
         <li>
             <div class="option-menu tooltip">
                 <i class="fa fa-magnifying-glass"></i>
                 <a href="#">Search</a>
             </div>
         </li>
     </ul>
     <span class="span-sidebar">
         <h1>Chats</h1>
     </span>
     <ul id="chatList">

     </ul>
     <div class="end-session">
         <div class="yellow-line"></div>
         <div class="logout-btn">
             <i class="fa fa-right-from-bracket"></i>
             <a href="/getStarted">Sair</a>
         </div>
     </div>

 </div>

 <div class="content">
     <div class="input-baseline">
         <input type="text" id="userInput" placeholder="Type your message..." />
         <button onclick="sendMessage()"><i class="fa fa-right-to-bracket fa-2x "></i></button>
     </div>
 </div>

 <div class="chat-header">

     <div id="chatBox"></div>

 </div>

 <script>
     window.userId = <?php echo json_encode($userId); ?>;
 </script>

 <?php include __DIR__ . '/../Templates/footer.php'; ?>