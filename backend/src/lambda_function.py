import json
from json import JSONEncoder
from PIL import Image, ImagePalette
import numpy as np
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
    pattern_width_stitches = int(round(pattern_size[0] * gauge[0] / 4)) # 4" gauge
    pattern_height_stitches = int(round(pattern_size[1] * gauge[1] / 4)) # 4" gauge
    return pattern_width_stitches, pattern_height_stitches

def get_palette(file,num_colors):
    """
    Get a color palette from an image.

    Args:
        file (str): The filepath for the image.

    Returns:
        PIL.ImagePalette.ImagePalette: The color palette of the image.
    """
    img = Image.open(file)
    img = img.quantize(num_colors)
    colors = img.getpalette() # Returned as 265-length list [r, g, b, r, g, b, ... 0, 0, 0, ...]
    colors = colors[0:num_colors*3] 
    return get_palette_from_colors(colors)

def get_palette_from_colors(colors):
    """
    Given a list of colors, create a color palette.

    Args:
        colors (list of int): A flat list of RGB colors [r, g, b, r, g, b, ...]

    Return:
        PIL.ImagePalette.ImagePalette: The resulting color palette.
    """
    return ImagePalette.ImagePalette(mode='RGB',palette=colors)

def apply_palette(img,palette):
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
    """print('Base64 encoding image')
    buffered = BytesIO()
    converted_img.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue())"""
    return converted_img

def create_stitch_chart(in_file,pattern_size):
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
    img = img.resize(pattern_size)
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

def get_stitches(img):
    arr = np.asarray(img)
    rgb_arr = np.apply_along_axis(arrToRgb, 2, arr)
    pixels = json.dumps(rgb_arr,cls=NumpyArrayEncoder)
    return pixels

def save_img(img,filepath):
    return img.save(filepath)

def arrToRgb(arr):
    return f"rgb({arr[0]},{arr[1]},{arr[2]})"

class ColorDistance:
    def __init__(self,color,ref):
        self.color = color
        self.ref = ref
        self.distance = 0
    
    def get_distance(self):
        self.distance = np.linalg.norm(np.array(self.ref) - np.array(self.color))
        return self.distance

class NumpyArrayEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return JSONEncoder.default(self, obj)

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
        if event['httpMethod'] and event['httpMethod'] == 'OPTIONS':
            print('Received pre-flight request')
            response = respond(None,'Success')
            print(response)
            return response
        else:
            print('Load request body')
            body = json.loads(event['body'])
            print(body)
            print('Will decode image:')
            img = re.sub('^data:image/.+;base64,', '',body['imgBase64'])
            print(img)
            print('Decoding image')
            img = BytesIO(base64.b64decode(img))
            print('Getting pattern settings')
            num_colors = int(body['numColors'])
            gauge = (float(body['gaugeStitches']),float(body['gaugeRows']))
            width = float(body['width'])
            print('Getting stitch counts')
            pattern_stitch_counts = get_pattern_stitch_counts(img,width,gauge)
            print(pattern_stitch_counts)
            print('Creating stitch chart')
            chart = create_stitch_chart(img,pattern_stitch_counts)
            print('Saving stitch chart image')
            tmpfile = '/tmp/tmp.png'
            img=save_img(chart,tmpfile)
            print('Getting color palette from image')
            palette = get_palette(tmpfile,num_colors)
            print('Applying palette to stitch chart')
            converted_img = apply_palette(chart,palette)
            print('Created image')
            print(converted_img)
            print('Getting array of stitches')
            pixels = get_stitches(converted_img)
            print(pixels)
            print('Palette')
            print(palette.colors)
            json_response = {
                'pattern': json.loads(pixels),
                'palette': list(map( arrToRgb, list(palette.colors.keys()) )),
                'gaugeStitches': gauge[0],
                'gaugeRows': gauge[1]
            }
            print(json.dumps(json_response))
            response = respond(None,json.dumps(json_response))
            print(response)
            return response
    except Exception as err:
        message = f"Unexpected {str(type(err))}: {str(err.args[0])}"
        print(message)
        response = respond(message)
        print(response)
        return response