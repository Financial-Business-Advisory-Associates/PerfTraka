import { Alert, Platform, StatusBar, StyleSheet, FlatList, TouchableOpacity, View, Dimensions } from 'react-native'
import React, { useState } from 'react'
// import { FlashList, FlashListProps, MasonryFlashListProps } from '@shopify/flash-list'
import Avatar from '@/components/Avatars';
import Colors from '@/constants/Colors';
import { ThemedInput, ThemedText, ThemedView, ThemedButton } from '@/components/ui';
import { useAppState } from '@/app/zus/store';
import { GuardInterface, User } from '@/types';
import { defaultUser } from '@/assets/images';
import { DefaultModal } from '@/components/Modals';
import { EvilIcons, Feather } from '@expo/vector-icons';
import useDebouncedSearch from '@/app/hooks/useDebouncedSearch';
import { searchGuards } from '@/app/services/annonymousApi';
import { useNavigation } from '@react-navigation/native';


type SelectedGuard = {
   name: string;
   id: number;
}
interface SecurityGuardSearchProps {
   value: any;
   label: string;
   error?: string;
   onSelectGuard: (value: any) => void;
}
const SecurityGuardSearch = ({ label, onSelectGuard, error, value, ...rest }: SecurityGuardSearchProps) => {
   const securityGuards = useAppState((state) => state.guards);

   const [showDropDown, setShowDropDown] = useState(false)
   const { searchTerm, searchResults, handleSearch } = useDebouncedSearch(searchFunction, 500);

   // const navigation = useNavigation();


   /**
    * 
    * @param guard 
    */
   const handleSelect = (guard: SelectedGuard) => {
      onSelectGuard(guard)
      handleSearch('');
      setShowDropDown(false)
   }

   const closeModal = () => {
      handleSearch('');
      setShowDropDown(false)
   }

   /**
  * flashlist render item
  * @param param0 
  * @returns 
  */
   const _renderGuards = ({ item }: { item: GuardInterface }) => {

      const selected = item.id == value;
      let name = `${item.first_name} ${item.last_name}`;
      return (
         // <TouchableOpacity style={{ height: 70 }}>
         <TouchableOpacity onPress={() => handleSelect({ name, id: item.id })} style={[styles.itemContainer, selected && { backgroundColor: Colors.light.secondary, borderRadius: 20 }]}>
            <Avatar fit='cover' containerWidth={40} containerHeight={40} source={item.profile_image as string} placeholder={defaultUser} />
            <ThemedView transparent style={{ width: '60%' }}>
               <ThemedText size={13} family='medium' style={[styles.itemText, selected && { color: Colors.light.white }]}>{name}</ThemedText>
            </ThemedView>
         </TouchableOpacity>
         // </TouchableOpacity>
      )
   }

   async function searchFunction(searchTerm: string): Promise<GuardInterface[]> {
      try {
         // Perform search operation locally
         const filteredItems = await searchItems(securityGuards, searchTerm);
         if (searchTerm.trim() === '') {
            return securityGuards;
         }

         // If no local matches found, search via endpoint
         if (filteredItems.length === 0) {
            const endpointResults = await searchItemsViaEndpoint(searchTerm);
            return [...endpointResults];
         }

         return filteredItems;
      } catch (error) {
         console.error('Error searching:', error);
         throw new Error('Failed to perform search operation');
      }
   };


   const searchItems = async (items: GuardInterface[], searchTerm: string): Promise<GuardInterface[] | []> => {
      try {
         // Convert the search term to lowercase for case-insensitive search
         const searchTermLower = searchTerm.toLowerCase();

         // Use a Set to store found item IDs for fast lookups
         const foundItemIds = new Set<number>();

         // Iterate through items to find matches
         items.forEach(item => {
            if (item.first_name.toLowerCase().includes(searchTermLower) ||
               item.last_name.toLowerCase().includes(searchTermLower)) {
               foundItemIds.add(item.id);
            }
         });

         // Filter items based on the found item IDs
         let filteredItems = items.filter(item => foundItemIds.has(item.id));

         // If no local matches found, search via endpoint
         if (filteredItems.length === 0) {
            const endpointResults = await searchItemsViaEndpoint(searchTerm);
            filteredItems = [...endpointResults];
         }

         return filteredItems;
      } catch (error) {
         console.error('Error searching:', error);
         return [];
         // throw new Error('Failed to perform search operation');
      }
   };

   async function searchItemsViaEndpoint(searchTerm: string): Promise<GuardInterface[]> {
      try {

         if (!searchTerm) return [];
         const response = await searchGuards({ name: searchTerm });
         let d = response.data.guards.data;
         return d;
      } catch (error) {
         // Alert.alert("Failed to fetch data");
      }
      return []
   }

   return (
      <>
         <TouchableOpacity style={styles.selectorContainer} onPress={() => setShowDropDown(true)}>
            <ThemedText family="medium" size={14} style={[styles.label]}>{label}</ThemedText>
            <ThemedView transparent style={[styles.selector]}>
               <Feather name="user" size={22} color="black" />
               <ThemedText family='regular' size={14}>{value || "Select Personnel"}</ThemedText>
            </ThemedView>
            {error && (
               <ThemedText size={12} style={{ color: 'red', paddingVertical: 2, fontStyle: 'italic' }}>{error}</ThemedText>
            )}
         </TouchableOpacity>

         <DefaultModal useDefaultView={false} visible={showDropDown} style={{ width: '90%' }} onClose={closeModal}>
            <ThemedView style={[styles.container]}>
               <View style={styles.modalHeader}>
                  <ThemedText family={"semi-bold"} size={14} style={[styles.label,]}>{label}</ThemedText>
                  <TouchableOpacity style={styles.closeBtn} onPress={closeModal}>
                     <EvilIcons name="close" size={24} color="black" />
                  </TouchableOpacity>
               </View>
               <View>
                  <ThemedInput noPadding value={searchTerm} placeholder='Search guard...' onChangeText={handleSearch} name='search' iconName='search' iconColor={Colors.light.green800} label='' />
               </View>

               <View style={{ flex: 1, width: '100%', paddingBottom: 100 }}>
                  <FlatList ListEmptyComponent={() => <EmptyComponent closeModal={closeModal} />} data={searchTerm.trim() != '' ? searchResults : securityGuards} renderItem={_renderGuards} keyExtractor={(_item, index) => index.toString()} />
               </View>

            </ThemedView>
         </DefaultModal>

      </>
   )
}

export default SecurityGuardSearch

function EmptyComponent({ closeModal }: { closeModal: () => void }) {
   const HEIGHT = Dimensions.get('screen').height;
   const { navigate } = useNavigation();
   return (
      <>
         <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', height: HEIGHT / 4 }}>
            <ThemedText family="semi-bold" size={24}>No Security Personel Found</ThemedText>
            <ThemedText family='thin' size={14} style={{ marginVertical: 10, textAlign: 'center', width: '80%' }}>Add a new Security Personnel and continue with taking attendance</ThemedText>

         </View>
         <ThemedButton
            containerStyle={styles.addButton}
            title='Add personnel'
            handleClick={() => {
               navigate('AddGuard')
               closeModal();
            }}
         />

      </>
   )
}

const styles = StyleSheet.create({
   addButton: {
      marginTop: 40,
   },

   selectorContainer: {
      width: '100%',
      // height: 45,
   },
   selector: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: 10,
      borderColor: Colors.light.mutedText,
   },
   modalHeader: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',

   },
   container: {
      width: '100%',
      height: '100%',
      flex: 1,
      position: 'absolute',
      top: Platform.OS == 'android' ? StatusBar.currentHeight : 40,
      // paddingHorizontal: UiDefaults.viewPadding
   },
   label: {
      marginBottom: 5
   },
   itemContainer: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: Colors.light.mutedText,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 20,
      height: 70
      // justifyContent: 'space-between',
   },
   itemText: {
      lineHeight: 20,
   },
   closeBtn: {
      padding: 10,
      // backgroundColor: 'blue',
      width: 50,
      alignItems: 'center',
      justifyContent: 'center',
      // height: 100,
   }
})