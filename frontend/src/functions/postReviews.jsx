const postReview = async (reviewData) => {
    try {
      const response = await fetch("http://localhost:5001/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });
  
      if (response.ok) {
        const data = await response.json();
        return { status: 'ok', data };
      } else {
        console.log("Failed to post review");
        return { status: 'failed', data: null };
      }
    } catch (error) {
      console.error("Error during posting review:", error);
      return { status: 'error', data: null };
    }
  };
  
  export default postReview;
  