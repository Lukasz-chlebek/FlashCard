import { RootStackScreenProps } from '../types'
import {
  Button,
  ButtonGroup,
  Card,
  Divider,
  Icon,
  Input,
  Layout,
  MenuItem,
  Modal,
  OverflowMenu,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components'
import { DecksList } from '../components/DecksList'
import { useState } from 'react'
import { StyleSheet } from 'react-native'

const MenuIcon = (props: any) => <Icon {...props} name="more-vertical" />
const AddIcon = (props: any) => <Icon {...props} name="plus-outline" />

export default function HomeScreen({ navigation }: RootStackScreenProps<'Home'>) {
  const [menuVisible, setMenuVisible] = useState(false)
  const [addModalVisible, setAddModalVisible] = useState(false)
  const [newDeckName, setNewDeckName] = useState('')

  const toggleMenu = () => {
    setMenuVisible(!menuVisible)
  }

  const renderMenuAction = () => <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />

  const renderRightActions = () => (
    <>
      <TopNavigationAction icon={AddIcon} onPress={() => setAddModalVisible(true)} />

      <OverflowMenu anchor={renderMenuAction} visible={menuVisible} onBackdropPress={toggleMenu}>
        <MenuItem title="Eksport" />
        <MenuItem title="Import" />
      </OverflowMenu>
    </>
  )

  return (
    <>
      <TopNavigation title="Fiszki" alignment="center" accessoryRight={renderRightActions} />
      <Divider />
      <Layout>
        <Modal
          visible={addModalVisible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setAddModalVisible(false)}
        >
          <Card disabled={true}>
            <Text>Dodaj talię kart</Text>
            <Input
              value={newDeckName}
              placeholder="Podaj nazwę nowej talii"
              onChangeText={(nextValue) => setNewDeckName(nextValue)}
            />
            <ButtonGroup>
              <Button onPress={() => setAddModalVisible(false)} status="basic">
                Anuluj
              </Button>
              <Button onPress={() => {}}>Zapisz</Button>
            </ButtonGroup>
          </Card>
        </Modal>

        <DecksList />
      </Layout>
    </>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})
