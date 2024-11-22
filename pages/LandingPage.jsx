import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { firebase } from '../firebaseConfig'; 
import emailjs from '@emailjs/browser';



const { width } = Dimensions.get('window');
const Stack = createStackNavigator();

// Componente Footer
const Footer = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.footer}>
      <View style={styles.footerContent}>
        <View style={styles.footerTop}>
          {/* Coluna 1: Links Principais */}
          <View style={styles.footerColumn}>
            <Text style={styles.footerTitle}>WalkerTECH CyberDEV</Text>
            <Text style={styles.footerLink} onPress={() => navigation.navigate('Inicio')}>
              Início
            </Text>
            <Text style={styles.footerLink} onPress={() => navigation.navigate('Serviços')}>
              Serviços
            </Text>
            <Text style={styles.footerLink} onPress={() => navigation.navigate('Aplicativos')}>
              Aplicativos
            </Text>
            <Text style={styles.footerLink} onPress={() => navigation.navigate('Depoimentos')}>
              Depoimentos
            </Text>
            <Text style={styles.footerLink} onPress={() => navigation.navigate('Contato')}>
              Contato
            </Text>
          </View>

          {/* Coluna 2: Redes Sociais */}
          <View style={styles.footerColumn}>
            <Text style={styles.footerTitle}>Redes Sociais</Text>
            <View style={styles.socialMediaIcons}>
              <TouchableOpacity
                style={styles.socialIconContainer}
                onPress={() => Linking.openURL('https://www.facebook.com/')}
              >
                <Icon name="facebook-f" size={24} color="#D9534F" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialIconContainer}
                onPress={() => Linking.openURL('https://www.instagram.com/')}
              >
                <Icon name="instagram" size={24} color="#D9534F" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialIconContainer}
                onPress={() => Linking.openURL('https://www.linkedin.com/')}
              >
                <Icon name="linkedin-in" size={24} color="#D9534F" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Coluna 3: Contato */}
          <View style={styles.footerColumn}>
            <Text style={styles.footerTitle}>Contato</Text>
            <Text
              style={styles.footerLink}
              onPress={() => Linking.openURL('mailto:contato@walkertech.com.br')}
            >
              contato@walkertech.com.br
            </Text>
            <Text style={styles.footerLink} onPress={() => Linking.openURL('tel:+5545999999999')}>
              (45) 99999-9999
            </Text>
          </View>
        </View>

        <View style={styles.footerBottom}>
          <Text style={styles.copyright}>
            © 2023 WalkerTECH CyberDEV. Todos os direitos reservados.
          </Text>
        </View>
      </View>
    </View>
  );
};

// Componente Form
const Form = ({ onSubmit }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [servico, setServico] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = () => {
    if (email && nome) { // Verifica se o nome e o email estão preenchidos
      onSubmit({ nome, email, telefone, servico, descricao });
    } else {
      Alert.alert('Erro!', 'Por favor, preencha todos os campos obrigatórios.');
    }
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          placeholderTextColor="#737373"
          value={nome}
          onChangeText={setNome}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#737373"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          placeholderTextColor="#737373"
          value={telefone}
          onChangeText={setTelefone}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="Serviço Desejado"
          placeholderTextColor="#737373"
          value={servico}
          onChangeText={setServico}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="Descrição do Projeto"
          placeholderTextColor="#737373"
          multiline
          value={descricao}
          onChangeText={setDescricao}
        />
      </View>
      <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
        <Text style={styles.primaryButtonText}>Solicitar Orçamento</Text>
      </TouchableOpacity>
    </View>
  );
};

// Componente HeaderAnimado (para reutilização)
const HeaderAnimado = ({ scrollY }) => {
  const navigation = useNavigation();
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
    <Animated.View
      style={[styles.header, { height: headerHeight, paddingVertical: headerPadding }]}
    >
      <Image source={require('../assets/icon.png')} style={styles.logo} resizeMode="contain" />
      <View style={styles.navbarCollapse}>
        <View style={styles.navbarNavLeft}>
          {['Início', 'Serviços', 'Aplicativos', 'Depoimentos', 'Contato'].map(
            (item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.navItem}
                onPress={() => navigation.navigate(item)}
              >
                <Text style={styles.navLink}>{item}</Text>
              </TouchableOpacity>
            )
          )}
        </View>
        <View style={styles.navbarNavRight}>
          <TouchableOpacity
            style={[styles.navItem, styles.primaryButton]}
            onPress={() => navigation.navigate('Orçamento')}
          >
            <Text style={styles.primaryButtonText}>Orçamento</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

// Componente ScrollAnimado (para reutilização)
const ScrollAnimado = ({ children, scrollY }) => {
  return (
    <Animated.ScrollView
      style={styles.scrollView}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
        useNativeDriver: true,
      })}
      scrollEventThrottle={16}
    >
      {children}
    </Animated.ScrollView>
  );
};

// Componente InicioScreen
const InicioScreen = () => {
  const scrollY = useRef(new Animated.Value( 0)).current;

  return (
    <View style={styles.container}>
      <HeaderAnimado scrollY={scrollY} />

      <ScrollAnimado scrollY={scrollY}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <LinearGradient
            colors={['rgba(217, 83, 79, 0.5)', 'rgba(255, 255, 255, 0)']}
            style={styles.heroBackground}
          />
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
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => navigation.navigate('Aplicativos')}
              >
                <Text style={styles.primaryButtonText}>Conheça Nossos Aplicativos</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </ScrollAnimado>
      <Footer />
    </View>
  );
};

// Componente ServicosScreen
const ServicosScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <HeaderAnimado scrollY={scrollY} />

      <ScrollAnimado scrollY={scrollY}>
        {/* Solution Section */}
        <View style={styles.solutionSection}>
          <View style={styles.sectionContent}>
            <Text style={styles.sectionTag}>Serviços</Text>
            <Text style={styles.sectionTitle}>O que fazemos de melhor</Text>
            <Text style={styles.sectionSubtitle}>
              Oferecemos uma gama completa de serviços de tecnologia para atender às suas
              necessidades.
            </Text>
          </View>
          <View style={styles.services}>
            {[
              {
                icon: 'mobile-phone',
                title: 'Desenvolvimento de Aplicativos',
                description:
                  'Crie aplicativos inovadores para Web e Mobile. A WalkerTECH desenvolve soluções personalizadas, desde a concepção até a implementação, com foco em interfaces intuitivas, funcionalidades robustas e integrações inteligentes, aproveitando ao máximo as tecnologias mais recentes.',
              },
              {
                icon: 'wrench',
                title: 'Manutenção de Computadores e Celulares',
                description:
                  'Manutenção preventiva e corretiva de PCs, notebooks e smartphones. Conte com nossos especialistas para manter seus equipamentos funcionando perfeitamente, otimizando o desempenho, garantindo segurança e resolvendo qualquer problema que surgir. Desde formatação até a troca de peças, oferecemos soluções completas para seus dispositivos.',
              },
              {
                icon: 'wifi',
                title: 'Redes e Internet',
                description:
                  'Instalação, configuração e manutenção de redes cabeadas e Wi-Fi. Desfrute de uma conexão rápida, confiável e segura com soluções personalizadas para sua casa ou empresa, garantindo o melhor desempenho para suas atividades online.  Oferecemos serviços de instalação, configuração e manutenção de redes cabeadas, Wi-Fi e fibra óptica, além de soluções de segurança e gerenciamento de rede.',
              },
            ].map((service, index) => (
              <Animated.View
                key ={index}
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
                <Icon name={service.icon} size={64} color="#D9534F" />
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
              </Animated.View>
            ))}
          </View>
        </View>
      </ScrollAnimado>
      <Footer />
    </View>
  );
};

// Componente AplicativosScreen
const AplicativosScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <HeaderAnimado scrollY={scrollY} />

      <ScrollAnimado scrollY={scrollY}>
        {/* Apps Section */}
        <View style={styles.appsSection}>
          <View style={styles.sectionContent}>
            <Text style={styles.sectionTag}>Aplicativos</Text>
            <Text style={styles.sectionTitle}>Soluções mobile para você</Text>
            <Text style={styles.sectionSubtitle}>
              Conheça nossos aplicativos que facilitam o seu dia a dia e impulsionam os seus
              negócios.
            </Text>
          </View>
          <View style={styles.apps}>
            {[
              {
                icon: 'leaf',
                title: 'AgroWalker',
                description:
                  'Gerencie sua propriedade rural de forma digital e eficiente, com controle de plantio, estoque e finanças. Aumente a produtividade, otimize seus recursos e tome decisões estratégicas com dados precisos e ferramentas intuitivas. Tenha uma gestão completa e controle total sobre sua fazenda.',
                link: 'https://agrowalker-8073f.web.app',
              },
              {
                icon: 'id-card-o',
                title: 'WalkerTECH Wallet',
                description:
                  'Guarde seus documentos digitalizados com segurança e praticidade. Organize seus documentos importantes de forma fácil e segura, acessando-os a qualquer hora e lugar. Simplifique sua vida e tenha tudo o que precisa ao alcance de seus dedos.',
                link: 'Em breve',
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
                <Icon name={app.icon} size={64} color="#D9534F" />
                <Text style={styles.serviceTitle}>{app.title}</Text>
                <Text style={styles.serviceDescription}>{app.description}</Text>
                <TouchableOpacity style={styles.appButton} onPress={() => Linking.openURL(app.link)}>
                  <Text style={styles.appButtonText}>Saiba Mais</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </View>
      </ScrollAnimado>
      <Footer />
    </View>
  );
};

// Componente DepoimentosScreen
const DepoimentosScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

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
    {
      text: '“O serviço de manutenção de celular da WalkerTECH foi impecável! Meu telefone voltou a funcionar como novo.”',
      name: 'Ana Santos',
      job: 'Designer',
    },
    {
      text: '“A WalkerTECH instalou um sistema de Wi-Fi na minha casa e a conexão ficou muito mais rápida e estável!”',
      name: 'Carlos Ferreira',
      job: 'Engenheiro',
    },
  ];

  // Renderizando depoimentos como cards
  const renderDepoimentos = () => {
    return data.map((item, index) => (
      <View key={index} style={styles.testimonialCard}>
        <Icon name="quote-left" size={40} color="#D9534F" style={styles.quoteIconLeft} />
        <View style={styles.testimonialCardContent}>
          <Text style={styles.testimonialText}>{item.text}</Text>
          <View style={styles.stars}>
            {[...Array(5)].map((_, index) => (
              <Icon key={index} name="star" size={22} color="#D9534F" style={styles.starIcon} />
            ))}
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userJob}>{item.job}</Text>
          </View>
        </View>
        <Icon name="quote-right" size={40} color="#D9534F" style={styles.quoteIconRight} />
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <HeaderAnimado scrollY={scrollY} />

      <ScrollAnimado scrollY={scrollY}>
        {/* Testimonials Section */}
        <View style={styles.testimonialsSection}>
          <View style={styles.sectionContent}>
            <Text style={styles.sectionTag}>Depoimentos</Text>
            <Text style={styles.sectionTitle}>O que nossos clientes dizem</Text>
            <Text style={styles.sectionSubtitle}>
              Experiências reais de pessoas que utilizam nossos serviços e aplicativos.
            </Text>
          </View>
          <View style={styles.depoimentosContainer}>{renderDepoimentos()}</View>
        </View>
      </ScrollAnimado>
      <Footer />
    </View>
  );
};


export const ContatoScreen = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = () => {
    // Verifica se todos os campos estão preenchidos
    if (nome && email && telefone && assunto && mensagem) {
      const templateParams = {
        nome,
        email,
        telefone,
        assunto,
        mensagem,
      };

      // Envia os dados do formulário para o backend via EmailJS
      emailjs
        .send('service_qhb191t', 'template_hdv1a3e', templateParams, 'fjy4qzR9lH8kAaraw')
        .then(
          (response) => {
            console.log('Formulário enviado com sucesso:', response);
            Alert.alert('Sucesso!', 'Mensagem enviada com sucesso!');
            
            // Envia a resposta automática para o usuário
            const autoResponseParams = {
              nome,
              email, // O e-mail do usuário para responder
            };

            emailjs
              .send('service_qhb191t', 'template_hdv1a3e', autoResponseParams, 'fjy4qzR9lH8kAaraw')
              .then(
                (autoResponse) => {
                  console.log('Resposta automática enviada com sucesso:', autoResponse);
                },
                (error) => {
                  console.log('Erro ao enviar resposta automática:', error.text);
                }
              );
            
            // Limpa os campos do formulário após o envio
            setNome('');
            setEmail('');
            setTelefone('');
            setAssunto('');
            setMensagem('');
          },
          (error) => {
            console.log('Erro ao enviar formulário:', error.text);
            Alert.alert('Erro!', 'Ocorreu um erro ao enviar sua mensagem.');
          }
        );
    } else {
      Alert.alert('Erro!', 'Por favor, preencha todos os campos obrigatórios.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Entre em Contato</Text>
      <Text style={styles.sectionSubtitle}>
        Tem alguma dúvida? Quer saber mais sobre nossos serviços? Entre em contato conosco!
      </Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#737373"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#737373"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          placeholderTextColor="#737373"
          value={telefone}
          onChangeText={setTelefone}
        />
        <TextInput
          style={styles.input}
          placeholder="Assunto"
          placeholderTextColor="#737373"
          value={assunto}
          onChangeText={setAssunto}
        />
        <TextInput
          style={styles.input}
          placeholder="Mensagem"
          placeholderTextColor="#737373"
          multiline
          value={mensagem}
          onChangeText={setMensagem}
        />
        <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
          <Text style={styles.primaryButtonText}>Enviar Mensagem</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


// Componente OrcamentoScreen
const OrcamentoScreen = () => {
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleSubmit = (data) => {
    firebase
      .firestore()
      .collection('orcamentos')
      .add(data)
      .then(() => {
        Alert.alert('Sucesso!', 'Solicitação de orçamento enviada com sucesso!');
        navigation.navigate('Inicio');
      })
      .catch((error) => {
        Alert.alert('Erro!', 'Ocorreu um erro ao enviar sua solicitação.');
        console.error('Error adding document: ', error);
      });
  };

  return (
    <View style={styles.container}>
      <HeaderAnimado scrollY={scrollY} />

      <ScrollAnimado scrollY={scrollY}>
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Solicitar Orçamento</Text>
          <Text style={styles.sectionSubtitle}>
            Preencha o formulário abaixo para solicitar um orçamento personalizado para seu
            projeto.
          </Text>
          <Form onSubmit={handleSubmit} />
        </View>
      </ScrollAnimado>
      <Footer />
    </View>
  );
};

// Componente App (StackNavigator)
const App = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Inicio" component={InicioScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Serviços" component={ServicosScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Aplicativos"
        component={AplicativosScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Depoimentos"
        component={DepoimentosScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Contato" component={ContatoScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Orçamento"
        component={OrcamentoScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// Estilos
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
    backgroundColor: '#D9534F',
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
    color: '#D9534F',
    fontsize: 16,
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
    color: '#D9534F',
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
    borderColor: '#D9534F',
  },
  secondaryButtonText: {
    color: '#D9534F',
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
    backgroundColor: '#F0AD4E',
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
    color: '#D9534F',
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
    backgroundColor: '#D9534F',
    borderRadius: 6,
    paddingHorizontal: 24,
    paddingVertical: 14,
    marginTop: 16,
  },
  appButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  depoimentosContainer: {
    alignItems: 'center',
  },
  testimonialCard: {
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
    marginBottom: 20,
  },
  testimonialCardContent: {
    alignItems: 'center',
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

  // Estilos para os ícones de aspas
  quoteIconLeft: {
    position: 'absolute',
    top: 20,
    left: 20,
    color: '#D9534F',
  },
  quoteIconRight: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    transform: [{ rotate: '180deg' }],
    color: '#D9534F',
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
});

export default App;