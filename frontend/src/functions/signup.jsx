const signupUser = async (email, password, firstName, lastName) => {
    try {
        const response = await fetch("http://localhost:5001/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, firstName, lastName }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data); // Handle successful sign-up response
            return { status: 'ok', data };
        } else {
            console.log("Sign-up failed");
            return { status: 'failed', data: null };
        }
    } catch (error) {
        console.error("Error during sign-up:", error);
    }
};

export default signupUser;
