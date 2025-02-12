import Signup from "./components/Signup";


import FetchAllUsers from "./components/FetchAllUsers";

import UpdateUser from "./components/UpdateUser";

export default function Home() {
  return (
    <div >
      
      <Signup />
      <FetchAllUsers/>
      <UpdateUser/>
    </div>
  );
}

