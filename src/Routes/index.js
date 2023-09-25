import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../pages/Welcome';
import Prospection from '../pages/Prospection';
import TaskList from '../pages/TaskList';
import TaskListAdd from '../pages/TaskListAdd';
import Login from '../pages/Login';

const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='Login'
                component={Login}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name='Welcome'
                component={Welcome}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name='Prospection'
                component={Prospection}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name='TaskList'
                component={TaskList}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name='TaskListAdd'
                component={TaskListAdd}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}