// import random

// # import os
// # from music21 import converter

// # folder_path = './'  # Replace with the actual folder path

// # def get_num_of_bars(file_path):
// #     # Add code to retrieve the number of bars from the MusicXML file
// #     # For example, you can use a library like music21 to parse the MusicXML file and extract the number of bars
// #     # Here's an example using music21:

// #     try:
// #         score = converter.parse(file_path)
// #         numOfBars = len(score.parts[0].getElementsByClass('Measure'))
// #         return numOfBars
// #     except Exception as e:
// #         print(f"Error: {e}")
// #         return 0
// # for filename in os.listdir(folder_path):
// #     if filename.endswith('.musicxml'):
// #         file_path = os.path.join(folder_path, filename)
// #         # Add code to retrieve the number of bars from the MusicXML file
// #         numOfBars = get_num_of_bars(file_path)
// #         print(f"{filename}|0|{numOfBars}")


// f = """If Only.gp.musicxml|0|60
// Away.gp.musicxml|0|41
// Home.gp.musicxml|0|49
// Flowers.gp.musicxml|0|83
// Have a Nice Dream.gp.musicxml|0|73
// Drowsy.gp.musicxml|0|46
// It_s Over.gp.musicxml|0|37
// Awakening.gp.musicxml|0|79
// Blood Moon.gp.musicxml|0|24
// Ice.gp.musicxml|0|49
// Inversion.gp.musicxml|0|12
// Shadow Walk.gp.musicxml|0|106
// Bad.gp.musicxml|0|160
// Insomnia.gp.musicxml|0|37
// Circle.gp.musicxml|0|112
// 6. The Worst.gpx.musicxml|0|114
// Drown feat. Mateus Asato.gp.musicxml|0|184
// Homesick.gp.musicxml|0|49
// Lonely Again.gp.musicxml|0|37
// Branching Paths.gp.musicxml|0|91
// Tim Henson Vs Ichika Nito.gp.musicxml|0|25
// 4. 40oz.gpx.musicxml|0|128
// Moonfall.gp.musicxml|0|161
// 5. Crosty.gpx.musicxml|0|88
// Instagram Album Mode.gpx.musicxml|0|8
// Nothing Is Lost.gp.musicxml|0|33
// Saucy.gp.musicxml|0|72
// 3. Goose.gpx.musicxml|0|200
// 04 Hos Down.gpx.musicxml|0|214
// Thinking of you.gp.musicxml|0|45
// Feeling.gp.musicxml|0|85
// Nasty feat. Jason Richardson.gp.musicxml|0|137
// Death Note feat. Ichika.gp.musicxml|0|112
// Yas feat. Mario Camarena and Erick Hansel.gp.musicxml|0|120
// Lost.gp.musicxml|0|59
// Illusory Sense String 8.gp.musicxml|0|50
// CLOWN.gpx.musicxml|0|32
// Picturesque.gp.musicxml|0|97
// Farewell.gp.musicxml|0|56
// 2. Icronic.gpx.musicxml|0|146
// Rich Kids feat. Yvette Young.gp.musicxml|0|144
// Resolution.gp.musicxml|0|74
// The World is Still Beautiful.gp.musicxml|0|66
// A bell is not a bell.gp.musicxml|0|133
// He Waits Patiently.gp.musicxml|0|114
// Euphoria.gp.musicxml|0|69
// Im Not Ready To Say Goodbye To Autumn.gp.musicxml|0|77
// So Strange feat. Cuco.gp.musicxml|0|190
// Transformed.gp.musicxml|0|22
// Terminal.gp.musicxml|0|19
// G.O.A.T..gp.musicxml|0|89
// Window.gp.musicxml|0|49
// Salvation.gp.musicxml|0|40
// Illusory Sense.gp.musicxml|0|231
// Solitude.gp.musicxml|0|72
// 1. Loud.gpx.musicxml|0|160
// I_m Sorry.gp.musicxml|0|57
// O.D..gpx.musicxml|0|96"""

// while not "Picturesque" in f.split('\n')[-1]:
//     lines = f.split('\n')
//     random.shuffle(lines)
//     f = '\n'.join(lines)
// print(f)

