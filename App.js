import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image, Platform, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';

export default function App() {
  // =================================================================
  // --- ESTADOS (STATES) ---
  // Usamos o 'useState' para criar variáveis que, quando alteradas,
  // fazem o React redesenhar a tela automaticamente.
  // =================================================================

  // Estados para permissões
  const [temPermissaoCamera, setTemPermissaoCamera] = useState(null);
  const [temPermissaoAudio, setTemPermissaoAudio] = useState(null);

  // Estados para a câmera
  const cameraRef = useRef(null); // 'useRef' cria uma referência para acessar o componente da Câmera diretamente.
  const [uriDaImagem, setUriDaImagem] = useState(null); // Armazena o caminho (URI) da foto tirada.
  const [cameraPronta, setCameraPronta] = useState(false); // Verifica se a câmera está pronta para uso.

  // Estados para o áudio
  const [gravacao, setGravacao] = useState(null); // Armazena o objeto da gravação em andamento.
  const [som, setSom] = useState(null); // Armazena o objeto do som para reprodução.
  const [uriDaGravacao, setUriDaGravacao] = useState(null); // Armazena o caminho (URI) do áudio gravado.

  // =================================================================
  // --- EFEITOS (EFFECTS) ---
  // O 'useEffect' executa código em momentos específicos do ciclo de
  // vida do componente, como na primeira vez que ele aparece na tela.
  // =================================================================

  // Efeito para solicitar permissões ao iniciar o app.
  // O array vazio `[]` no final significa que este código só roda uma vez.
  useEffect(() => {
    (async () => {
      // Solicita permissão para usar a câmera.
      const statusCamera = await Camera.requestCameraPermissionsAsync();
      setTemPermissaoCamera(statusCamera.status === 'granted');

      // Solicita permissão para usar o microfone.
      const statusAudio = await Audio.requestPermissionsAsync();
      setTemPermissaoAudio(statusAudio.status === 'granted');
    })();
  }, []);
  
  // Efeito para limpar o objeto de som da memória quando ele não for mais usado.
  // Isso evita vazamentos de memória.
  useEffect(() => {
    return som
      ? () => {
          console.log('Descarregando o som da memória...');
          som.unloadAsync();
        }
      : undefined;
  }, [som]);


  // =================================================================
  // --- FUNÇÕES DE ÁUDIO ---
  // =================================================================

  async function iniciarGravacao() {
    try {
      if (!temPermissaoAudio) {
        Alert.alert("Erro", "Permissão de áudio não concedida.");
        return;
      }
      // Define o modo de áudio, necessário para gravação no iOS.
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true, // Permite tocar som mesmo no modo silencioso
      });

      console.log('Iniciando gravação de áudio...');
      const { recording } = await Audio.Recording.createAsync(
         Audio.RecordingOptionsPresets.HIGH_QUALITY // Define a qualidade da gravação
      );
      setGravacao(recording); // Armazena o objeto da gravação no estado.
      console.log('Gravação iniciada.');

    } catch (err) {
      console.error('Falha ao iniciar a gravação', err);
    }
  }

  async function pararGravacao() {
    if (!gravacao) return; // Se não houver gravação, não faz nada.
    
    console.log('Parando gravação...');
    setGravacao(undefined); // Limpa o estado da gravação.
    await gravacao.stopAndUnloadAsync(); // Para e libera o gravador da memória.
    const uri = gravacao.getURI(); // Pega o caminho do arquivo gravado.
    setUriDaGravacao(uri); // Salva o caminho no estado para poder reproduzir depois.
    console.log('Gravação parada e salva em:', uri);
  }

  async function reproduzirSom() {
    if (!uriDaGravacao) {
      Alert.alert('Aviso', 'Nenhum áudio foi gravado ainda.');
      return;
    }

    console.log('Carregando e reproduzindo o som...');
    const { sound } = await Audio.Sound.createAsync({ uri: uriDaGravacao });
    setSom(sound); // Salva o objeto de som no estado.
    await sound.playAsync(); // Toca o som.
  }

  // =================================================================
  // --- FUNÇÕES DA CÂMERA ---
  // =================================================================

  async function tirarFoto() {
    // Verifica se a referência da câmera existe e se ela está pronta.
    if (cameraRef.current && cameraPronta) {
      try {
        const foto = await cameraRef.current.takePictureAsync();
        setUriDaImagem(foto.uri); // Salva o caminho da foto no estado.
        console.log('Foto tirada com sucesso:', foto.uri);
      } catch (error) {
        console.error('Erro ao tirar a foto:', error);
        Alert.alert('Erro', 'Não foi possível tirar a foto.');
      }
    } else {
        Alert.alert('Aviso', 'A câmera não está pronta.');
    }
  }
  
  // Função para limpar a imagem e mostrar a câmera novamente.
  function resetarFoto() {
      setUriDaImagem(null);
  }

  // =================================================================
  // --- RENDERIZAÇÃO (O QUE APARECE NA TELA) ---
  // =================================================================

  // Se as permissões ainda não foram verificadas, mostra uma tela de carregamento.
  if (temPermissaoCamera === null || temPermissaoAudio === null) {
    return <View style={styles.centralizado}><Text>Solicitando permissões...</Text></View>;
  }
  // Se a permissão da câmera foi negada, mostra uma mensagem de erro.
  if (temPermissaoCamera === false) {
    return <View style={styles.centralizado}><Text>Acesso à câmera negado. Por favor, habilite nas configurações do seu celular.</Text></View>;
  }
  // Se a permissão do áudio foi negada, mostra uma mensagem de erro.
   if (temPermissaoAudio === false) {
    return <View style={styles.centralizado}><Text>Acesso ao microfone negado. Por favor, habilite nas configurações do seu celular.</Text></View>;
  }

  // Se todas as permissões foram concedidas, mostra a interface principal.
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📝 Meu Diário Multimídia 📸</Text>
      
      {/* Seção da Câmera */}
      <View style={styles.secao}>
        <Text style={styles.tituloSecao}>Fotografia</Text>
        {/* Renderização Condicional: Se 'uriDaImagem' existir, mostra a imagem. Senão, mostra a câmera. */}
        {uriDaImagem ? (
          <View style={styles.containerMidia}>
            <Image source={{ uri: uriDaImagem }} style={styles.previaImagem} />
            <Button title="Tirar Outra Foto" onPress={resetarFoto} color="#1E90FF"/>
          </View>
        ) : (
          <View style={styles.containerMidia}>
            <Camera 
              ref={cameraRef} 
              style={styles.camera} 
              type={Camera.Constants.Type.back} // Usa a câmera traseira.
              onCameraReady={() => setCameraPronta(true)} // Avisa quando a câmera estiver pronta.
            />
            <View style={styles.espacoBotao} />
            <Button title="Tirar Foto" onPress={tirarFoto} disabled={!cameraPronta} />
          </View>
        )}
      </View>
      
      {/* Seção do Áudio */}
      <View style={styles.secao}>
        <Text style={styles.tituloSecao}>Nota de Voz</Text>
        <Button
          title={gravacao ? 'Parando Gravação...' : 'Gravar Áudio'}
          onPress={gravacao ? pararGravacao : iniciarGravacao}
          color={gravacao ? '#FF4500' : '#32CD32'} // Muda a cor do botão se estiver gravando.
        />
        <View style={styles.espacoBotao} />
        <Button 
            title="Reproduzir Gravação" 
            onPress={reproduzirSom} 
            disabled={!uriDaGravacao || !!gravacao} // Desabilita o botão se não houver gravação ou se estiver gravando.
        />
        {/* Mostra um texto de status quando o áudio está pronto. */}
        {uriDaGravacao && !gravacao && <Text style={styles.textoStatus}>Áudio pronto para tocar!</Text>}
      </View>
    </View>
  );
}

// =================================================================
// --- ESTILOS (STYLES) ---
// Define a aparência dos componentes.
// =================================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  centralizado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  secao: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tituloSecao: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 15,
    color: '#444',
  },
  containerMidia: {
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  previaImagem: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 15,
  },
  espacoBotao: {
      height: 10,
  },
  textoStatus: {
    marginTop: 10,
    color: 'green',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
