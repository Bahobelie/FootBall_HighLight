import {useRoutes} from "react-router-dom";
import AutRoutes from "./AutRoutes";
import MainRoutes from "./MainRoutes";


export  default  function ThemeRoutes () {
    return useRoutes([MainRoutes,AutRoutes]);

}