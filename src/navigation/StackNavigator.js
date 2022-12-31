import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ManageExpense from '../screens/ManageExpense';
import {GlobalStyles} from '../config/styles';
import ExpensesOverview from './BottomTabs';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
        headerTintColor: 'white',
      }}>
      <Stack.Screen
        name="ExpensesOverview"
        component={ExpensesOverview}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ManageExpense"
        component={ManageExpense}
        options={{
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;
