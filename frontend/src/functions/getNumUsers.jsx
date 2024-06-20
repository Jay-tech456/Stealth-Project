// getNumUsers.js
const getNumUser = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        return { status: 'ok', data };
      } else {
        console.log("Failed to fetch user count");
        return { status: 'failed', data: null };
      }
    } catch (error) {
      console.error("Error during fetching user count:", error);
      return { status: 'error', data: null };
    }
  };
  
  export default getNumUser;
  