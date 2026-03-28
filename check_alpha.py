import sys

try:
    from PIL import Image

    img = Image.open('public/prof-pics/1.png')
    if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
        alpha = img.convert('RGBA').split()[-1]
        if alpha.getextrema()[0] < 255:
            print("Image has transparency.")
        else:
            print("Image has NO transparency (fully opaque).")
    else:
        print("Image has NO alpha channel.")

except ImportError:
    print("Pillow not installed.")
