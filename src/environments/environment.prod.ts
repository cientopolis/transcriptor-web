export const environment = {
  production: true,
  apiUrl: Window['apiUrl'],
  transcribe: {
    classicMode: false,
    layers: true
  },
  semantic_transcription: {
    prefix: 'http://transcriptor.com/',
    keyPefix: 'transcriptor:'
  },
  usePusher: false
};
