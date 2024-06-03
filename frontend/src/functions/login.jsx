const loginUser = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        return { status: 'ok', data };
      } else {
        console.log("Login failed");
        return { status: 'failed', data: null };
      }
    } catch (error) {
      console.error("Error during login:", error);
      return { status: 'error', data: null };
    }
  };
  
  export default loginUser;
