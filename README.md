# Web-SDR PURE
# Public Utilization of RF Emitters

The whole system consists three parts. Two Projects and one pre-defined hardware piece.
<br>-Website (This Project) --> User part.
<br>-Alex2.0 --> This is another project which will prepare the neede IQ-, spectral- and audio-data
<br>&nbsp;&nbsp;--https://github.com/kusi581/bda
<br>-SDR-Transciever (We test it with RedPitaya-Hardware)
  
This is the "Website" part:
Here we want 5 main functions besides the basic webpage needs.
<br>-See spectral data
<br>-Listen to stream-audio
<br>-Interact with the SDR-Hardware
<br>-Multiuser capabilities
<br>&nbsp;&nbsp;--Moderators have channels where they can set a middle-frequency
<br>&nbsp;&nbsp;--Listeners can connect to "Moderator-Channels". But they can listen everywhere in the given scope (middlefreq + samplingrate)
<br>-Queuing moderators (If all channels are used we need a waiting queue)
