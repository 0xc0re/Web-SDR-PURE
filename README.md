# Web-SDR PURE
# Public Utilization of RF Emitters

The whole system consists three parts. Two Projects and one pre-defined hardware piece.
  -Website (This Project) --> User part.
  -Alex2.0 --> This is another project which will prepare the neede IQ-, spectral- and audio-data
     --https://github.com/kusi581/bda
  -SDR-Transciever (We test it with RedPitaya-Hardware)
  
This is the "Website" part:
Here we want 5 main functions besides the basic webpage needs.
  -See spectral data
  -Listen to stream-audio
  -Interact with the SDR-Hardware
  -Multiuser capabilities
    --Moderators have channels where they can set a middle-frequency
    --Listeners can connect to "Moderator-Channels". But they can listen everywhere in the given scope (middlefreq + samplingrate)
  -Queuing moderators (If all channels are used we need a waiting queue)
