import { useEffect}from 'react';
import { useParams} from "react-router-dom";
import { useLocation  } from 'react-router';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const UpdateCart = (props) => {
  var { id } = useParams();
  let query = useQuery();
  var quantity =  query.get("quantity");
  useEffect(() => {
    props.updateCart(id, quantity);
  },[]);

  return null;

}

export default UpdateCart;