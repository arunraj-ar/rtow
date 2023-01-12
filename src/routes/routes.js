import HomeScreen from "../screens/HomeScreen";
import Play from "../screens/Play";


export default {
    root: "start",
    routes: [
        {
            path: "start",
            component: HomeScreen
        },
        {
            path: "play",
            component: Play
        }
    ]
}