import { useEffect}from 'react';
import { useParams} from "react-router-dom";

const DeletefromCart = (props) => {
  var { id } = useParams();
  useEffect(() => {
    props.deletefromCart(id);
  },[]);

  return null;

}

export default DeletefromCart;