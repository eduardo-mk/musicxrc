
export default {
   itunes: {
      musicArtist: (name:string)=> `https://itunes.apple.com/search?term=${name}&entity=musicArtist&limit=20`,
      musicTrack: (artist:string)=> `https://itunes.apple.com/search?term=${name}&entity=musicTrack&limit=20`
   }
}