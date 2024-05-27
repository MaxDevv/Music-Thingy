import mido
from mido import MidiFile, MidiTrack, Message
import os
from pydub import AudioSegment
import music21
import subprocess
# Define chord types and their corresponding intervals (in semitones)
chord_types = {
    'maj': [0, 4, 7],
    'min': [0, 3, 7],
    'sus2': [0, 2, 7],
    'sus4': [0, 5, 7],
    'dim': [0, 3, 6],
    'dom7': [0, 4, 7, 10],
    'maj7': [0, 4, 7, 11],
    'min7': [0, 3, 7, 10],
    'dim7': [0, 3, 6, 9],
    'mMaj7': [0, 3, 7, 11],
    'halfDim7': [0, 3, 6, 10],
    'add9': [0, 4, 7, 14],
    'maj9': [0, 4, 7, 11, 14],
    'min9': [0, 3, 7, 10, 14],
    'dom9': [0, 4, 7, 10, 14],
    'sus2add9': [0, 2, 7, 14],
    'sus4add9': [0, 5, 7, 14]
}

# Define note names and their corresponding MIDI note numbers
note_names = {
    'C': 60,
    'C#': 61,
    'D': 62,
    'D#': 63,
    'E': 64,
    'F': 65,
    'F#': 66,
    'G': 67,
    'G#': 68,
    'A': 69,
    'A#': 70,
    'B': 71
}

# Function to create a chord from a root note and a chord type
def create_chord(root_note, intervals):
    return [root_note + interval for interval in intervals]

# Function to generate a MIDI file for a given chord
def generate_midi_file(filename, chord):
    midi = MidiFile()
    track = MidiTrack()
    midi.tracks.append(track)

    track.append(Message('program_change', program=0, time=0))

    for note in chord:
        track.append(Message('note_on', note=note, velocity=64, time=0))
    for note in chord:
        track.append(Message('note_off', note=note, velocity=64, time=480))
    midi.save(filename)



def generate_arpeggio_midi_file(filename, chord, arpeggio_type="up", arpeggio_duration=240):
    midi = MidiFile()
    track = MidiTrack()
    midi.tracks.append(track)
    track.append(Message('program_change', program=0, time=0))
    
    if arpeggio_type == 'up':
        for i, note in enumerate(chord):
            track.append(Message('note_on', note=note, velocity=64, time=i * arpeggio_duration))
            # track.append(Message('note_off', note=note, velocity=64, time=(i + 1) * arpeggio_duration))
    elif arpeggio_type == 'down':
        for i, note in enumerate(chord[::-1]):
            track.append(Message('note_on', note=note, velocity=64, time=i * arpeggio_duration))
            track.append(Message('note_off', note=note, velocity=64, time=(i + 1) * arpeggio_duration))
    elif arpeggio_type == 'updown':
        for i, note in enumerate(chord):
            track.append(Message('note_on', note=note, velocity=64, time=i * arpeggio_duration))
        for i, note in enumerate(chord[::-1]):
            track.append(Message('note_off', note=note, velocity=64, time=(len(chord) + i) * arpeggio_duration))
    
    midi.save(filename)

def convert_to_wav(filename):
    wav_filename = filename.replace('.mid', '.wav')
    subprocess.run(['timidity', filename, '-Ow', '-o', wav_filename])
    return wav_filename

# Generate MIDI files for all chords and all notes
for note_name, root_note in note_names.items():
    for chord_name, intervals in chord_types.items():
        chord = create_chord(root_note, intervals)
        filename = f'./{note_name}{chord_name}-arpeggio.mid'
        generate_arpeggio_midi_file(filename, chord)
        wav_filename = convert_to_wav(filename)
        print(f'Generated {filename}, converted to WAV: {wav_filename}')