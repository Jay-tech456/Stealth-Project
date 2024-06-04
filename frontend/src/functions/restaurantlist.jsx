const getRestaurants = async () => {
    try {
        const response = await fetch("http://localhost:5001/api/restaurants", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            return { status: 'ok', data };
        } else {
            console.log("Failed to fetch restaurants");
            return { status: 'failed', data: null };
        }
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        return { status: 'error', data: null };
    }
};

export default getRestaurants;
