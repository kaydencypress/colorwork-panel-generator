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

def get_palette_from_file(num_colors,filepath='/tmp/tmp.png'):
    """
    Get a color palette from an image.

    Args:
        num_colors (int): The number of colors to use for the color palette.
        filepath (str): The filepath of an image (Default: '/tmp/tmp.png').

    Returns:
        PIL.ImagePalette.ImagePalette: The color palette of the image.
    """
    img = Image.open(filepath)
    return get_palette_from_img(num_colors,img)

def get_palette_from_img(num_colors,img):
    """
    Get a color palette from an image.

    Args:
        num_colors (int): The number of colors to use for the color palette.
        img (PIL.Image): An image.

    Returns:
        PIL.ImagePalette.ImagePalette: The color palette of the image.
    """
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
        img (PIL.Image): The image to process.
        palette (PIL.ImagePalette.ImagePalette): An image with the desired color palette.

    Returns:
        PIL.Image: The resulting image converted to the color palette.
    """
    # create a palette-mapped image for use with PIL.Image.quantize
    palette_img = Image.new('P',(1,1))
    palette_img.putpalette(palette)
    converted_img = img.quantize(palette=palette_img, dither=Image.Dither.NONE)
    converted_img = converted_img.convert('RGB')
    return converted_img

def create_stitch_chart(in_file,pattern_size,out_file='/tmp/tmp.png'):
    """
    Downsample an image to convert it to a stitch chart, where each pixel represents one stitch.

    Args:
        in_file (str): The filepath for the image to process.
        pattern_size (int, int): Dimension of pattern in number of stitches (width, height).
        out_file (str): The filepath for the resulting stitch chart (Default: '/tmp/tmp.png').

    Returns:
        PIL.Image: The stitch chart as image, where each pixel represents one stitch.
    """
    with Image.open(in_file) as img:
        img.load()
    img = img.convert('RGB')
    img = img.resize(pattern_size)
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
    distances.sort(key=lambda x: x.distance)
    return distances

def get_stitches(img):
    """
    Given an image, return the RGB color of each pixel in the image.

    Args:
        img (PIL.Image): An image

    Returns:
        JSON formatted str: The RGB color of each pixel in the image in format "rgb(r,g,b)"
    """
    arr = np.asarray(img)
    rgb_arr = np.apply_along_axis(flattenRgb, 2, arr)
    pixels = json.dumps(rgb_arr,cls=NumpyArrayEncoder)
    return pixels

def rgbToStr(arr):
    """
    Converts a single RGB color from a 3-element array to a string.

    Args:
        arr (array[int]): RGB color [r,g,b]

    Returns:
        str: RGB color "rgb(r,g,b)"
    """
    return "rgb(" + str(arr[0]) + "," + str(arr[1])  + "," + str(arr[2]) + ")"

def flattenRgb(arr):
    """
    Flattens a single RGB color from a 3-element array to a 1-element array.

    Args:
        arr (array[int]): RGB color [r,g,b]

    Returns:
        array[str]: RGB color ["rgb(r,g,b)"]
    """
    
    if isinstance(arr, np.ndarray):
        arr = arr.tolist()
        string = rgbToStr(arr)
        numpyarr = np.array(string,dtype='<U16')
        return numpyarr
    else:
        return rgbToStr(arr)
    
def arrToList(arr):
    """
    Converts a numpy array to a list
    Args:
        arr (array): numpy array to convert

    Returns
        list: resulting list
    """
    if isinstance(arr, np.ndarray):
        return arr.tolist()
    return arr

class NumpyArrayEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return list(map( arrToList, list(map( arrToList , obj )) ))
        return JSONEncoder.default(self, obj)

class ColorDistance:
    def __init__(self,color,ref):
        self.color = color
        self.ref = ref
        self.distance = 0
    
    def get_distance(self):
        self.distance = np.linalg.norm(np.array(self.ref) - np.array(self.color))
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
        if event['httpMethod'] and event['httpMethod'] == 'OPTIONS':
            print('Received pre-flight request')
            response = respond(None,'Success')
            print(response)
            return response
        else:
            print('Load request body')
            body = json.loads(event['body'])
            print(body)

            print('Decoding image')
            img = re.sub('^data:image/.+;base64,', '',body['imgBase64'])
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

            print('Getting color palette from stitch chart')
            palette = get_palette_from_file(num_colors)
            print(palette.colors)

            print('Applying palette to stitch chart')
            chart_with_palette = apply_palette(chart,palette)

            print('Created chart with palette')
            print(chart_with_palette)

            print('Getting array of stitches')
            stitches = get_stitches(chart_with_palette)
            print(stitches)

            print('Returning response')
            json_palette = list(map( rgbToStr, list(palette.colors.keys()) ))
            json_response = {
                'pattern': json.loads(stitches),
                'palette': json_palette,
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