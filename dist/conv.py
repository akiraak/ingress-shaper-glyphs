import json

sequences = []
for line in open('sequences.txt', 'r'):
    words = line.strip().split('/')
    sequences.append(words)

f = open('sequences.json', 'w')
f.write(json.dumps(sequences))
f.close()
