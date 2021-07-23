import { useEffect}from 'react';

const Logout = (props) => {
   useEffect(() => {
    props.logout();
  });

  return null;

}

export default Logout;