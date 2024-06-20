import { useEffect, useState } from "react";
import getNumUser from "../functions/getNumUsers";

function Users() {
  const [numUser, setNumberOfUsers] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      const result = await getNumUser();
      if (result.status === 'ok' && result.data) {
        setNumberOfUsers(result.data.userCount);
      }
    };

    fetchUserCount();
  }, []);

  return ( 
    <div>
      <p>Number of Users: {numUser}</p>
    </div>
  );
}

export default Users;
