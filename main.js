(function(){
        //database Functions
    function loadUsers(){
        try{const raw = localStorage.getItem("users_db");
            return raw ? JSON.parse(raw) : [];
        }
        catch(e)
        {return [];}
    }a
    function loadAdmins(){
        try{const raw = localStorage.getItem("admins_db");
            return raw ? JSON.parse(raw) : [];
        }
        catch(e)
        {return [];}
    }
    //default demo credentials (fallback if no users exist)
    const defaultCredentails = {
        admin: {username: "admin", password: "admin123"},
        user: {username: "user", password: "user123"}
    };

    // login page logic
    const loginForm = document.getElementById("loginForm");
    if (loginForm){
        const err = document.getElementById("error");
        function gotoDashboard(){
            window.location.href = "dashboard.html";
        }
        loginForm.addEventListener('submit', function(e){
            e.preventDefault();
            if (err) err.textContent = '';
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value;

            if (!username || !password){
                if (err) err.textContent = 'Please enter username and password.';
                return
        }
    //check user database first
        const users = loadUsers();
        const userAccount = userAccounts.find(u => u.username === username && u.password === password);
        if (userAccount){
           localStorage.setItem("currentUser", JSON.stringify({username: userAccount.username, role: "user"}));
           gotoDashboard();
           return;
        }
        //check admin database next
        const admins = loadAdmins();
        const adminAccount = admins.find(a => a.username === username );
        if (userAccount && userAccount.password === password){
            localStorage.setitem('role', 'user');
            localStorage.setItem ('username', username);
            gotoDashboard();
            return;
        }

        //Check users database first
        const users = loadUsers();
        const userAccount = users.find(u=>u.username === username );
        if (userAccount && userAccount.password === password){
            localStorage.setItem ('role', 'user');
            localStorage.setItem ('username', username);
            gotoDashboard();
            return;
        }

        // Check admins database
        const admins = loadAdmins();
        const adminAccount = admins.find(a => a.username === username );
        if (adminAccount && adminAccount.password === password){
            localStorage.setItem ('role', 'admin');
            localStorage.setItem ('username', username);
            gotoDashboard();
            return;
        }

        // Fallback to demo credentials
        const account = defaultCredentails[username ];
        if (account && account.password === password){
            localStorage.setItem ('role', account.role );
            localStorage.setItem ('username', username);
            gotoDashboard();
            return;
        }
        if (err) err.textContent = 'Invalid username or password.';
    });

    // demo auto-fill buttons
    const demoAdmin = document.getElementById("demoAdmin");
    const demoUser = document.getElementById("demoUser");
    if (demoAdmin) demoAdmin.addEventListener('click', function(){
            document.getElementById("username").value =     "admin";
            document.getElementById("password").value = "admin123";
        });
    if (demoUser) demoUser.addEventListener('click', function(){
            document.getElementById("username").value = "user";
            document.getElementById("password").value = "user123";
        });
    }
})

   
