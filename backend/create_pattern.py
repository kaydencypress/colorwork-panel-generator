from colorthief import ColorThief
from PIL import Image, ImageDraw, ImagePalette
import os

folder = os.path.dirname(__file__)
in_file = os.path.join(folder,'tests\input.png')
out_file = os.path.join(folder,'tests\processed.png')
num_colors = 10
gauge_stitches = 20 # gauge per 4" width
gauge_rows = 26 # gauge per 4" height
width_inches = 8

# get color palette
color_thief = ColorThief(in_file)
palette = color_thief.get_palette(color_count=num_colors)
flat_palette = list(sum(palette,()))
pil_palette = ImagePalette.ImagePalette(mode='RGB',palette=flat_palette)
palette_img = Image.new("P",(1,1))
palette_img.putpalette(pil_palette)

# convert image to color palette
converted_img = Image.open(in_file)
converted_img = converted_img.quantize(palette=palette_img, dither=Image.Dither.NONE)
converted_img.save(out_file)

# get dimensions from image
img = Image.open(in_file)
width_pixels, height_pixels = img.size
img_ratio = height_pixels/width_pixels
height_inches = width_inches * img_ratio
print(f'Image size: {width_pixels} x {height_pixels} pixels')

# divide image into sections of pixels for each stitch
width_stitches = round(width_inches * gauge_stitches / 4) # 4" gauge
height_stitches = round(height_inches * gauge_rows / 4) # 4" gauge
pixels_per_stitch_width = round(width_pixels / width_stitches)
pixels_per_stitch_height = round(height_pixels / height_stitches)
print(f'{pixels_per_stitch_width} x {pixels_per_stitch_height} pixels per stitch')
print(f'{width_stitches} x {height_stitches} stitches in pattern')

# get dominant color for each stitch
# stitch_color = color_thief.get_color()