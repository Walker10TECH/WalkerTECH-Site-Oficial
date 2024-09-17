import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  Linking,
  Alert, 
} from 'react-native';
// import Carousel, { Pagination } from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [email, setEmail] = useState('');

  const data = [
    {
      text: '“O WalkerTECH Wallet facilita muito a organização dos meus documentos! Agora tenho tudo em um só lugar.”',
      name: 'João Silva',
      job: 'Empresário',
    },
    {
      text: '“Com o AgroWalker, gerenciar minha fazenda ficou muito mais fácil! Recomendo para todos os produtores rurais.”',
      name: 'Maria Oliveira',
      job: 'Agricultora',
    },
    {
      text: '“A WalkerTECH me ajudou a resolver um problema no meu computador que ninguém conseguia! Serviço rápido e eficiente.”',
      name: 'Pedro Almeida',
      job: 'Professor',
    },
  ];

  const renderItem = ({ item }) => (
    <Animated.View style={styles.card}>
      <Icon name="quote-left" size={40} color="#23A6F0" style={styles.quoteIconLeft} />
      <View style={styles.cardContent}>
        <Text style={styles.testimonialText}>{item.text}</Text>
        <View style={styles.stars}>
          {[...Array(5)].map((_, index) => (
            <Icon
              key={index}
              name={index < 4 ? 'star' : 'star-o'}
              size={22}
              color="#B3E3FF"
              style={styles.starIcon}
            />
          ))}
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userJob}>{item.job}</Text>
        </View>
      </View>
      <Icon name="quote-right" size={40} color="#23A6F0" style={styles.quoteIconRight} />
    </Animated.View>
  );

  const handleSendEmail = () => {
    Alert.alert('Email enviado!', `Em breve entraremos em contato.`);
    setEmail('');
  };

  const handleEmailChange = (text) => setEmail(text);

  const handleNavigation = (screenName) => {
    console.log(`Navegando para ${screenName}`);
  };

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [114, 70],
    extrapolate: 'clamp',
  });

  const headerPadding = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [28, 16],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { height: headerHeight, paddingVertical: headerPadding }]}>
        <Image source={require('../assets/icon.png')} style={styles.logo} resizeMode="contain" />
        <View style={styles.navbarCollapse}>
          <View style={styles.navbarNavLeft}>
            {['Início', 'Serviços', 'Aplicativos', 'Depoimentos', 'Contato'].map((item, index) => (
              <TouchableOpacity key={index} style={styles.navItem} onPress={() => handleNavigation(item)}>
                <Text style={styles.navLink}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.navbarNavRight}>
            <TouchableOpacity style={[styles.navItem, styles.primaryButton]} onPress={() => handleNavigation('Orçamento')}>
              <Text style={styles.primaryButtonText}>Orçamento</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        scrollEventThrottle={16}
      >
        <View style={styles.heroSection}>
          <LinearGradient colors={['rgba(179, 227, 255, 0.5)', 'rgba(255, 255, 255, 0)']} style={styles.heroBackground} />
          <View style={styles.heroContent}>
            <Animated.Text
              style={[
                styles.headerTag,
                {
                  transform: [
                    {
                      translateY: scrollY.interpolate({
                        inputRange: [0, 100],
                        outputRange: [0, -50],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                },
              ]}
            >
              WalkerTECH CyberDEV
            </Animated.Text>
            <Animated.Text
              style={[
                styles.headline,
                {
                  transform: [
                    {
                      translateY: scrollY.interpolate({
                        inputRange: [0, 100],
                        outputRange: [0, -30],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                },
              ]}
            >
              Aplicativos minimamente decentes,{' '}
              <Text style={styles.highlight}>para você.</Text>
            </Animated.Text>
            <Animated.Text
              style={[
                styles.subHeadline,
                {
                  opacity: scrollY.interpolate({
                    inputRange: [0, 100],
                    outputRange: [1, 0],
                    extrapolate: 'clamp',
                  }),
                },
              ]}
            >
              WalkerTECH CyberDEV: sua produtora de aplicativos em Cascavel, Paraná.
            </Animated.Text>
            <Animated.View
              style={[
                styles.ctaButtons,
                {
                  opacity: scrollY.interpolate({
                    inputRange: [0, 150],
                    outputRange: [1, 0],
                    extrapolate: 'clamp',
                  }),
                  transform: [
                    {
                      translateY: scrollY.interpolate({
                        inputRange: [0, 150],
                        outputRange: [0, 50],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                },
              ]}
            >
              <TouchableOpacity style={styles.primaryButton} onPress={() => handleNavigation('Aplicativos')}>
                <Text style={styles.primaryButtonText}>Conheça Nossos Aplicativos</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>

        <View style={styles.solutionSection}>
          <View style={styles.sectionContent}>
            <Text style={styles.sectionTag}>Serviços</Text>
            <Text style={styles.sectionTitle}>O que fazemos de melhor</Text>
            <Text style={styles.sectionSubtitle}>
              Oferecemos uma gama completa de serviços de tecnologia para atender às suas necessidades.
            </Text>
          </View>
          <View style={styles.services}>
            {[
              {
                icon: 'mobile-phone',
                title: 'Desenvolvimento de Aplicativos',
                description: 'Aplicativos mobile eficazes e fáceis de usar para Android e iOS.',
              },
              {
                icon: 'wrench',
                title: 'Manutenção de Computadores',
                description: 'Limpeza, formatação, instalação de softwares e resolução de problemas.',
              },
              {
                icon: 'wifi',
                title: 'Redes e Internet',
                description: 'Instalação, configuração e manutenção de redes cabeadas e Wi-Fi.',
              },
            ].map((service, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.serviceCard,
                  {
                    opacity: scrollY.interpolate({
                      inputRange: [400 + index * 100, 500 + index * 100],
                      outputRange: [0, 1],
                      extrapolate: 'clamp',
                    }),
                    transform: [
                      {
                        translateY: scrollY.interpolate({
                          inputRange: [400 + index * 100, 500 + index * 100],
                          outputRange: [50, 0],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Icon name={service.icon} size={64} color="#23A6F0" />
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
              </Animated.View>
            ))}
          </View>
        </View>

        <View style={styles.appsSection}>
          <View style={styles.sectionContent}>
            <Text style={styles.sectionTag}>Aplicativos</Text>
            <Text style={styles.sectionTitle}>Soluções mobile para você</Text>
            <Text style={styles.sectionSubtitle}>
              Conheça nossos aplicativos que facilitam o seu dia a dia e impulsionam os seus negócios.
            </Text>
          </View>
          <View style={styles.apps}>
            {[
              {
                icon: 'id-card-o',
                title: 'WalkerTECH Wallet',
                description: 'Guarde seus documentos digitalizados com segurança e praticidade.',
                link: 'https://play.google.com/',
              },
              {
                icon: 'leaf',
                title: 'AgroWalker',
                description:
                  'Gerencie sua propriedade rural de forma digital e eficiente, com controle de plantio, estoque e finanças.',
                link: 'https://play.google.com/',
              },
            ].map((app, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.serviceCard,
                  {
                    opacity: scrollY.interpolate({
                      inputRange: [750 + index * 100, 850 + index * 100],
                      outputRange: [0, 1],
                      extrapolate: 'clamp',
                    }),
                    transform: [
                      {
                        translateY: scrollY.interpolate({
                          inputRange: [750 + index * 100, 850 + index * 100],
                          outputRange: [50, 0],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Icon name={app.icon} size={64} color="#23A6F0" />
                <Text style={styles.serviceTitle}>{app.title}</Text>
                <Text style={styles.serviceDescription}>{app.description}</Text>
                <TouchableOpacity style={styles.appButton} onPress={() => Linking.openURL(app.link)}>
                  <Text style={styles.appButtonText}>Saiba Mais</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </View>

        <View style={styles.testimonialsSection}>
          <View style={styles.sectionContent}>
            <Text style={styles.sectionTag}>Depoimentos</Text>
            <Text style={styles.sectionTitle}>O que nossos clientes dizem</Text>
            <Text style={styles.sectionSubtitle}>
              Experiências reais de pessoas que utilizam nossos serviços e aplicativos.
            </Text>
          </View>
          <View style={styles.carouselContainer}>
            {/* <Carousel
              ref={ref}
              data={data}
              renderItem={renderItem}
              sliderWidth={width}
              itemWidth={width - 100}
              onSnapToItem={(index) => setActiveIndex(index)}
              loop
              autoplay
              autoplayInterval={5000}
            /> */}
            {/* <Pagination
              dotsLength={data.length}
              activeDotIndex={activeIndex}
              containerStyle={styles.paginationContainer}
              dotStyle={styles.paginationDot}
              inactiveDotStyle={styles.paginationInactiveDot}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            /> */}
          </View>
        </View>

        <View style={styles.contactSection}>
          <View style={styles.sectionContent}>
            <Text style={styles.sectionTag}>Contato</Text>
            <Text style={styles.sectionTitle}>Fale Conosco</Text>
            <Text style={styles.sectionSubtitle}>
              Entre em contato conosco para saber mais sobre nossos serviços e aplicativos!
            </Text>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                placeholder="Seu Email"
                placeholderTextColor="#737373"
                value={email}
                onChangeText={handleEmailChange}
              />
              <TouchableOpacity style={styles.primaryButton} onPress={handleSendEmail}>
                <Text style={styles.primaryButtonText}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <View style={styles.footerTop}>
              <View style={styles.footerColumn}>
                <Text style={styles.footerTitle}>WalkerTECH CyberDEV</Text>
                <View style={styles.socialMediaIcons}>
                  {[
                    { icon: 'facebook', link: 'https://www.facebook.com/' },
                    { icon: 'instagram', link: 'https://www.instagram.com/' },
                    { icon: 'twitter', link: 'https://twitter.com/' },
                  ].map((item, index) => (
                    <TouchableOpacity key={index} style={styles.socialIconContainer} onPress={() => Linking.openURL(item.link)}>
                      <Icon name={item.icon} size={24} color="#23A6F0" style={styles.socialIcon} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.footerColumn}>
                <Text style={styles.footerTitle}>Serviços</Text>
                {['Desenvolvimento de Aplicativos', 'Manutenção de Computadores', 'Redes e Internet'].map(
                  (item, index) => (
                    <Text key={index} style={styles.footerLink}>
                      {item}
                    </Text>
                  )
                )}
              </View>

              <View style={styles.footerColumn}>
                <Text style={styles.footerTitle}>Aplicativos</Text>
                {['WalkerTECH Wallet', 'AgroWalker'].map((item, index) => (
                  <Text key={index} style={styles.footerLink}>
                    {item}
                  </Text>
                ))}
              </View>

              <View style={styles.footerColumn}>
                <Text style={styles.footerTitle}>Contato</Text>
                <Text style={styles.footerLink}>(45) 99999-9999</Text>
                <Text style={styles.footerLink}>contato@walkertech.com.br</Text>
                <Text style={styles.footerLink}>Cascavel, Paraná</Text>
              </View>
            </View>

            <View style={styles.footerBottom}>
              <Text style={styles.copyright}>© WalkerTECH LLC Do Brasil - Todos os Direitos Reservados</Text>
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    width: 141,
    height: 58,
  },
  navbarCollapse: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  navbarNavLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navbarNavRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navItem: {
    marginHorizontal: 16,
  },
  navLink: {
    fontSize: 14,
    fontWeight: '700',
    color: '#444',
  },
  primaryButton: {
    backgroundColor: '#23A6F0',
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  // Hero Section
  scrollView: {
    flex: 1,
  },
  heroSection: {
    width: '100%',
    height: 825,
    position: 'relative',
  },
  heroBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  heroContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  headerTag: {
    color: '#23A6F0',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  headline: {
    fontSize: 64,
    fontWeight: '700',
    textAlign: 'center',
    color: '#252B42',
    marginBottom: 24,
    lineHeight: 80,
  },
  highlight: {
    color: '#23A6F0',
  },
  subHeadline: {
    fontSize: 16,
    color: '#737373',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  ctaButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#23A6F0',
  },
  secondaryButtonText: {
    color: '#23A6F0',
    fontWeight: '700',
  },

  // Sections Styles
  solutionSection: {
    paddingTop: 120,
    paddingHorizontal: 32,
    paddingBottom: 120,
    backgroundColor: '#FFFFFF',
  },
  appsSection: {
    paddingVertical: 120,
    paddingHorizontal: 32,
    backgroundColor: '#F8F8F8',
  },
  testimonialsSection: {
    paddingVertical: 120,
    backgroundColor: '#B3E3FF',
    paddingHorizontal: 32,
  },
  contactSection: {
    alignItems: 'center',
    paddingVertical: 120,
    paddingHorizontal: 32,
    backgroundColor: '#fff',
  },

  // Content Styles (Reusable)
  sectionContent: {
    alignItems: 'center',
    marginBottom: 80,
  },

  services: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 32,
  },
  apps: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 32,
  },
  sectionTag: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    color: '#23A6F0',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 42,
    fontWeight: '700',
    textAlign: 'center',
    color: '#252B42',
    marginBottom: 16,
    lineHeight: 50,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    color: '#737373',
    lineHeight: 20,
    marginBottom: 40,
  },

  // Cards
  serviceCard: {
    width: 328,
    height: 416,
    backgroundColor: '#F8F8F8',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 13,
    elevation: 5,
  },
  serviceTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
  serviceDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: '#737373',
    lineHeight: 24,
  },
  appButton: {
    backgroundColor: '#23A6F0',
    borderRadius: 6,
    paddingHorizontal: 24,
    paddingVertical: 14,
    marginTop: 16,
  },
  appButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  carouselContainer: {
    width: '100%',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 30,
    paddingVertical: 45,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  quoteIconLeft: {
    position: 'absolute',
    top: 20,
    left: 20,
    color: '#23A6F0',
  },
  quoteIconRight: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    transform: [{ rotate: '180deg' }],
    color: '#23A6F0',
  },
  cardContent: {
    alignItems: 'center',
  },
  testimonialText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#737373',
    marginBottom: 15,
    lineHeight: 24,
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  starIcon: {
    marginHorizontal: 2,
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userJob: {
    fontSize: 14,
    color: '#737373',
  },
  paginationContainer: {
    paddingVertical: 15,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#23A6F0',
  },
  paginationInactiveDot: {
    backgroundColor: 'rgba(35, 166, 240, 0.2)',
  },

  // Form Styles
  formContainer: {
    width: '100%',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 688,
    height: 58,
    marginBottom: 30,
  },
  input: {
    flex: 1,
    height: '100%',
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 6,
    paddingHorizontal: 20,
    backgroundColor: '#F8F8F8',
    marginRight: 16,
  },

  // Footer
  footer: {
    backgroundColor: '#FAFAFA',
    paddingVertical: 40,
  },
  footerContent: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  footerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
    flexWrap: 'wrap',
  },
  footerColumn: {
    alignItems: 'flex-start',
    width: '50%',
    marginBottom: 20,
  },
  socialMediaIcons: {
    flexDirection: 'row',
    marginTop: 16,
  },
  socialIconContainer: {
    marginRight: 16,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  footerLink: {
    fontSize: 14,
    color: '#737373',
    marginBottom: 10,
  },
  footerBottom: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#E6E6E6',
    paddingVertical: 25,
  },
  copyright: {
    fontSize: 14,
    textAlign: 'center',
    color: '#737373',
  },
});

export default App;