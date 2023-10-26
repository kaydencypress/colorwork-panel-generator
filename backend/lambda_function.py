import json
from colorthief import ColorThief
from PIL import Image, ImagePalette
import numpy
import base64
from io import BytesIO
import re

print('Loading function')

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
    img = Image.open(file)
    width_pixels, height_pixels = img.size
    img_ratio = height_pixels/width_pixels
    height = width * img_ratio
    pattern_size = (width, height)
    pattern_width_stitches = round(pattern_size[0] * gauge[0] / 4) # 4" gauge
    pattern_height_stitches = round(pattern_size[1] * gauge[1] / 4) # 4" gauge
    return pattern_width_stitches, pattern_height_stitches

def get_palette(file,num_colors):
    """
    Get a color palette from an image.

    Args:
        file (str): The filepath for the image.

    Returns:
        PIL.ImagePalette.ImagePalette: The color palette of the image.
    """
    color_thief = ColorThief(file)
    colors = color_thief.get_palette(color_count=num_colors,quality=10)
    return get_palette_from_colors(colors)

def get_palette_from_colors(colors):
    """
    Given a list of colors, create a color palette.

    Args:
        colors (list of (int, int, int)): A list of RGB colors (R, G, B)

    Return:
        PIL.ImagePalette.ImagePalette: The resulting color palette.
    """
    flat_palette = list(sum(colors,()))
    return ImagePalette.ImagePalette(mode='RGB',palette=flat_palette)

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
    palette_img = Image.new('P',(1,1))
    palette_img.putpalette(palette)
    converted_img = img.quantize(palette=palette_img, dither=Image.Dither.NONE)
    converted_img = converted_img.convert('RGB')
    print('Base64 encoding image')
    buffered = BytesIO()
    converted_img.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue())
    return img_str

def create_stitch_chart(in_file,pattern_size,gauge,out_file=None,stitch_size=20):
    """
    Downsample in image to convert it to a stitch chart, with each square in the chart representing a stitch.

    Args:
        in_file (str): The filepath for the image to process.
        pattern_size (int, int): Dimension of pattern in number of stitches (width, height).
        out_file (str): The filepath to save the converted image (default None).
        stitch_size (int): Scaling factor for displaying each stitch in chart (default 20).
    """
    with Image.open(in_file) as img:
        img.load()
    img = img.convert('RGB')
    img.resize(pattern_size)
    width_px = round(pattern_size[0]*stitch_size)
    height_px = round(pattern_size[1]*stitch_size*gauge[0]/gauge[1])
    img = img.resize((width_px,height_px),0)
    if out_file:
        img.save(out_file)
    return img

def get_palette_distances(palette):
    """
    Given a color palette, calculate the Euclidian distances between each color and the other colors.

    Args:
        palette (PIL.ImagePalette.ImagePalette): A color palette.
    
    Returns:
        list of ColorDistances: A list containing color pairs and the Euclidian distance between them, sorted by ascending distance.
    """
    distances = []
    for color in palette.colors.keys():
        for ref_color in palette.colors.keys():
            dist = ColorDistance(color,ref_color)
            dist.get_distance()
            distances.append(dist)
            # f.write(f"{color[0]}_{color[1]}_{color[2]},{ref_color[0]}_{ref_color[1]}_{ref_color[2]},{distance:.2f}\n")
    distances.sort(key=lambda x: x.distance)
    return distances

def get_distinct_colors(palette,num_colors):
    """
    Filter down an image's color palette to the most visually distinct colors.

    Args:
        palette (PIL.ImagePalette.ImagePalette): The larger color palette to be filtered.
        num_colors (int): The number of colors to select.

    Returns:
        PIL.ImagePalette.ImagePalette: The filtered color palette.
    """
    distances = get_palette_distances(palette)
    excluded_colors = []
    included_colors = []    
    for distance in distances:
        while (len(palette.colors.keys()) - len(excluded_colors) > num_colors):
            if distance.distance != 0 and distance.color not in excluded_colors and distance.ref not in excluded_colors:
                excluded_colors.append(distance.color)
            else:
                break
    for color in palette.colors.keys():
        if color not in excluded_colors:
            included_colors.append(color)
    return get_palette_from_colors(included_colors)

class ColorDistance:
    def __init__(self,color,ref):
        self.color = color
        self.ref = ref
        self.distance = 0
    
    def get_distance(self):
        self.distance = numpy.linalg.norm(numpy.array(self.ref) - numpy.array(self.color))
        return self.distance
   
def respond(err, res=None):
    if err: 
        statusCode = 400
        body = err
    else: 
        statusCode = 200
        body = res
    return {
        'statusCode': statusCode,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type,Access-Control-Allow-Headers,Access-Control-Allow-Methods,Access-Control-Allow-Origin',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*'
        },
        'body': body,
        'isBase64Encoded': False
    }

def lambda_handler(event, context):
    try:
        print('Received event: ' + json.dumps(event))
        if event['httpMethod'] == 'OPTIONS':
            print('Received pre-flight request')
            response = respond(None,'Success')
            print(response)
            return response
        else:
            print('Load request body')
            body = json.loads(event['body'])
            print('Will decode image:')
            img = re.sub('^data:image/.+;base64,', '',body['image'])
            print(img)
            print('Decoding image')
            img = BytesIO(base64.b64decode(img))
            print('Getting pattern settings')
            num_colors = body['num_colors']
            gauge = (body['gauge']['stitches'],body['gauge']['rows'])
            contrast_scaling = body['contrast_scaling']
            width = body['width']
            print('Getting color palette from image')
            # TODO: How to load image (expects filepath)
            palette = get_palette(img,num_colors*contrast_scaling)
            print('Applying contrast scaling')
            reduced_palette = get_distinct_colors(palette,num_colors)
            print('Getting stitch counts')
            pattern_stitch_counts = get_pattern_stitch_counts(img,width,gauge)
            print('Creating stitch chart')
            chart = create_stitch_chart(img,pattern_stitch_counts,gauge)
            print('Applying palette to stitch chart')
            converted_img = apply_palette(chart,reduced_palette)
            print('Created image')
            print(converted_img)
            response = respond(None,converted_img)
            print(response)
            return response
    except Exception as err:
        message = f"Unexpected {str(type(err))}: {str(err.args[0])}"
        print(message)
        response = respond(message)
        print(response)
        return response