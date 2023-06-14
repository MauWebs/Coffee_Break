import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Profile() {

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  return (

    <>

      {userInfo.user_name} <br />

      {userInfo.email} <br />

      <button>
        <Link to='/editUser'>Edit my profile</Link>
      </button>

    </>

  );

};

export default Profile;