(Function() {
    //--Datanase functions--//
    function loadUserS(){
        try{const raw = localStorage.getItem("users_db");
            return raw ? JSON.parse(raw) : [];
        }
        catch(e)
        {return [];}
    }
    function loadAdmins(){  
        try{const raw = localStorage.getItem("admins_db");
            return raw ? JSON.parse(raw) : [];}
        catch(e)
        {return [];}
    }

    //Default Demo credentials(fallcback if no users exists)
    const defaultCredentails = {
        admin: {role: "admin", password: "admin123"},
        user: {role: "user", password: "user123"}   
    };
    //--Login page logic--//
    const loginForm = document.getElementById("login-form");
    if(loginForm){
        const err = document.getElementById("error-msg");
        function goToDashboard(){
            window.location.href = "dashboard.html";
        }

    loginForm.addEventListener("submit", function(e){
        e.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;

        if(!username || !password){
            if (err)err.textContent = "Please enter username and password.";
                return;
            }
        // check user database first
        const users = loadUserS();
        const user = users.find(u => u.username === username .password === password)
        if(userAccount && usserAccount.password === password){
            localStorage.setItem('role', 'user');
            localStorage.setItem('username', username);
            goToDashboard();
            return;
        }

        // check admin database next
        const admins  = loadAdmins();
        const adminAccount = admins.find(a => a.username === username);
        if (adminAccount && adminAccount.password === password){
            localStorage.setItem('role', 'admin');
            localStorage.setItem('username', username);
            goToDashboard();
            return;
        }   
        
        // fallback to demo credentials
        const account = defaultCredentails[username];
        if(account && account.password === password){
            localStorage.setItem('role', account.role);
            localStorage.setItem('username', username);
            goToDashboard();
            return;
        }

        if(err) err.textContent = "Invalid username or password.";
    });
    
    // Demo quick-fill buttons
    const adminDemoBtn = document.getElementById("demoAdminBtn");
    const userDemoBtn = document.getElementById("demoUserBtn");
    if(adminDemoBtn) demoAdmin.addEventListener("click", function(){
        document.getElementById("username").value = "admin";
        document.getElementById("password").value = "admin123";
    });
    if(userDemoBtn) userDemoBtn.addEventListener("click", function(){
        document.getElementById("username").value = "user";
        document.getElementById("password").value = "user123";
    });
    }
});