// import Image from "next/image";
// import Signup from "./components/Signup";

// export default function Home() {
//   return (
//     <div>
//       <Signup/>
//     </div>
//   );
// }
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

