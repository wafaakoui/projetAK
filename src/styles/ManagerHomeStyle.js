import { StyleSheet } from 'react-native';

const ManagerHomeStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  sidebar: {
    width: 60,  // Minimized width of sidebar
    backgroundColor: '#333',
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '100%',
  },
  sidebarContainer: {
    flex: 1,
    width: '100%',
  },
  sidebarItem: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  selectedTaskText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E73E01',
    textAlign: 'center',
  },
});

export default ManagerHomeStyle;
