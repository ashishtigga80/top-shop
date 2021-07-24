import { useEffect}from 'react';
import { useParams} from "react-router-dom";

const AddtoCart = (props) => {
  var { id } = useParams();
  useEffect(() => {
    props.addtoCart(id);
  },[]);

  return null;

}

export default AddtoCart;