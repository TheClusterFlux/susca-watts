from PIL import Image
import os

print("Starting favicon creation script...")

# Path to the source logo image
source_path = r"d:\work\TheClusterFlux\susca-watts\public\logo-favicon.jpg"
output_dir = r"d:\work\TheClusterFlux\susca-watts\public"

print(f"Looking for source file: {source_path}")

# Check if source file exists
if not os.path.exists(source_path):
    print(f"Source file not found: {source_path}")
    print("Listing files in public directory:")
    public_files = os.listdir(output_dir)
    for file in public_files:
        print(f"  {file}")
    exit(1)
else:
    print("Source file found!")

try:
    # Open the source image
    img = Image.open(source_path)
    print(f"Source image size: {img.size}")
    
    # Convert to RGBA if not already
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    # Create different favicon sizes
    sizes = [16, 32, 48, 64, 128, 256]
    
    # Generate PNG favicons
    for size in sizes:
        favicon_img = img.resize((size, size), Image.Resampling.LANCZOS)
        png_path = os.path.join(output_dir, f"favicon-{size}x{size}.png")
        favicon_img.save(png_path, "PNG")
        print(f"Created: favicon-{size}x{size}.png")
    
    # Create the main favicon.ico (multi-size ICO file)
    favicon_sizes = [(16, 16), (32, 32), (48, 48)]
    favicon_images = []
    
    for size in favicon_sizes:
        favicon_img = img.resize(size, Image.Resampling.LANCZOS)
        favicon_images.append(favicon_img)
    
    # Save as ICO file
    ico_path = os.path.join(output_dir, "favicon.ico")
    favicon_images[0].save(ico_path, format='ICO', sizes=favicon_sizes)
    print(f"Created: favicon.ico")
    
    # Create Apple Touch Icon (180x180)
    apple_icon = img.resize((180, 180), Image.Resampling.LANCZOS)
    apple_path = os.path.join(output_dir, "apple-touch-icon.png")
    apple_icon.save(apple_path, "PNG")
    print(f"Created: apple-touch-icon.png")
    
    # Create Android Chrome icons
    android_192 = img.resize((192, 192), Image.Resampling.LANCZOS)
    android_192_path = os.path.join(output_dir, "android-chrome-192x192.png")
    android_192.save(android_192_path, "PNG")
    print(f"Created: android-chrome-192x192.png")
    
    android_512 = img.resize((512, 512), Image.Resampling.LANCZOS)
    android_512_path = os.path.join(output_dir, "android-chrome-512x512.png")
    android_512.save(android_512_path, "PNG")
    print(f"Created: android-chrome-512x512.png")
    
    print("\nAll favicon files created successfully!")
    
except ImportError:
    print("PIL (Pillow) not found. Installing...")
    os.system("pip install Pillow")
    print("Please run this script again after Pillow installation.")
except Exception as e:
    print(f"Error: {e}")
