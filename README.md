# Radio Player - Internet radio player with search

## Technology & Features

- Single Page Application created with the .Net Core React [project template](https://docs.microsoft.com/en-us/aspnet/core/client-side/spa/react)
- UI: React, Node JS, CSS
- REST API service: [.Net Core 3.1](https://dotnet.microsoft.com/download/dotnet-core/3.1)
- [Community Radio Browser API](https://www.radio-browser.info/) for station searching
- [NLog package](https://www.nuget.org/packages/NLog) for logging in the API
- [Hls.js package](https://github.com/video-dev/hls.js/) for playing HLS streams
- [React Icons package](https://react-icons.github.io/react-icons/) for application icons
- The playlist is stored in browser storage. No account is required.
- Stations can be added to the playlist by searching for station name, country, state, language, tags, codec, and bitrate
- A playlist can be imported into the application from a .PLS playlist file
- An existing playlist can be exported to a .PLS playlist file

## Running the application

- Local machine
  1. Verify .Net Core 3.1 is installed on the machine
  2. Clone/download the application code
  3. In the folder containing the code, run the command '*dotnet run*'
  4. In a web browser, navigate to 'http://localhost:5000' or 'https://localhost:5001'
- Server
  - Testing for this application was done on a Raspberry Pi 4 server running Apache2.
  - The code was deployed as self-contained to the server using the command '*dotnet publish -r linux-arm*'

## Known Issues

- Not all stations returned by the search will play in the browser. This could be for a variety of reasons, but sometimes it is due to the Radio Browser database not having a valid URL for the stream. For stream URLs that are valid but not playing, they may need to be debugged individually.

## Future Enhancements

- Move all search and search results to a popup window that can be shown/hidden as desired
- Volume control
- Show video for streams that contain video
- Allow the option to create/import/show multiple playlists for better categorization of larger numbers of streams
- Import/Export popup windows with options
- Export playlists to one file or separate files
- Drag & Drop functionality for station ordering or moving station to different playlist
