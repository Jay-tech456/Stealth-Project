const getReviews = async (restaurantName) => {
    try {
      const response = await fetch(`http://localhost:5001/api/review?restaurant_name=${encodeURIComponent(restaurantName)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        return { status: 'ok', data };
      } else {
        console.log("Failed to fetch reviews");
        return { status: 'failed', data: null };
      }
    } catch (error) {
      console.error("Error during fetching reviews:", error);
      return { status: 'error', data: null };
    }
  };
  
  export default getReviews;
  