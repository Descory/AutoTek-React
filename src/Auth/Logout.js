import {useHistory, withRouter} from "react-router-dom";

const Logout = () => {
    const history = useHistory();

    localStorage.removeItem(`auth_token`)
    localStorage.removeItem(`user_name`)
    localStorage.removeItem(`user_role`)
    localStorage.removeItem(`user_email`)
    history.push('/prisijungimas')
    return null;

}

export default withRouter(Logout);
