import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Switch, Alert } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DraggableFlatList, {
  ScaleDecorator,
  ShadowDecorator,
  OpacityDecorator,
  useOnCellActiveAnimation,
} from 'react-native-draggable-flatlist';

export default function App() {
  const ref = useRef(null);
const [data, setData] = useState([
          {
              key: '1',
              label: 'Profile Summary',
              description: 'This section provides a summary of your profile.',
              height:65,
              isEditing: false,
              editedLabel: '',
          },
          {
              key: '2',
              label: 'Academic and Cocurricular Achievements',
              description: 'Highlight your academic and cocurricular achievements in this section.',
              height: 80,
              isEditing: false,
              editedLabel: '',
          },
          {
              key: '3',
              label: 'Summer Internship Experience',
              description: 'Share your experience and learnings from summer internships.',
              height:65,
              isEditing: false,
              editedLabel: '',
          },
          {
              key: '4',
              label: 'Work Experience',
              description: 'List your work experiences and responsibilities in this section.',
              height:65,
              isEditing: false,
              editedLabel: '',
          },
          {
              key: '5',
              label: 'Projects',
              description: 'Showcase your projects and highlight your contributions.',
              height:65,
              isEditing: false,
              editedLabel: '',
          },
          {
              key: '6',
              label: 'Certifications',
              description: 'Display your certifications and acquired skills.',
              height:65,
              isEditing: false,
              editedLabel: '',
          },
          {
              key: '7',
              label: 'Leadership Positions',
              description: 'Highlight your leadership positions and responsibilities.',
              height:65,
              isEditing: false,
              editedLabel: '',
          },
          {
              key: '8',
              label: 'Extracurricular',
              description: 'Include your extracurricular activities and achievements.',
              height:65,
              isEditing: false,
              editedLabel: '',
          },
          {
              key: '9',
              label: 'Education',
              description: 'Provide details about your educational background.',
              height:65,
              isEditing: false,
              editedLabel: '',
          },
      ]);


  const toggleSwitch = (itemKey) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === itemKey ? { ...item, isEnabled: !item.isEnabled } : item
      )
    );
  };

  const renderItem = ({ item, drag }) => {
    const { isActive } = useOnCellActiveAnimation();

    const handleLabelEdit = () => {
      const updatedData = data.map((dataItem) => {
        if (dataItem.key === item.key) {
          return {
            ...dataItem,
            isEditing: true,
            editedLabel: dataItem.label,
          };
        }
        return {
          ...dataItem,
          isEditing: false,
        };
      });
      setData(updatedData);
    };

    const handleLabelSave = () => {
      const updatedData = data.map((dataItem) => {
        if (dataItem.key === item.key) {
          return {
            ...dataItem,
            isEditing: false,
            label: dataItem.editedLabel,
          };
        }
        return dataItem;
      });
      setData(updatedData);
    };

    const handleDescriptionPress = (description) => {
      Alert.alert('Description', description);
    };

    return (
      <ScaleDecorator>
        <OpacityDecorator activeOpacity={0.5}>
          <ShadowDecorator>
            <TouchableOpacity
              onLongPress={drag}
              activeOpacity={1}
              style={[
                styles.rowItem,
                {
                  height: item.height,
                  backgroundColor: item.backgroundColor,
                  elevation: isActive ? 30 : 0,
                },
              ]}
            >
              {item.isEditing ? (
                <View style={styles.labelContainer}>
                  <TextInput
                    style={styles.editLabelInput}
                    value={item.editedLabel}
                    onChangeText={(text) => {
                      const updatedData = data.map((dataItem) => {
                        if (dataItem.key === item.key) {
                          return {
                            ...dataItem,
                            editedLabel: text,
                          };
                        }
                        return dataItem;
                      });
                      setData(updatedData);
                    }}
                  />
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleLabelSave}
                  >
                    <Text style={styles.saveButtonText}>🖍</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.labelContainer}>
                  <Text style={styles.labelText}>≡{'\t'}</Text>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => handleDescriptionPress(item.description)}
                  >
                    <Text style={styles.iconButtonText}> ⓘ </Text>
                  </TouchableOpacity>
                  <Text style={styles.labelText}>{item.label}</Text>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={handleLabelEdit}
                  >
                    <Text style={styles.editButtonText}>🖍</Text>
                  </TouchableOpacity>
                  <View style={styles.switchContainer}>
                    <Switch
                      style={styles.switches}
                      trackColor={{
                        false: '#767577',
                        true: '#81b0ff',
                      }}
                      thumbColor={item.isEnabled ? '#f5dd4b' : '#f4f3f4'}
                      onValueChange={() => toggleSwitch(item.key)}
                      value={item.isEnabled}
                    />
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </ShadowDecorator>
        </OpacityDecorator>
      </ScaleDecorator>
    );
  };

  const handleSaveButtonPress = () => {
    // Handle save button press here
    console.log('Save button pressed');
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Select your sections</Text>
      </View>
      <DraggableFlatList
        ref={ref}
        data={data}
        keyExtractor={(item) => item.key}
        onDragEnd={({ data }) => setData(data)}
        renderItem={renderItem}
      />
      <TouchableOpacity
        style={styles.saveButtonContainer}
        onPress={handleSaveButtonPress}
      >
        <Text style={styles.saveButtonText}>Save and Next</Text>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
  },
  rowItem: {
    paddingHorizontal: 25,
    justifyContent: 'center',
    borderWidth: 0.2,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  labelText: {
    fontSize: 19,
    color: 'black',
    flexShrink: 1,
//    alignSelf: 'center',
  },
  editButton: {
    marginLeft: 'auto',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    right: 10,
  },
  editButtonText: {
    color: '#ffff',
    fontWeight: 'bold',
  },
  editLabelInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  saveButton: {
    marginLeft: 'auto',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'normal',
  },
  iconButtonText: {
    color: 'black',
    fontSize: 18,
        alignSelf: 'center',
  },
  saveButtonContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: 14,
  width: 300,
  height: 52,
  backgroundColor: '#8A4893',
  borderRadius: 10,

//    alignItems: 'center',
//    justifyContent: 'center',
//    height: 40,
//    width:65,
    marginTop: 14,
    alignSelf: 'center',
  },
});
