from xml.etree.ElementTree import tostring
from PIL import Image as im
full = im.open("./full.png")

size = full.size[0]
mojiSize = 180

mojiCount = int(size/mojiSize) 

for y in range(mojiCount):
    for x in range(mojiCount):
        newCrop = full.crop((x*mojiSize, y*mojiSize, (x+1/9*8)*mojiSize, (y+1/9*8)*mojiSize))
        newCrop.save("./fusions/"+str(x)+"_"+str(y)+".png")
        print(str(mojiCount*y+x)+"/"+str(mojiCount*mojiCount))
