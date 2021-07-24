import { useEffect}from 'react';
import { useParams} from "react-router-dom";

const DeletefromCart = (props) => {
  var { id } = useParams();
  useEffect(() => {
    console.log('delete mf')
    props.deletefromCart(id);
  },[]);

  return null;

}

export default DeletefromCart;