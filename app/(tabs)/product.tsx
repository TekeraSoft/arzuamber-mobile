import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {getCategoriesDispatch} from "@/store/categorySlice";
import {AntDesign, FontAwesome, MaterialIcons} from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
    clearFilterProducts,
    filterProductDispatch,
    getAllColorsDispatch,
    getAllProductsDispatch
} from "@/store/productSlice";
import ReactNativeModal from 'react-native-modal';
import {filterData} from "@/data/filterData";
import Card from "@/components/product/Card";
import {useLocalSearchParams} from "expo-router";

const {width, height} = Dimensions.get('window');

function Product() {
    const dispatch = useDispatch();
    const {categoryName} = useLocalSearchParams()
    const {categories} = useSelector((state:RootState)=> state.category )
    const { products, filterProducts, loading, colors, page } = useSelector((state:RootState)=> state.product)
    const [pageable, setPageable] = useState({page: 0, size: 10})
    const [isModalVisible, setModalVisible] = useState(false);
    const [isFilterModalOpen, setFilterModalOpen] = useState(false);
    const [filterCount,setFilterCount] = useState(0);

    const [subFilterModalOpen, setSubFilterModalOpen] = useState({color: false, size: false});
    const [openSizeModal, setOpenSizeModal] = useState(false);

    const [selectedFilters, setSelectedFilters] = useState({
        size: null,
        color: null,
        category: categoryName ?? null,
        length: null,
        sortDirection: null,
        onlyDiscounted: false,
    });

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const toggleFilterModal = () => {
        setFilterModalOpen(!isFilterModalOpen);
    }
    const toggleSizeModal = () => {
        setOpenSizeModal(!openSizeModal)
    }

    const clearFilter = () => {
        dispatch(clearFilterProducts());
        setPageable({ page: 0, size: 10 });
        setSelectedFilters({
            size: null,
            color: null,
            category: null,
            length: null,
            sortDirection: null,
            onlyDiscounted: false,
        });
    };

    useEffect(() => {
        let count = 0;
        Object.entries(selectedFilters).forEach(([key, val]) => {
            if (key !== 'category' && val !== null && val !== false) {
                count++;
            }
        });
        setFilterCount(count);
    }, [selectedFilters]);

    useEffect(() => {
        if (categoryName && selectedFilters.category !== categoryName) {
            setSelectedFilters(prev => ({
                ...prev,
                category: categoryName,
            }));
        }
    }, [categoryName]);


    useEffect(() => {

        // Eğer herhangi bir filtre değiştiyse
        const hasFilterChanged =
            selectedFilters.onlyDiscounted ||
            selectedFilters.size ||
            selectedFilters.color ||
            selectedFilters.category ||
            selectedFilters.length ||
            selectedFilters.sortDirection;

        if (hasFilterChanged) {
            // Burada eski ve yeni filtreleri karşılaştırabiliriz

            dispatch(
                filterProductDispatch({
                    size: selectedFilters.size,
                    color: selectedFilters.color,
                    category: selectedFilters.category,
                    length: selectedFilters.length,
                    sortDirection: selectedFilters.sortDirection,
                    onlyDiscounted: selectedFilters.onlyDiscounted,
                    page: pageable.page,
                    pageSize: pageable.size,
                }),
            );
        } else {
            dispatch(getAllProductsDispatch(pageable.page, pageable.size));
        }

        dispatch(getCategoriesDispatch());
        dispatch(getAllColorsDispatch());

    }, [
        selectedFilters.size,
        selectedFilters.color,
        selectedFilters.category,
        selectedFilters.length,
        selectedFilters.sortDirection,
        pageable.page,
        pageable.size,
    ]);

    return (
        <View className={'bg-white h-full'}>
            <View horizontal className={'w-full bg-gray-100 py-2 flex flex-row justify-around'} showsHorizontalScrollIndicator={false}>
               <TouchableOpacity onPress={toggleFilterModal} className={'flex flex-row items-center p-2 px-4 gap-x-2 rounded-full bg-white'}>
                   <FontAwesome name="filter" size={18} color={selectedFilters?.category !== null ? 'black': 'black'} />
                   <Text className={'font-medium'}>Filtrele</Text>
                   {filterCount > 0 && (
                       <View className="bg-pink-500 w-5 h-5 rounded-full items-center justify-center">
                           <Text className="text-white text-xs">{filterCount}</Text>
                       </View>
                   )}
               </TouchableOpacity>

                <TouchableOpacity onPress={toggleModal} className={`${selectedFilters?.category !== null && 'border border-pink-500'} flex flex-row items-center p-2 px-6 gap-x-2 rounded-full bg-white`}>
                    <MaterialIcons name="category" size={18} color={`${selectedFilters?.category !== null ? 'pink': 'black'}`} />
                    <Text className={`${selectedFilters?.category !== null ? 'text-pink-500':'text-black'} font-medium`}>Kategori</Text>
                    {
                        selectedFilters?.category !== null && <View className={`bg-pink-600 flex items-center justify-center w-5 h-5 rounded-full text-xs`}>
                            <Text className={'text-white'}>1</Text>
                        </View>
                    }
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> {
                    clearFilter()
                    setFilterCount(0)
                }} className={`${filterCount > 0 && 'border border-red-600'} flex flex-row items-center p-2 px-2 gap-x-2 rounded-full bg-white`}>
                    <MaterialCommunityIcons  name="delete-forever" size={18} color={filterCount > 0 && 'red'} />
                    <Text className={`${filterCount > 0 && 'text-red-600'} text-sm`}>Filtreyi Temizle</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={filterProducts?.length > 0 ? filterProducts : products}
                showsVerticalScrollIndicator={false}
                style={{ paddingTop: 20, backgroundColor: 'transparent' }}
                numColumns={2}
                onEndReached={() => {
                        setPageable({...pageable, size: pageable.size + 10})
                }}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
                contentContainerStyle={{paddingBottom:80}}
                keyExtractor={(item, index) => index.toString()}
                columnWrapperStyle={{
                    justifyContent: 'space-between',
                    marginBottom: 30,
                    paddingHorizontal: 8,
                }}
                renderItem={({ item, index }) => (
                    <Card key={index} product={item} />
                )}
            />


            <ReactNativeModal
                isVisible={isFilterModalOpen}
                onBackdropPress={toggleFilterModal}
                onBackButtonPress={toggleFilterModal}
                backdropOpacity={0.25}
                style={{ justifyContent: 'flex-end', margin: 0,borderRadius:0 }}
                //animationIn="slideInLeft"
                //animationOut="slideOutLeft"
            >
                <View className={'bg-white'} style={{ padding: 20, borderTopLeftRadius:20, borderTopRightRadius:20, height: height * 0.35 }}>
                    <View className={'flex flex-row items-center justify-between pb-4'}>
                        <Text className={'text-xl font-bold'}>Filtreleme</Text>
                        <TouchableOpacity onPress={toggleFilterModal}>
                            <MaterialIcons name="cancel" size={24} color={'gray'} />
                        </TouchableOpacity>

                    </View>
                  <ScrollView>
                      <View
                          className={'flex flex-row justify-between items-center border border-gray-400 p-4 rounded-lg'}
                      >
                          <Text className={'font-bold text-lg text-gray-500'}>Beden</Text>
                          <AntDesign name="right" size={16} color="gray" />
                          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                              {selectedFilters.size !== null ? (
                                      <View className={`${selectedFilters.size.length < 2 && 'px-3'} border mx-2 rounded-lg p-1`}>
                                          <Text>{selectedFilters.size}</Text>
                                      </View>
                              ): (
                                  filterData.sizes.values.map((item, index) => (
                                      <TouchableOpacity onPress={()=> {
                                          setSelectedFilters({...selectedFilters, size: item})
                                      }} key={index} className={`${item.length < 2 && 'px-3'} border mx-2 rounded-lg p-1`}>
                                          <Text>{item}</Text>
                                      </TouchableOpacity>
                                  ))
                              )}
                          </ScrollView>
                          {
                              selectedFilters.size !== null && <MaterialIcons onPress={()=> setSelectedFilters({...selectedFilters, size: null})} name="cancel" size={24} color="red" />
                          }
                      </View>


                      <View className={'flex flex-row justify-between items-center border border-gray-400 p-4 mt-8 rounded-lg'}>
                          <Text className={'font-bold text-gray-500 text-lg'}>Renk</Text>
                          <AntDesign name="right" size={16} color="gray" />
                          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                              {selectedFilters.color !== null ? (
                                  <View className={'border mx-2 rounded-lg p-1'}>
                                      <Text>{selectedFilters.color}</Text>
                                  </View>
                              ): (
                                  colors.map((item, index) => (
                                      <TouchableOpacity onPress={()=> {
                                          setSelectedFilters({...selectedFilters, color: item.name})
                                      }} key={index} className={`border mx-2 rounded-lg p-1`}>
                                          <Text>{item.name}</Text>
                                      </TouchableOpacity>
                                  ))
                              )}
                          </ScrollView>
                          {
                              selectedFilters.color !== null && <MaterialIcons onPress={()=> setSelectedFilters({...selectedFilters, color: null})} name="cancel" size={24} color="red" />
                          }
                      </View>

                      <View className={'flex flex-row items-center justify-around mt-4'}>
                          <TouchableOpacity
                              style={styles.radioContainer}
                          onPress={() => {
                                  setSelectedFilters({ ...selectedFilters, sortDirection: 'asc' });
                          }}
                          >
                              <View style={[styles.radioCircle, selectedFilters.sortDirection === 'asc' && styles.selectedRadio]}>
                                  {selectedFilters.sortDirection === 'asc' && <View style={styles.radioDot} />}
                              </View>
                              <Text style={styles.label}>{'Fiyata Göre Düşük'}</Text>
                          </TouchableOpacity>
                      <TouchableOpacity style={styles.radioContainer} onPress={() => {
                              setSelectedFilters({ ...selectedFilters, sortDirection: 'desc' });
                      }}>
                              <View style={[styles.radioCircle, selectedFilters.sortDirection === 'desc' && styles.selectedRadio]}>
                                  {selectedFilters.sortDirection === 'desc' && <View style={styles.radioDot} />}
                              </View>
                              <Text style={styles.label}>{'Fiyata Göre Yüksek'}</Text>
                          </TouchableOpacity>
                      </View>
                  </ScrollView>
                </View>
            </ReactNativeModal>


            <ReactNativeModal
                isVisible={isModalVisible}
                onBackdropPress={toggleModal}
                onBackButtonPress={toggleModal}
                backdropOpacity={0.25}
                style={{ justifyContent: 'flex-end', margin: 0,borderRadius:0 }}
                //animationIn="slideInLeft"
                //animationOut="slideOutLeft"
            >
                <View style={{ backgroundColor: 'white', borderTopLeftRadius:20, borderTopRightRadius:20, padding: 20, height: height * 0.5 }}>
                    <View className={'flex flex-row items-center justify-between border-b my-4 pb-4 border-gray-300'}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold'}}>Kategori</Text>
                        <TouchableOpacity onPress={toggleModal}>
                            <Text style={{ color: 'blue' }}>Kapat</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            categories.map((item, index) => (
                                <TouchableOpacity onPress={()=> setSelectedFilters({...selectedFilters, category: item.name})} key={index} className={`${selectedFilters.category === item.name && 'border-blue-600'} flex flex-row items-center border p-4 my-2 rounded-full`}>
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>
                </View>
            </ReactNativeModal>

            <ReactNativeModal
                isVisible={openSizeModal}
                onBackdropPress={toggleSizeModal}
                onBackButtonPress={toggleSizeModal}
                backdropOpacity={0.25}
                style={{ justifyContent: 'flex-end', margin: 0,borderRadius:0 }}
            >
                <View style={{ backgroundColor: 'white', borderTopLeftRadius:20, borderTopRightRadius:20, padding: 20, height: height * 0.5 }}>
                    <View className={'flex flex-row items-center justify-between border-b my-4 pb-4 border-gray-300'}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold'}}>Kategori</Text>
                        <TouchableOpacity onPress={()=> setSubFilterModalOpen({...subFilterModalOpen, size: !subFilterModalOpen.size})}>
                            <Text style={{ color: 'blue' }}>Kapat</Text>
                        </TouchableOpacity>
                    </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {filterData.sizes.values.map((item, index) => (
                                <TouchableOpacity key={index} className={'border mx-2 rounded-lg p-1'}>
                                    <Text>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                </View>
            </ReactNativeModal>

        </View>
    );
}

export default Product;


const styles = StyleSheet.create({
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    radioCircle: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#444',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedRadio: {
        borderColor: '#007aff',
    },
    radioDot: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#007aff',
    },
    label: {
        marginLeft: 10,
        fontSize: 16,
    },
});