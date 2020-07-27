import React from 'react'
import { SafeAreaView, StyleSheet, View, Image, Dimensions, Text, ScrollView, TouchableOpacity } from 'react-native'
import Menu from '../components/menu'

const Order = () => {

    return (
        <>
        <SafeAreaView>
        <View style={styles.topContainer}>
            <Image source={require('../assets/sangria_logo.png')} style={styles.logo}/>
        </View>

        <ScrollView alwaysBounceVertical={true} showsVerticalScrollIndicator={false} contentInset={{top: 0, left: 0, bottom: 90, right: 0}} >
            <View style={styles.card}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>APERITIVOS</Text>
                <View style={styles.cardContent}>
                    <TouchableOpacity>
                        <View style={styles.menuItems}>
                            <View style={styles.menuItemImageContainer}>
                                <Image source={{uri: 'https://i.pinimg.com/originals/0f/19/48/0f194853758de9a5afd126b0fab05e54.jpg'}} style={styles.menuItemImage} />
                            </View>
                            <View style={styles.menuItemDescription}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>CHICHARRON DE POLLO</Text>
                                <Text style={{color: 'white'}}>crispy chicken bites, orange sour mojo, cilantro sauce</Text>
                            </View>
                            <View style={styles.toroContainer}>
                                <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}} />
                                <Text style={{fontSize:16}}>110</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.menuItems}>
                            <View style={styles.menuItemImageContainer}>
                                <Image source={{uri: 'https://cdn.copymethat.com/media/orig_crispy-cuban-rolls-20170714195647890820u1bw6.jpg'}} style={styles.menuItemImage} />
                            </View>
                            <View style={styles.menuItemDescription}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>CUBAN SPRING ROLLS</Text>
                                <Text style={{color: 'white'}}>ham, roasted pork, swiss cheese, pickles dijon honey mustard</Text>
                            </View>
                            <View style={styles.toroContainer}>
                                <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}}/>
                                <Text style={{fontSize:16}}>100</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.menuItems}>
                            <View style={styles.menuItemImageContainer}>
                                <Image source={{uri: 'https://i.pinimg.com/originals/ab/63/39/ab6339d2060cf7b3a108c25cfcec65f1.jpg'}} style={styles.menuItemImage} />
                            </View>
                            <View style={styles.menuItemDescription}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>MONTADITOS DE MARISCOS</Text>
                                <Text style={{color: 'white'}}>plantain fritters, shrimp, calamari, scallops, guacamole, olive oil vinaigrette</Text>
                            </View>
                            <View style={styles.toroContainer}>
                                <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}}/>
                                <Text style={{fontSize:16}}>120</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.menuItems}>
                            <View style={styles.menuItemImageContainer}>
                                <Image source={{uri: 'https://media1.s-nbcnews.com/i/newscms/2015_18/520311/croquetas-today-150501-tease-_d46b559002833fa38381b418b8f5e23d.jpg'}} style={styles.menuItemImage} />
                            </View>
                            <View style={styles.menuItemDescription}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>CROQUETAS</Text>
                                <Text style={{color: 'white'}}>serrano ham & manchego cheese croquettes, chipotle aioli sauce</Text>
                            </View>
                            <View style={styles.toroContainer}>
                                <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}}/>
                                <Text style={{fontSize:16}}>90</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.menuItems}>
                            <View style={styles.menuItemImageContainer}>
                                <Image source={{uri: 'https://belquistwist.com/wp-content/uploads/2019/08/Yucca-Fritters-2-copy-2.jpeg'}} style={styles.menuItemImage} />
                            </View>
                            <View style={styles.menuItemDescription}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>AREPITAS</Text>
                                <Text style={{color: 'white'}}>braised short ribs, sweet corn arepa, crema nata, tomato escabeche, cotija cheese</Text>
                            </View>
                            <View style={styles.toroContainer}>
                                <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}}/>
                                <Text style={{fontSize:16}}>120</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.menuItems}>
                            <View style={styles.menuItemImageContainer}>
                                <Image source={{uri: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-image.foodandwine.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2F200905-xl-mini-panamanian-beef-empanadas.jpg%3Fitok%3DVxm3-eL_'}} style={styles.menuItemImage} />
                            </View>
                            <View style={styles.menuItemDescription}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>EMPANADAS</Text>
                                <Text style={{color: 'white'}}>choice of chicken, beef or spinach & cheese</Text>
                            </View>
                            <View style={styles.toroContainer}>
                                <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}}/>
                                <Text style={{fontSize:16}}>90</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.menuItems}>
                            <View style={styles.menuItemImageContainer}>
                                <Image source={{uri: 'https://natashaskitchen.com/wp-content/uploads/2020/05/Guacamole-Recipe-5.jpg'}} style={styles.menuItemImage} />
                            </View>
                            <View style={styles.menuItemDescription}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>GUACAMOLE</Text>
                                <Text style={{color: 'white'}}>haas avocado, onions, tomatoes, cilantro, tortilla chips</Text>
                            </View>
                            <View style={styles.toroContainer}>
                                <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}}/>
                                <Text style={{fontSize:16}}>140</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.menuItems}>
                            <View style={styles.menuItemImageContainer}>
                                <Image source={{uri: 'https://www.hotforfoodblog.com/wp-content/uploads/2019/01/vegancalamari_hotforfood_filtered1-scaled.jpg'}} style={styles.menuItemImage} />
                            </View>
                            <View style={styles.menuItemDescription}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>CALAMARI</Text>
                                <Text style={{color: 'white'}}>serrano ham & manchego cheese croquettes, chipotle aioli sauce</Text>
                            </View>
                            <View style={styles.toroContainer}>
                                <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}}/>
                                <Text style={{fontSize:16}}>120</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.menuItems}>
                            <View style={styles.menuItemImageContainer}>
                                <Image source={{uri: 'https://images.media-allrecipes.com/userphotos/4235717.jpg'}} style={styles.menuItemImage} />
                            </View>
                            <View style={styles.menuItemDescription}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>CAMARONES</Text>
                                <Text style={{color: 'white'}}>sautéed rock shrimp with garlic-ginger chili sauce, crispy wonton strips</Text>
                            </View>
                            <View style={styles.toroContainer}>
                                <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}}/>
                                <Text style={{fontSize:16}}>120</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.menuItems}>
                            <View style={styles.menuItemImageContainer}>
                                <Image source={{uri: 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/C8418F2E-FCDF-4612-AB4D-790369D8B767/Derivates/AABF216C-6591-44BC-A5C2-FC8A4A5482E5.jpg'}} style={styles.menuItemImage} />
                            </View>
                            <View style={styles.menuItemDescription}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>ALITAS</Text>
                                <Text style={{color: 'white'}}>crispy chicken wings, chipotle-sweet chili sauce</Text>
                            </View>
                            <View style={styles.toroContainer}>
                                <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}}/>
                                <Text style={{fontSize:16}}>120</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>PLATOS FUERTOS</Text>
                <View style={styles.cardContent} >
                    <TouchableOpacity>
                        <View style={styles.menuItems}>
                            <View style={styles.menuItemImageContainer}>
                                <Image source={{uri: 'https://d1uz88p17r663j.cloudfront.net/resized/5b13f8250caab5db91c735c156c6c75d_Costillas_de_Res_St._Louis_1200_600.jpg'}} style={styles.menuItemImage} />
                            </View>
                            <View style={styles.menuItemDescription}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>COSTILLA DE RES</Text>
                                <Text style={{color: 'white'}}>rioja braised short ribs, creamy yucca mashed, charred green beans</Text>
                            </View>
                            <View style={styles.toroContainer}>
                                <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}} />
                                <Text style={{fontSize:16}}>240</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.menuItems}>
                            <View style={styles.menuItemImageContainer}>
                                <Image source={{uri: 'https://www.cookingclassy.com/wp-content/uploads/2017/02/skillet-seared-salmon-2.jpg'}} style={styles.menuItemImage} />
                            </View>
                            <View style={styles.menuItemDescription}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>SALMON</Text>
                                <Text style={{color: 'white'}}>pan seared salmon, shrimp mashed potatoes, roasted corn salsa</Text>
                            </View>
                            <View style={styles.toroContainer}>
                                <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}} />
                                <Text style={{fontSize:16}}>220</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.menuItems}>
                            <View style={styles.menuItemImageContainer}>
                                <Image source={{uri: 'https://www.recipetineats.com/wp-content/uploads/2018/05/Oven-Baked-Chicken-Breast_-with-Garlic-Butter-Kale-Rice.jpg'}} style={styles.menuItemImage} />
                            </View>
                            <View style={styles.menuItemDescription}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>POLLO AL MOJO</Text>
                                <Text style={{color: 'white'}}>pan roasted semi boneless chicken, roasted garlic sauce, rice & beans</Text>
                            </View>
                            <View style={styles.toroContainer}>
                                <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}} />
                                <Text style={{fontSize:16}}>170</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.menuItems}>
                            <View style={styles.menuItemImageContainer}>
                                <Image source={{uri: 'https://t2.rg.ltmcdn.com/es/images/9/6/0/img_carne_mechada_venezolana_56069_600.jpg'}} style={styles.menuItemImage} />
                            </View>
                            <View style={styles.menuItemDescription}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>MECHADA</Text>
                                <Text style={{color: 'white'}}>shredded beef stew, onions, peppers, rice & black beans</Text>
                            </View>
                            <View style={styles.toroContainer}>
                                <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}} />
                                <Text style={{fontSize:16}}>170</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.menuItems}>
                            <View style={styles.menuItemImageContainer}>
                                <Image source={{uri: 'https://www.foodfidelity.com/wpcom-128392210/wp-content/uploads/2018/01/mofongo-overhead-500x375.jpg'}} style={styles.menuItemImage} />
                            </View>
                            <View style={styles.menuItemDescription}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>MOFONGO</Text>
                                <Text style={{color: 'white'}}>SHRIMP / PORK OR CHICKEN green plantain mofongo with pork rinds, creole tomato sauce</Text>
                            </View>
                            <View style={styles.toroContainer}>
                                <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}} />
                                <Text style={{fontSize:16}}>190/170</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.menuItems}>
                            <View style={styles.menuItemImageContainer}>
                                <Image source={{uri: 'https://www.eatperu.com/wp-content/uploads/2019/06/lomo-saltado-with-rice-and-cilantro-recipe.jpg'}} style={styles.menuItemImage} />
                            </View>
                            <View style={styles.menuItemDescription}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>LOMO SALTADO</Text>
                                <Text style={{color: 'white'}}>skirt steak strips sautéed with red onions, tomatoes, cilantro served with rice & french fries</Text>
                            </View>
                            <View style={styles.toroContainer}>
                                <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}} />
                                <Text style={{fontSize:16}}>220</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.menuItems}>
                            <View style={styles.menuItemImageContainer}>
                                <Image source={{uri: 'https://www.chefzeecooks.com/wp-content/uploads/2018/08/Chuletas_Guisadas_web.jpg'}} style={styles.menuItemImage} />
                            </View>
                            <View style={styles.menuItemDescription}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>CHULETA GALASEADA</Text>
                                <Text style={{color: 'white'}}>pork chop, chipotle mashed potatoes, passion fruit glaze</Text>
                            </View>
                            <View style={styles.toroContainer}>
                                <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}} />
                                <Text style={{fontSize:16}}>190</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.menuItems}>
                            <View style={styles.menuItemImageContainer}>
                                <Image source={{uri: 'https://themom100.com/wp-content/uploads/2018/02/fall-apart-roasted-pork-shoulder-319.jpg'}} style={styles.menuItemImage} />
                            </View>
                            <View style={styles.menuItemDescription}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>PUERQUITO</Text>
                                <Text style={{color: 'white'}}>slow roasted pork, pigeon peas rice, pickled red onions, garlic mojo</Text>
                            </View>
                            <View style={styles.toroContainer}>
                                <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}} />
                                <Text style={{fontSize:16}}>220</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.menuItems}>
                            <View style={styles.menuItemImageContainer}>
                                <Image source={{uri: 'https://lh3.googleusercontent.com/8G-RQ22j8ULauqvNT4kzNVAsPggfpF-zsIpHnInwu9Pk2sNrgRY8TfFs45UDP0zFqP98Lc-yNyi1giJlGqsQ1sE=w1200-h900-c-rj-v1-e365'}} style={styles.menuItemImage} />
                            </View>
                            <View style={styles.menuItemDescription}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>COMPANERO</Text>
                                <Text style={{color: 'white'}}>sweet plantain, gaucho fries, tostones, yucca fries, mixed vegetables, yucca mash, congris rice, rice & beans</Text>
                            </View>
                            <View style={styles.toroContainer}>
                                <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}} />
                                <Text style={{fontSize:16}}>50</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>ADASO</Text>
                <View style={styles.cardContent}>
                <TouchableOpacity>
                        <View style={styles.menuItems}>
                            <View style={styles.menuItemImageContainer}>
                                <Image source={{uri: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-image.foodandwine.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2F201307-xl-churrasco-with-chimichurri.jpg%3Fitok%3D6Hs3wCpv'}} style={styles.menuItemImage} />
                            </View>
                            <View style={styles.menuItemDescription}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>CHURRASCO</Text>
                                <Text style={{color: 'white'}}>grilled skirt steak, congress rice, pico de gallo, chimichurri sauce</Text>
                            </View>
                            <View style={styles.toroContainer}>
                                <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}} />
                                <Text style={{fontSize:16}}>260</Text>
                            </View>
                        </View>
                </TouchableOpacity>

                <TouchableOpacity>
                        <View style={styles.menuItems}>
                            <View style={styles.menuItemImageContainer}>
                                <Image source={{uri: 'https://i.pinimg.com/originals/42/6d/ec/426dec80328663739c616e38f3f18942.jpg'}} style={styles.menuItemImage} />
                            </View>
                            <View style={styles.menuItemDescription}>
                                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>BISTEC CHINO</Text>
                                <Text style={{color: 'white'}}>soy-brown sugar, marinated flat iron steak, latin style fried rice, asian-honey glaze</Text>
                            </View>
                            <View style={styles.toroContainer}>
                                <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}} />
                                <Text style={{fontSize:16}}>240</Text>
                            </View>
                        </View>
                </TouchableOpacity>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>PAELLA & ARROCES</Text>
                <View style={styles.cardContent} >
                    <TouchableOpacity>
                            <View style={styles.menuItems}>
                                <View style={styles.menuItemImageContainer}>
                                    <Image source={{uri: 'https://www.simplyrecipes.com/wp-content/uploads/2018/07/Seafood-Paella-HORIZONTAL.jpg'}} style={styles.menuItemImage} />
                                </View>
                                <View style={styles.menuItemDescription}>
                                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>PAELLA SANGRIA</Text>
                                    <Text style={{color: 'white'}}>lobster, shrimp, scallops, calamari, mussels, clams</Text>
                                </View>
                                <View style={styles.toroContainer}>
                                    <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}} />
                                    <Text style={{fontSize:16}}>300</Text>
                                </View>
                            </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                            <View style={styles.menuItems}>
                                <View style={styles.menuItemImageContainer}>
                                    <Image source={{uri: 'https://www.averiecooks.com/wp-content/uploads/2016/10/chickenpaella-10-720x720.jpg'}} style={styles.menuItemImage} />
                                </View>
                                <View style={styles.menuItemDescription}>
                                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>ARROZ CON POLLO</Text>
                                    <Text style={{color: 'white'}}>seared chicken, saffron rice, chicken stew, olives, capers</Text>
                                </View>
                                <View style={styles.toroContainer}>
                                    <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}} />
                                    <Text style={{fontSize:16}}>160</Text>
                                </View>
                            </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                            <View style={styles.menuItems}>
                                <View style={styles.menuItemImageContainer}>
                                    <Image source={{uri: 'https://img.hellofresh.com/f_auto,fl_lossy,h_300,q_auto,w_450/hellofresh_s3/image/paella-con-huevos-6dfe3e26.jpg'}} style={styles.menuItemImage} />
                                </View>
                                <View style={styles.menuItemDescription}>
                                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>ARROZ FRITO</Text>
                                    <Text style={{color: 'white'}}>latin style fried rice with shrimp, chicken, pork chicharron topped with fried egg and avocado</Text>
                                </View>
                                <View style={styles.toroContainer}>
                                    <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}} />
                                    <Text style={{fontSize:16}}>240</Text>
                                </View>
                            </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>EMPAREDADO y ENSALADAS</Text>
                <View style={styles.cardContent} >
                    <TouchableOpacity>
                            <View style={styles.menuItems}>
                                <View style={styles.menuItemImageContainer}>
                                    <Image source={{uri: 'https://www.seriouseats.com/recipes/images/2013/05/20130522-253268-sweet-and-spicy-chicken-sandwiches.jpg'}} style={styles.menuItemImage} />
                                </View>
                                <View style={styles.menuItemDescription}>
                                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>POLLO</Text>
                                    <Text style={{color: 'white'}}>chicken breast, mozzarella cheese, caramelized onions, piquillo pepper</Text>
                                </View>
                                <View style={styles.toroContainer}>
                                    <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}} />
                                    <Text style={{fontSize:16}}>120</Text>
                                </View>
                            </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                            <View style={styles.menuItems}>
                                <View style={styles.menuItemImageContainer}>
                                    <Image source={{uri: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/3/3/0/MN0610H_Cubano_s4x3.jpg.rend.hgtvcom.826.620.suffix/1371606019926.jpeg'}} style={styles.menuItemImage} />
                                </View>
                                <View style={styles.menuItemDescription}>
                                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>CUBANO</Text>
                                    <Text style={{color: 'white'}}>roasted pork, black forest ham, swiss cheese, dill pickles, mustard</Text>
                                </View>
                                <View style={styles.toroContainer}>
                                    <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}} />
                                    <Text style={{fontSize:16}}>120</Text>
                                </View>
                            </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                            <View style={styles.menuItems}>
                                <View style={styles.menuItemImageContainer}>
                                    <Image source={{uri: 'https://www.tongmaster.co.uk/image/catalog/burgers/angus%20burger.jpg'}} style={styles.menuItemImage} />
                                </View>
                                <View style={styles.menuItemDescription}>
                                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>SANGRIA HAMBURGESA</Text>
                                    <Text style={{color: 'white'}}>angus burger, fried cheese, crispy potatoes, lettuce, tomatoes and gulf sauce</Text>
                                </View>
                                <View style={styles.toroContainer}>
                                    <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}} />
                                    <Text style={{fontSize:16}}>140</Text>
                                </View>
                            </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                            <View style={styles.menuItems}>
                                <View style={styles.menuItemImageContainer}>
                                    <Image source={{uri: 'https://cdn.loveandlemons.com/wp-content/uploads/2020/05/chopped-salad.jpg'}} style={styles.menuItemImage} />
                                </View>
                                <View style={styles.menuItemDescription}>
                                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>CHOPPED</Text>
                                    <Text style={{color: 'white'}}>iceberg lettuce, tomatoes, onions, corn, olives, sun dried tomatoes, cucumber, citrus tomato vinaigrette</Text>
                                </View>
                                <View style={styles.toroContainer}>
                                    <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}} />
                                    <Text style={{fontSize:16}}>100</Text>
                                </View>
                            </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                            <View style={styles.menuItems}>
                                <View style={styles.menuItemImageContainer}>
                                    <Image source={{uri: 'https://www.jessicagavin.com/wp-content/uploads/2018/03/cobb-salad-7B-1200.jpg'}} style={styles.menuItemImage} />
                                </View>
                                <View style={styles.menuItemDescription}>
                                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>COBB SALAD</Text>
                                    <Text style={{color: 'white'}}>grilled chicken, romaine lettuce, bacon, tomatoes, red onion, maple vinaigrette</Text>
                                </View>
                                <View style={styles.toroContainer}>
                                    <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}} />
                                    <Text style={{fontSize:16}}>100</Text>
                                </View>
                            </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                            <View style={styles.menuItems}>
                                <View style={styles.menuItemImageContainer}>
                                    <Image source={{uri: 'https://www.wellplated.com/wp-content/uploads/2019/04/Spinach-Strawberry-Salad-600x798.jpg'}} style={styles.menuItemImage} />
                                </View>
                                <View style={styles.menuItemDescription}>
                                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>JARDIN</Text>
                                    <Text style={{color: 'white'}}>mixed greens, fresh strawberries, toasted almonds, feta cheese, poppy seeds vinaigrette</Text>
                                </View>
                                <View style={styles.toroContainer}>
                                    <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}} />
                                    <Text style={{fontSize:16}}>80</Text>
                                </View>
                            </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                            <View style={styles.menuItems}>
                                <View style={styles.menuItemImageContainer}>
                                    <Image source={{uri: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/chickpea-mediterranean-salad-horizontal-jpg-1524665573.jpg'}} style={styles.menuItemImage} />
                                </View>
                                <View style={styles.menuItemDescription}>
                                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>MEDITERRANEA</Text>
                                    <Text style={{color: 'white'}}>sun-dried tomato hummus chickpea, olives, cucumber, fresh parsley, grape tomatoes, red onions, lemon vinaigrette</Text>
                                </View>
                                <View style={styles.toroContainer}>
                                    <Image source={require('../assets/toro.png')} style={{height: 35, width: 35}} />
                                    <Text style={{fontSize:16}}>100</Text>
                                </View>
                            </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
        </SafeAreaView>
        </>
    )
}

const screen = Dimensions.get('window')
const styles = StyleSheet.create({
    topContainer: {
        alignItems: 'center',
        marginTop: 1,
        marginBottom: 10
    },
      logo: {
        height: screen.width / 4,
        width: screen.width / 1.7,
    },
    card: {
        flex: 1,
        margin: 5,
        padding: 10
    },
    cardContent: {
        justifyContent: 'center'
    },
    menuItems: {
        flexDirection: 'row',
        borderRadius: 10,
        elevation: 10,
        backgroundColor: 'tomato',
        shadowOffset: {width: 20, height: 25},
        shadowColor: 'black',
        margin: 2,
        padding: 2
    },
    menuItemImage: {
        height: 65,
        width: 65,
        borderRadius: 45
    },
    menuItemImageContainer: {
        justifyContent: 'center',
        margin: 5,
    },
    menuItemDescription: {
        margin: 8,
        width: '58%'
    },
    toroContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
})

export default Order