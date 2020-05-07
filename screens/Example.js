import { Switch } from 'react-native';

renderServicesContent = section => {
    let taskrendered = [];
    let checked      = [];
    const toggleSwitch = (index) => checked[index]=!checked[index];
    updateTasks    = this.state.updateTaks;
    deleteTaskFunc = this.state.deleteTaskFunc;
const default_tasks =[
  {element1},{element2},{element3}
]
  default_tasks.map(function(elemen, index) {
        checked[index] = false;
     

        taskrendered.push(
            <ListItem>
                <Switch
                    style={{
                        flex: 1, 
                        padding: 10, 
                        marginRight: normalize(8)
                    }}
                    onValueChange={toggleSwitch(index)}
                    value={ checked[index]}
                />
                <Text 
                
                >
                    hello
                </Text>
            </ListItem>
        );
    });

    return (
        <View>
            {taskrendered}
        </View>
    );
}