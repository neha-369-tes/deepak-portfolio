from PIL import Image

# Open the image and convert to RGBA
img = Image.open('public/prof-pics/resume card.png')
img = img.convert("RGBA")

datas = img.getdata()

# Replace white background with transparency
newData = []
for item in datas:
    # If the pixel is close to white, make it transparent
    if item[0] > 220 and item[1] > 220 and item[2] > 220:
        newData.append((255, 255, 255, 0))
    else:
        newData.append(item)

img.putdata(newData)
img.save('public/prof-pics/resume_card_nobg.png', "PNG")
print("Background removed and saved as resume_card_nobg.png")
