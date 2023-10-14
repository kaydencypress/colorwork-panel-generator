from colorthief import ColorThief
from PIL import Image, ImagePalette
import os

def get_pattern_stitch_counts(file,width,gauge):
    """
    Get the dimensions of a knitting pattern in number of stitches.

    Args:
        file (str): The filepath for the reference image.
        width (int): The desired width for the knitting pattern in inches.
        gauge (int, int): 4" x 4" knitting gauge (stitches, rows).
    
    Returns:
        (int, int): Dimension of pattern in number of stitches (width, height).
    """
    width_pixels, height_pixels = get_img_size(file)
    img_ratio = height_pixels/width_pixels
    height = width * img_ratio
    pattern_size = (width, height)
    pattern_width_stitches = round(pattern_size[0] * gauge[0] / 4) # 4" gauge
    pattern_height_stitches = round(pattern_size[1] * gauge[1] / 4) # 4" gauge
    return pattern_width_stitches, pattern_height_stitches

def get_palette(file):
    """
    Get color palette from an image.

    Args:
        file (str): The filepath for the image.

    Returns:
        PIL.ImagePalette.ImagePalette: The color palette of the image.
    """
    color_thief = ColorThief(file)
    palette = color_thief.get_palette(color_count=num_colors,quality=5)
    flat_palette = list(sum(palette,()))
    pil_palette = ImagePalette.ImagePalette(mode='RGB',palette=flat_palette)
    return pil_palette

def apply_palette(img,palette,out_file=None):
    """
    Converts an image to a defined color palette.

    Args:
        in_file (str): The filepath for the image to process.
        palette (PIL.ImagePalette.ImagePalette): An image with the desired color palette.
        out_file (str): The filepath to save the converted image (default None).

    Returns:
        PIL.Image: The resulting image converted to the color palette.
    """
    # create a palette-mapped image for use with PIL.Image.quantize
    palette_img = Image.new("P",(1,1))
    palette_img.putpalette(palette)
    converted_img = img.quantize(palette=palette_img, dither=Image.Dither.NONE)
    if out_file:
        converted_img.save(out_file)
    return converted_img

def get_img_size(file):
    """
    Get the size of an image in pixels.

    Args:
        file (str): The filepath for the image.

    Returns:
        (int, int): The size of the image in pixels
    """
    img = Image.open(file)
    return img.size

def create_stitch_chart(in_file,pattern_size,out_file=None,stitch_size=20):
    img = Image.open(in_file)
    img.thumbnail(pattern_size)
    img = img.resize([int(stitch_size * s) for s in img.size],0)
    if out_file:
        img.save(out_file)
    return img

folder = os.path.dirname(__file__)
in_file = os.path.join(folder,'tests\\input.png')
out_file = os.path.join(folder,'tests\\processed.png')
tmp_file = os.path.join(folder,'tests\\temp.png')
num_colors = 10
gauge_stitches = 20 # gauge per 4" width
gauge_rows = 26 # gauge per 4" height
gauge = (gauge_stitches,gauge_rows)
width_inches = 8.0

palette = get_palette(in_file)
pattern_stitch_counts = get_pattern_stitch_counts(in_file,width_inches,gauge)
chart = create_stitch_chart(in_file,pattern_stitch_counts,tmp_file)
converted_img = apply_palette(chart,palette,out_file)