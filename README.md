# 🔒 Anonimitzar Imatges | Anonymize Images | Anonimizar Imágenes

Una eina responsiva i de codi obert per anonimitzar imatges pixelant múltiples àrees. Processa totes les imatges localment al teu navegador - cap dada s'envia a cap servidor.

A responsive, open-source tool to anonymize images by pixelating multiple areas. All image processing happens locally in your browser - no data is sent to any server.

Una herramienta responsiva y de código abierto para anonimizar imágenes pixelando múltiples áreas. Todo el procesamiento de imágenes ocurre localmente en tu navegador - ningún dato se envía a ningún servidor.

## ✨ Característiques | Features | Características

- 🖼️ **Carga d'imatges** | Image Upload | Carga de imágenes
- 🎨 **Dibuixa requadres** | Draw boxes | Dibuja cuadros
- ⚙️ **Control de mida de píxel** | Pixel size control | Control de tamaño de píxel
- 📊 **Múltiples àrees** | Multiple areas | Múltiples áreas
- 💾 **Descàrrega PNG** | Download PNG | Descargar PNG
- 📋 **Copiar al portapaperes** | Copy to clipboard | Copiar al portapapeles
- 🔄 **Desfer/Rehacer** | Undo/Redo | Deshacer/Rehacer
- 🎭 **Multilingüe** | Multilingual | Multilingüe (Català, Español, English)
- 📱 **Responsiu** | Responsive | Responsivo
- 🔒 **Privacitat local** | Local privacy | Privacidad local

## 🚀 Inici ràpid | Quick Start | Inicio Rápido

### Requisits | Requirements | Requisitos
- Node.js 16+ 
- npm o yarn

### Instal·lació | Installation | Instalación

```bash
git clone https://github.com/tomeu-cd100/anonimitzar-imatges.git
cd anonimitzar-imatges
npm install
```

### Desenvolupament | Development | Desarrollo

```bash
npm run dev
```

Obri [http://localhost:5173](http://localhost:5173) al teu navegador.

Open [http://localhost:5173](http://localhost:5173) in your browser.

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### Build per producció | Build for Production | Compilar para Producción

```bash
npm run build
```

Els fitxers compilats es troben a la carpeta `dist/`.

Compiled files are in the `dist/` folder.

Los archivos compilados están en la carpeta `dist/`.

## 📖 Com usar | How to Use | Cómo Usar

1. **Puja una imatge** | Upload an image | Sube una imagen
   - Fes clic o arrossega una imatge a l'àrea de pujada
   - Click or drag an image to the upload area
   - Haz clic o arrastra una imagen al área de carga

2. **Dibuixa requadres** | Draw boxes | Dibuja cuadros
   - Fes clic i arrossega per crear un requadre al voltant de l'àrea que vols pixelar
   - Click and drag to create a box around the area you want to pixelate
   - Haz clic y arrastra para crear un cuadro alrededor del área que deseas pixelar

3. **Ajusta el píxel** | Adjust pixel size | Ajusta el tamaño de píxel
   - Utilitza el lliscador per controlar la mida del píxel
   - Use the slider to control pixel size
   - Usa el deslizador para controlar el tamaño del píxel

4. **Crea el pixelatge** | Pixelate | Pixela
   - Fes clic al botó "Pixelar" per aplicar l'efecte
   - Click the "Pixelate" button to apply the effect
   - Haz clic en el botón "Pixelar" para aplicar el efecto

5. **Descarrega o copia** | Download or Copy | Descarga o Copia
   - Descarrega com a PNG o copia al portapapeles
   - Download as PNG or copy to clipboard
   - Descarga como PNG o copia al portapapeles

## 🛠️ Tecnologies | Technologies | Tecnologías

- **React 18** - Component framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Canvas API** - Image manipulation
- **Clipboard API** - Copy to clipboard

## 📁 Estructura del projecte | Project Structure | Estructura del Proyecto

```
anonimitzar-imatges/
├── src/
│   ├── components/
│   │   ├── Canvas.jsx
│   │   ├── Controls.jsx
│   │   ├── Instructions.jsx
│   │   └── UploadArea.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── translations.js
│   └── utils.js
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── .gitignore
```

## 🌍 Deploy a GitHub Pages

```bash
# Configurar el repositori
git remote add origin https://github.com/tomeu-cd100/anonimitzar-imatges.git

# Instal·lar gh-pages
npm install --save-dev gh-pages

# Fer build i deploy
npm run build
npm run deploy

# O simplement
npm run deploy
```

L'aplicació estarà disponible a: `https://tomeu-cd100.github.io/anonimitzar-imatges/`

## 🔒 Privacitat | Privacy | Privacidad

Aquesta aplicació processa **totes les imatges localment** al teu navegador. No hi ha cap servidor backend, no es carreguen dades a internet, i totes les imatges es mantenen privades.

This application processes **all images locally** in your browser. There is no backend server, no data is uploaded to the internet, and all images remain private.

Esta aplicación procesa **todas las imágenes localmente** en tu navegador. No hay servidor backend, ningún dato se carga a internet, y todas las imágenes permanecen privadas.

## 📝 Llicència | License | Licencia

MIT License - Consulta el fitxer LICENSE per a més detalls.

MIT License - See LICENSE file for details.

Licencia MIT - Consulta el archivo LICENSE para más detalles.

## 👨‍💻 Autor | Author | Autor

Tomeu Castells | [@tomeu-cd100](https://github.com/tomeu-cd100)

Institut Consell de Cent - Barcelona

## 🤝 Contribucions | Contributions | Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request.

Contributions are welcome. Please open an issue or submit a pull request.

Les contribucions són benvingudes. Si us plau, obri un issue o enviï un pull request.

## 📧 Contacte | Contact | Contacto

Para preguntas o sugerencias, contacta a través del repositorio de GitHub.

For questions or suggestions, contact via GitHub repository.

Per a preguntes o suggerències, contacta mitjançant el repositori de GitHub.
